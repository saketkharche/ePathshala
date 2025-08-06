import React from 'react';
import { useAuth } from '../../utils/auth';

function Profile() {
  const { user } = useAuth();
  // In a real app, fetch user details from backend using user.token
  // Here, we use localStorage or context for demo
  if (!user) return <div>Not logged in</div>;
  // You can expand this to fetch more details from backend if needed
  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>
      <p><b>Role:</b> {user.role}</p>
      <p><b>Account Number:</b> {user.accountNumber || 'N/A'}</p>
      <p><b>Email:</b> {user.email || 'N/A'}</p>
      {/* Add class/subject if available */}
    </div>
  );
}

export default Profile;