/**
 * Registry of available resume templates.
 *
 * Each entry's `id` is the value stored on Resume.template (backend) and in
 * the builder's `template` state. `Component` is the template's renderer,
 * dynamically resolved in preview/ui/Preview.jsx to avoid a hard import
 * cycle with builder.jsx (which provides ResumeContext).
 *
 * To add a new template:
 * 1. Create ui/src/components/preview/templates/TemplateN.jsx
 * 2. Register it below with a unique id, name, description, and editable flag
 * 3. Import + map it in Preview.jsx's TEMPLATE_COMPONENTS
 */
export const TEMPLATES = [
  {
    id: 'template1',
    name: 'Classic',
    description: 'Two-column layout with a teal sidebar for skills, education, and contact info.',
    editable: true,
  },
  {
    id: 'template2',
    name: 'Minimal',
    description: 'Single-column, photo-free, ATS-safe layout with a centered header and date-led entries.',
    editable: false,
  },
  {
    id: 'template3',
    name: 'Professional',
    description: 'Left-aligned, navy-accented running-text resume with inline dates and hyphen bullets.',
    editable: false,
  },
];

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id;

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

/**
 * Fixed slots shown as locked "coming soon" cards in the template picker,
 * so the picker communicates that more templates are on the way without
 * pretending they're selectable yet.
 */
export const UPCOMING_TEMPLATE_SLOTS = 0;
