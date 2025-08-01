import { getToken } from '../utils/auth';

function authHeader() {
  return { Authorization: `Bearer ${getToken()}` };
}

export async function markAttendance(data) {
  const res = await fetch('/api/teacher/attendance', {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getAttendanceByClass(className) {
  const res = await fetch(`/api/teacher/attendance/${className}`, { headers: authHeader() });
  return res.json();
}

export async function getStudentAttendance(studentId) {
  const res = await fetch(`/api/student/attendance/${studentId}`, { headers: authHeader() });
  return res.json();
}

export async function getParentChildAttendance(parentId) {
  const res = await fetch(`/api/parent/attendance/${parentId}`, { headers: authHeader() });
  return res.json();
}