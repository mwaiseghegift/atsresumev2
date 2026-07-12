import { API_BASE_URL, API_AUTH_CSRF } from '../../constants/api';

export async function fetchCsrfToken() {
    try {
        const res = await fetch(`${API_BASE_URL}${API_AUTH_CSRF}`, { credentials: 'include' });
        if (res.ok) {
            const data = await res.json();
            return data.csrfToken;
        }
    } catch (e) {
        console.error('Failed to fetch CSRF token', e);
    }
    return '';
}

export function getCsrfToken() {
    let csrfToken = null;
    if (typeof document !== 'undefined' && document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === 'csrftoken=') {
                csrfToken = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return csrfToken;
}
