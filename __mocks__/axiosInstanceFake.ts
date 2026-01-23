import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import axios from "axios";

const serverURL = "http://example.com";

const axiosInstance = axios.create({
  baseURL: serverURL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {return axiosInstance(await refreshToken(error))}
);

export async function refreshToken(error: any)
{
    if (error.response?.status === 403) {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const { data } = await axiosInstance.get('/api/jwt/refreshToken', { headers: {'refreshtoken': `Bearer ${refreshToken}`} });
          AsyncStorage.setItem('accessToken', data.accessToken);
          AsyncStorage.setItem('refreshToken', data.refreshToken);
          error.config.headers['jwtauthorization'] = `Bearer ${data.accessToken}`;
          return error.config;
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
        }
      }
    }

    return Promise.reject(error);
  }

export default axiosInstance;