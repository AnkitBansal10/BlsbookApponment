// "https://development.blsinternational.com/Italy_pakistan_appmnt/api/example/applicant_login"
// "https://development.blsinternational.com/Italy_pakistan_appmnt/api/example/applicant_registration"

import axios from 'axios';
import { API_KEY } from './digestClient';

const BASE_URL = 'https://development.blsinternational.com/Italy_pakistan_appmnt/api/example/';
const USERNAME = 'ITALY';
const PASSWORD = '=pQy2JFN';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'X-API-Key': API_KEY,
     'Content-Type': 'multipart/form-data', // Add this
    'Accept': 'application/json'
  },
});

api.interceptors.request.use(config => {
  const fullUrl = `${config.baseURL?.replace(/\/$/, '')}/${config.url?.replace(/^\//, '')}`;
  console.log(`➡️ Axios Request: ${config.method?.toUpperCase()} ${fullUrl}`);
    console.log(`➡️ Final Axios URL: ${fullUrl}`);
  console.log('➡️ Headers:', config.headers);
  if (config.data) {
    console.log('➡️ Body:', config.data);
  }
  return config;
});
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authHeader = error.response.headers['www-authenticate'];
      if (authHeader?.startsWith('Digest')) {
        const authParams = parseDigestHeader(authHeader);
        const method = originalRequest.method.toUpperCase();
   const fullUrl = originalRequest.baseURL + originalRequest.url;

// Extract just the path (remove domain part)
const uri = fullUrl.replace(/^https?:\/\/[^/]+/, '');
console.log('🧩 Digest URI:', uri);
const ha1 = md5(`${USERNAME}:${authParams.realm}:${PASSWORD}`);
const ha2 = md5(`${method}:${uri}`);
const nc = '00000001';
const cnonce = Math.random().toString(36).substring(2, 10);
const responseDigest = md5(`${ha1}:${authParams.nonce}:${nc}:${cnonce}:${authParams.qop}:${ha2}`);

const digest = `Digest username="${USERNAME}", realm="${authParams.realm}", nonce="${authParams.nonce}", uri="${uri}", qop=${authParams.qop}, nc=${nc}, cnonce="${cnonce}", response="${responseDigest}"`;

        originalRequest.headers['Authorization'] = digest;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
function md5(str) {
  return require('react-native-md5').hex_md5(str);
}
function parseDigestHeader(header) {
  const prefix = 'Digest ';
  const paramsString = header.slice(prefix.length);
  const params = {};

  paramsString.split(',').forEach(param => {
    const [key, val] = param.trim().split('=');
    params[key] = val?.replace(/"/g, '');
  });
  return params;
}
export default api;
