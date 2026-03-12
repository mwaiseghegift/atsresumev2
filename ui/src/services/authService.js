import { API_BASE_URL, API_AUTH_ME, API_AUTH_LOGIN, API_AUTH_REGISTER, API_AUTH_LOGOUT } from '../constants/api';
import { getCsrfToken } from '../components/utility/csrf';

export async function fetchAuthUser() {
  const res = await fetch(`${API_BASE_URL}${API_AUTH_ME}`, {
    credentials: 'include'
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user || null;
}

export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE_URL}${API_AUTH_LOGIN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include'
  });
  const data = await res.json();
  if (data.success) return { success: true, user: data.user };
  return { success: false, error: data.error || 'Invalid credentials' };
}

export async function registerUser(username, email, password) {
  const res = await fetch(`${API_BASE_URL}${API_AUTH_REGISTER}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
    credentials: 'include'
  });
  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = {};
  }
  if (res.ok && data.success) return { success: true, user: data.user };
  return { success: false, error: data.error || typeof data === 'object' ? JSON.stringify(data) : 'Registration failed' };
}

export async function logoutUser() {
  await fetch(`${API_BASE_URL}${API_AUTH_LOGOUT}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRFToken': getCsrfToken() || ''
    }
  });
}
