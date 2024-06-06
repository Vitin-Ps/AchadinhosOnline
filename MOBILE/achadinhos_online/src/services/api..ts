import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getBaseUrl() {
  return 'http://192.168.100.47:8080/';
}

const api = axios.create({
  baseURL: getBaseUrl(),
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
