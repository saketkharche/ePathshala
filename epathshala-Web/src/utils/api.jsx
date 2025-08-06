// API utility functions for authenticated requests
export const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

export const get = (url) => apiCall(url);
export const post = (url, data) => apiCall(url, { method: 'POST', body: JSON.stringify(data) });
export const put = (url, data) => apiCall(url, { method: 'PUT', body: JSON.stringify(data) });
export const del = (url) => apiCall(url, { method: 'DELETE' }); 