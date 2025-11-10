import messaging from '@react-native-firebase/messaging'
import socketIO from './socketIO';



    const getToken = async () => {
            const token = await messaging().getToken();
            console.log('Device FCM token', token)
            
            return token
    }

    const sendTokenToServer = async (token, playerEmail) => {

        const socket = socketIO.getSocket()

        //send token via socket
        socket?.emit('register FCM Token', {token, playerEmail})


    }

export default async function pNotify (playerEmail)
{
        const authStatus = await messaging().requestPermission();
        const enable =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if(enable) 
        {
            console.log('Authorization status', authStatus)
            const token = await getToken();

            await sendTokenToServer(token, playerEmail);

            messaging().onTokenRefresh(newToken => {
            console.log('New FCM token:', newToken);
            sendTokenToServer(newToken, playerEmail);
        });
            
        }
    

}
