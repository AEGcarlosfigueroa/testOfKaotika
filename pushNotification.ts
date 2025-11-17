import messaging from '@react-native-firebase/messaging'
import { getAuth } from '@react-native-firebase/auth';
import {PermissionsAndroid} from 'react-native';
import { serverURL } from './App';



    const getToken = async () => {
            const token = await messaging().getToken();
            console.log('Device FCM token', token)
            
            return token
    }

    // const sendTokenToServer = async (token, playerEmail) => {

    //     const socket = socketIO.getSocket()

    //     //send token via socket
    //     socket?.emit('register FCM Token', {token, playerEmail})


    // }

    const sendTokenToServer = async (SERVER_URL: string , token: string | null, playerEmail: string) => {
        try {
            const firebaseIdToken = await getAuth().currentUser?.getIdToken();
            console.log(firebaseIdToken)
            await fetch(`${SERVER_URL}/api/players/register-token`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${firebaseIdToken}`},
                body: JSON.stringify({ token: token, email: playerEmail }),
            });
            console.log('Token sent to server');
        } 
        catch(error){
            console.error("could not post the data", error)
        }
    }

export default async function pNotify (SERVER_URL: string, playerEmail: string)
{
        const enable = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

        if(enable) 
        {
            console.log('Authorization status', enable)
            const token = await getToken();

            await sendTokenToServer(SERVER_URL ,token, playerEmail);

            messaging().onTokenRefresh(newToken => {
            console.log('New FCM token:', newToken);
            sendTokenToServer(SERVER_URL, newToken, playerEmail);
            });

            
        }
    

}

export async function removeNofify(playerEmail: string)
{
    const token = null;

    await sendTokenToServer(serverURL ,token, playerEmail);
    messaging().onTokenRefresh(newToken => {
    console.log('New FCM token:', newToken);
    sendTokenToServer(serverURL, newToken, playerEmail);
    });
}
