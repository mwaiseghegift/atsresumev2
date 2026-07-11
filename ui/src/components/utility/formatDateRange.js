/** Formats a start/end year pair as "Mon YYYY — Mon YYYY" (or "— Present"). Returns "" if startYear is empty. */
export function formatDateRange(startYear, endYear) {
  if (!startYear) return '';
  const lang = 'en-Us';

  const start = new Date(startYear);
  const startStr = `${start.toLocaleString(lang, { month: 'short' })} ${start.getFullYear()}`;

  const end = new Date(endYear);
  const endStr = end.toString() !== 'Invalid Date'
    ? `${end.toLocaleString(lang, { month: 'short' })} ${end.getFullYear()}`
    : 'Present';

  return `${startStr} — ${endStr}`;
}
