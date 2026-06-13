import axios from 'axios';

// Troque pelo IP da sua máquina ao rodar no dispositivo físico
// Ex: 'http://192.168.0.10:3000'
const BASE_URL = 'http://localhost:3333';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export const taskService = {
  getAll: () => api.get('/tasks').then((r) => r.data),
  getById: (id) => api.get(`/tasks/${id}`).then((r) => r.data),
  create: (data) => api.post('/tasks', data).then((r) => r.data),
  update: (id, data) => api.put(`/tasks/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/tasks/${id}`).then((r) => r.data),
};
