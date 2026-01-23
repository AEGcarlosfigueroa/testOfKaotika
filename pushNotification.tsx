import messaging from '@react-native-firebase/messaging'
import { getAuth } from '@react-native-firebase/auth';
import { PermissionsAndroid } from 'react-native';
import { serverURL } from './App';
import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Device FCM token', token)

    return token
}

const refreshAccessToken = async() => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
      
    if (refreshToken) {
      try {
        const { data } = await axiosInstance.get('/api/jwt/refreshToken', { headers: {'refreshtoken': `Bearer ${refreshToken}`} });
        console.log(data);
        AsyncStorage.setItem('accessToken', data.accessToken);
        AsyncStorage.setItem('refreshToken', data.refreshToken);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
      }
    }
}    

export const sendTokenToServer = async (SERVER_URL: string, token: string | null, playerEmail: string) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch(`${SERVER_URL}/api/players/register-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "jwtauthorization": `Bearer ${accessToken}` },
            body: JSON.stringify({ token: token, email: playerEmail }),
        });

        if(response.status === 403)
        {
            await refreshAccessToken();

            const newAccessToken = await AsyncStorage.getItem('accessToken');
            const newResponse = await fetch(`${SERVER_URL}/api/players/register-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "jwtauthorization": `Bearer ${newAccessToken}` },
                body: JSON.stringify({ token: token, email: playerEmail }),
            });

            console.log('Token sent to server');
            console.log(newResponse);
        }
        else
        {
            console.log('Token sent to server');
            console.log(response);
        }
        
    }
    catch (error: any) {

        await refreshAccessToken();

        const newAccessToken = await AsyncStorage.getItem('accessToken');
        const newResponse = await fetch(`${SERVER_URL}/api/players/register-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "jwtauthorization": `Bearer ${newAccessToken}` },
            body: JSON.stringify({ token: token, email: playerEmail }),
        });

        console.log('Token sent to server');
        console.log(newResponse);
    }
}

export default async function pNotify(SERVER_URL: string, playerEmail: string) {
    const enable = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    if (enable) {
        console.log('Authorization status', enable)
        const token = await getToken();

        await sendTokenToServer(SERVER_URL, token, playerEmail);

        messaging().onTokenRefresh(newToken => {
            console.log('New FCM token:', newToken);
            sendTokenToServer(SERVER_URL, newToken, playerEmail);
        });
    }
}

export async function removeNofify(playerEmail: string) {

    const token = null;

    await sendTokenToServer(serverURL, token, playerEmail);
    messaging().onTokenRefresh(newToken => {
        console.log('New FCM token:', newToken);
        sendTokenToServer(serverURL, newToken, playerEmail);
    });
}
