import axios from 'axios';

export async function fetchCurrentUser() {
  const response = await axios.get('/auth/me');
  return response.data;
}

export async function signInLocal(credentials) {
  const response = await axios.post('/auth/signin/local', credentials);
  return response.data;
}

export async function signUp(credentials) {
  const response = await axios.post('/auth/signup', credentials);
  return response.data;
}

export async function verifyEmailToken(token) {
  const response = await axios.put('/auth/verify-email', { token });
  return response.data;
}

export async function resetPasswordWithToken(token, password) {
  const response = await axios.put('/auth/password-reset', { token, password });
  return response.data;
}

export async function requestPasswordReset(email) {
  const response = await axios.post('/auth/send-password-reset-email', { email });
  return response.data;
}

export async function updatePassword(credentials) {
  const response = await axios.put('/auth/password-update', credentials);
  return response.data;
}
