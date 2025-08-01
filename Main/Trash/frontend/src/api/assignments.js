import { getToken } from '../utils/auth';

function authHeader() {
  return { Authorization: `Bearer ${getToken()}` };
}

export async function uploadAssignmentFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/teacher/assignments/upload', {
    method: 'POST',
    headers: authHeader(),
    body: formData
  });
  return res.json();
}

export async function uploadAssignment(data) {
  const res = await fetch('/api/teacher/assignments', {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getAssignmentsByClass(className) {
  const res = await fetch(`/api/teacher/assignments/${className}`, { headers: authHeader() });
  return res.json();
}

export async function getStudentAssignments(className) {
  const res = await fetch(`/api/student/assignments/${className}`, { headers: authHeader() });
  return res.json();
}