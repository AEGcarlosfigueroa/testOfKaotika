import messaging from '@react-native-firebase/messaging'
import socketIO from './socketIO';



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

    const sendTokenToServer = async (SERVER_URL: string , token: string, playerEmail: string) => {
        try {
            await fetch(`${SERVER_URL}/api/players/register-token`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token }),
    });
    console.log('Token sent to server');
        } 
        catch(error){
            console.error("could not post the data", error)
        }
    }

export default async function pNotify (SERVER_URL: string, playerEmail: string)
{
        const authStatus = await messaging().requestPermission();
        const enable =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if(enable) 
        {
            console.log('Authorization status', authStatus)
            const token = await getToken();

            await sendTokenToServer(SERVER_URL ,token, playerEmail);

            messaging().onTokenRefresh(newToken => {
            console.log('New FCM token:', newToken);
            sendTokenToServer(SERVER_URL, newToken, playerEmail);
        });
            
        }
    

}
