import axios from 'axios';

const BASE_URL = 'http://192.168.0.114:3333';

const api = axios.create({
  baseURL: BASE_URL,
});

export const buscarTarefas = () => api.get('/tasks').then(res => res.data);
export const buscarTarefa = (id) => api.get(`/tasks/${id}`).then(res => res.data);
export const criarTarefa = (dados) => api.post('/tasks', dados).then(res => res.data);
export const atualizarTarefa = (id, dados) => api.put(`/tasks/${id}`, dados).then(res => res.data);
export const deletarTarefa = (id) => api.delete(`/tasks/${id}`).then(res => res.data);
