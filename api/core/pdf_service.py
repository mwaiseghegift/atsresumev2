import json

from django.conf import settings
from playwright.sync_api import sync_playwright


class PdfService:
    """
    Renders a resume to PDF with a headless Chromium instance driven against
    the frontend's dedicated /print route. This reuses the exact same React
    template components and print CSS the on-screen preview already uses, so
    the export is a deterministic, text-selectable PDF with no dependency on
    the browser's print dialog (margins, scale, and background-graphics are
    no longer user-configurable variables that can produce a bad export).
    """

    def generate_resume_pdf(self, resume_data, template='template1'):
        """
        Args:
            resume_data (dict): Complete resume data in the app's JSON shape
            template (str): Template registry id, e.g. 'template1'

        Returns:
            bytes: The generated PDF file contents
        """
        print_url = f"{settings.FRONTEND_URL}/print"

        init_script = (
            f"window.__PRINT_RESUME_DATA__ = {json.dumps(resume_data)};"
            f"window.__PRINT_TEMPLATE__ = {json.dumps(template)};"
        )

        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch()
                try:
                    page = browser.new_page()
                    page.add_init_script(init_script)
                    page.goto(print_url, wait_until='networkidle')
                    # The /print page sets this once it has actually rendered
                    # the resume content — a more reliable signal than
                    # networkidle alone, which can resolve before late React
                    # rendering (e.g. Template 1's dynamically-imported
                    # drag-and-drop wrapper) finishes.
                    page.wait_for_selector('[data-print-ready="true"]', timeout=15000)

                    # No explicit format/margin here on purpose: prefer_css_page_size
                    # makes Chromium's print pipeline honor the page's own
                    # @page { size: A4; margin: 14mm } rule, the same rule the
                    # on-screen print preview uses — so this can't be silently
                    # overridden the way a user's print-dialog selection can.
                    pdf_bytes = page.pdf(
                        prefer_css_page_size=True,
                        print_background=True,
                    )
                finally:
                    browser.close()
        except Exception as e:
            raise Exception(f"Error generating PDF: {str(e)}")

        return pdf_bytes
