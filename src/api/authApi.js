// "https://development.blsinternational.com/Italy_pakistan_appmnt/api/example/applicant_login"
// "https://development.blsinternational.com/Italy_pakistan_appmnt/api/example/applicant_registration"

import axios from 'axios';
import { getStoredAuthData } from '../features/auth/authService';

const api = axios.create({
  baseURL: 'https://development.blsinternational.com/Italy_pakistan_appmnt/api/example/',
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const { tokens } = await getStoredAuthData();
  if (tokens?.access_token) {
    config.headers.Authorization = `Bearer ${tokens.access_token}`;
  }
  return config;
});

export default api;