import { API_BASE_URL, API_EXPORT_PDF } from '../constants/api';
import { fetchCsrfToken } from '../components/utility/csrf';

/**
 * Requests a server-generated PDF for the given resume/template and triggers
 * a browser download. Unlike window.print(), this doesn't depend on the
 * user's print dialog settings (margins, scale, background graphics) — the
 * backend renders a deterministic PDF via a headless browser.
 */
export async function downloadResumePdf(resumeData, template) {
  const csrfToken = await fetchCsrfToken();
  const response = await fetch(`${API_BASE_URL}${API_EXPORT_PDF}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify({ resume_data: resumeData, template }),
  });

  if (!response.ok) {
    let message = 'Failed to generate PDF';
    try {
      const data = await response.json();
      message = data.error || message;
    } catch {
      /* response wasn't JSON — keep the default message */
    }
    throw new Error(message);
  }

  const blob = await response.blob();
  const disposition = response.headers.get('Content-Disposition') || '';
  const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
  const filename = filenameMatch ? filenameMatch[1] : `${resumeData.name || 'Resume'}_Resume.pdf`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
