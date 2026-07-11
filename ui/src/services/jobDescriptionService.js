import { API_BASE_URL, API_JOB_DESCRIPTIONS } from '../constants/api';
import { getCsrfToken, fetchCsrfToken } from '../components/utility/csrf';

export async function fetchJobDescriptions() {
  const response = await fetch(`${API_BASE_URL}${API_JOB_DESCRIPTIONS}`, { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch tracked jobs');
  return response.json();
}

export async function createJobDescription(data) {
  const csrfToken = await fetchCsrfToken();
  const response = await fetch(`${API_BASE_URL}${API_JOB_DESCRIPTIONS}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errors = await response.json().catch(() => ({}));
    throw new Error(errors.title?.[0] || errors.detail || 'Failed to create tracked job');
  }
  return response.json();
}

export async function updateJobDescription(id, data) {
  const csrfToken = await fetchCsrfToken();
  const response = await fetch(`${API_BASE_URL}${API_JOB_DESCRIPTIONS}${id}/`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update tracked job');
  return response.json();
}

export async function deleteJobDescription(id) {
  const response = await fetch(`${API_BASE_URL}${API_JOB_DESCRIPTIONS}${id}/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'X-CSRFToken': getCsrfToken() || '' },
  });
  if (!response.ok && response.status !== 204) throw new Error('Failed to delete tracked job');
}
