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
  const res = await fetch(`/api/assignments/class/${className}`, { headers: authHeader() });
  return res.json();
}

export async function submitAssignment(assignmentId, studentId, submissionText, file) {
  const formData = new FormData();
  formData.append('studentId', studentId.toString());
  if (submissionText) {
    formData.append('submissionText', submissionText);
  }
  if (file) {
    formData.append('file', file);
  }
  
  const token = getToken();
  const res = await fetch(`/api/assignments/${assignmentId}/submit`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  
  return res.json();
}