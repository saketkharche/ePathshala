import { getToken } from '../utils/auth';

function authHeader() {
  return { Authorization: `Bearer ${getToken()}` };
}

export async function getEvents() {
  const res = await fetch('/api/admin/calendar', { headers: authHeader() });
  return res.json();
}