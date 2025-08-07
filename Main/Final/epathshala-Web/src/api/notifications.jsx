import { getToken } from '../utils/auth';

export async function fetchUserNotifications() {
  const token = getToken();
  const res = await fetch('/api/notifications/user', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function fetchUnreadNotificationCount() {
  const token = getToken();
  const res = await fetch('/api/notifications/user/unread/count', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch unread count');
  return res.json();
}

export async function markNotificationAsRead(notificationId) {
  const token = getToken();
  const res = await fetch(`/api/notifications/mark-read/${notificationId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to mark notification as read');
  return res.json();
}

export async function markAllNotificationsAsRead() {
  const token = getToken();
  const res = await fetch('/api/notifications/mark-all-read', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to mark all as read');
  return res.json();
}
