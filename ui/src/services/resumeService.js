import { API_BASE_URL, API_RESUMES, API_CUSTOMIZED_RESUMES } from '../constants/api';

export async function fetchResumes() {
  const response = await fetch(`${API_BASE_URL}${API_RESUMES}`, { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch resumes');
  return response.json();
}

export async function fetchCustomizedResumes() {
  const response = await fetch(`${API_BASE_URL}${API_CUSTOMIZED_RESUMES}`, { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch customized resumes');
  return response.json();
}
