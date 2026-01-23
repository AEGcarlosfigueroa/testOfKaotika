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
  async error => {return (await refreshToken(error))}
);

async function refreshToken(error: any)
{
    if (error.response?.status === 403) {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const { data } = await axiosInstance.get('/api/jwt/refreshToken', { headers: {'refreshtoken': `Bearer ${refreshToken}`} });
          console.log(data);
          AsyncStorage.setItem('accessToken', data.accessToken);
          AsyncStorage.setItem('refreshToken', data.refreshToken);
          error.config.headers['jwtauthorization'] = `Bearer ${data.accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
        }
      }
    }

    return Promise.reject(error);
  }

export default axiosInstance;