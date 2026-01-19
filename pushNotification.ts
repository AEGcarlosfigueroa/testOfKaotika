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

export const sendTokenToServer = async (SERVER_URL: string, token: string | null, playerEmail: string) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await axiosInstance.post('/api/players/register-token',  {token: token, email: playerEmail },  {
            headers: { 'jwtauthorization': `Bearer + ${accessToken}`, 'Content-Type': 'application/json' },
        });
        console.log('Token sent to server');
        console.log(response);
    }
    catch (error: any) {
        console.error("could not post the data", error)
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
