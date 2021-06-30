import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.elcoma.com.br/api/visits',
});

api.interceptors.request.use((oldConfig) => {
  const config = { ...oldConfig };
  const auth = sessionStorage.getItem('userToken') ?? '';
  config.headers.Authorization = auth;
  return config;
});
