import axios from 'axios';
import { serverURL } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: serverURL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 403) {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const { data } = await axiosInstance.post('/api/jwt/refreshToken', { refreshToken: refreshToken });
          console.log(data);
          AsyncStorage.setItem('accessToken', data.accessToken);
          AsyncStorage.setItem('refreshToken', data.refreshToken);
          error.config.headers['refreshToken'] = `Bearer ${data.accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;