import axios from 'axios';

export async function listUsers() {
  const response = await axios.get('/users');
  return response.data;
}

export async function findUser(id) {
  const response = await axios.get(`/users/${id}`);
  return response.data;
}

export async function createUser(values) {
  const response = await axios.post('/users', { data: values });
  return response.data;
}

export async function updateUser(id, values) {
  const response = await axios.put(`/users/${id}`, { id, data: values });
  return response.data;
}

export async function deleteUser(id) {
  const response = await axios.delete(`/users/${id}`);
  return response.data;
}
