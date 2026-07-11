export const JOB_STATUSES = [
  { id: 'saved', label: 'Saved', color: '#6B7280' },
  { id: 'applied', label: 'Applied', color: '#0D9488' },
  { id: 'interviewing', label: 'Interviewing', color: '#6366F1' },
  { id: 'offer', label: 'Offer', color: '#10B981' },
  { id: 'rejected', label: 'Rejected', color: '#EF4444' },
];

export function getStatusMeta(id) {
  return JOB_STATUSES.find((s) => s.id === id) ?? JOB_STATUSES[0];
}
