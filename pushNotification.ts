import messaging from '@react-native-firebase/messaging'



    const getToken = async () => {
            const token = await messaging().getToken();
            console.log('Device FCM token', token)
            
            return token
    }

    const sendTokenToServer = async (SERVER_URL, token) => {
        try {
            await fetch(`${SERVER_URL}/api/players/register-token`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token }),
    });
    console.log('Token sent to server');
  } 
        catch{
            
        }
    }

export default async function pNotify (SERVER_URL)
{
        const authStatus = await messaging().requestPermission();
        const enable =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if(enable) 
        {
            console.log('Authorization status', authStatus)
            const token = await getToken();

            await sendTokenToServer(SERVER_URL, token);

            messaging().onTokenRefresh(newToken => {
            console.log('New FCM token:', newToken);
            sendTokenToServer(SERVER_URL, newToken);
        });
            
        }
    

}
