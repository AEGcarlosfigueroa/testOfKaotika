import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Text, Image, View} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { GoogleAuthProvider, getAuth, signInWithCredential, signOut, onAuthStateChanged } from '@react-native-firebase/auth';
import React from 'react';
import { useState, useEffect } from 'react';
import googleJSON from './android/app/google-services.json';
import BootSplash from "react-native-bootsplash";
import Navigator from './components/navigator';
import socketIO  from "./socketIO";
import { NavigationContainer } from '@react-navigation/native';
import playerContext from './context';

GoogleSignin.configure({
  //REMEMBER TO DOWNLOAD google-services.json and put it into the /android/app directory
  webClientId: googleJSON.client[0].oauth_client[1].client_id,
});

const serverURL = "http://10.50.0.50:6002";
// const serverURL = "https://testofkaotika-server.onrender.com";
// const serverURL = "http://localhost:3000";
// const serverURL = "http://10.0.2.2:3000"
// const serverURL = "http://10.70.0.22:3000"


const styles = StyleSheet.create({
  button: {
    top: '45%',
    left: '25%',
    width: '50%',
    height : '5%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    borderRadius: '25%',
    borderWidth: 2,
    borderColor: 'grey'
  },
  text: {
    color: 'yellow',
    alignSelf: 'center',
    margin: '5%'
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    margin: '5%',
    position: 'absolute',
    top: '48%',
    zIndex: 0
  },
  image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    marginTop: '10%',
    width: '100%'
  },
  fullScreen: {
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }, 
  spinner: {
    marginTop: '99%'
  }
});

const onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();

  // Try the new style of google-sign in result, from v13+ of that module
  let idToken = (await (GoogleSignin.getTokens())).idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const account = await signInWithCredential(getAuth(), googleCredential);

  const firebaseIdToken = await account.user.getIdToken();

  return { account, firebaseIdToken};
};

function App()
{
  setTimeout( async () => {
    await BootSplash.hide({ fade: true });
    console.log("BootSplash has been hidden successfully");
  }, 1000)

  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState(<></>);

  const [player, setPlayer] = useState();

  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if(!user)
    {
      setSuccess(false);
    }
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if(user && success)
  {
    return(
      <playerContext.Provider value = {{player, setPlayer}}>
      <NavigationContainer>
        
              <Navigator/>

      </NavigationContainer>
      </playerContext.Provider>
    )
    
  }

  let component = <></>

  if(loading)
  {
    component = <View style={styles.fullScreen}>
       <ActivityIndicator size="large" style={styles.spinner}/>
    </View>
  }
  
return (
  <>
   {component}
  <Image style={styles.image} source={require("./assets/castleDoor.png")}/>
   <TouchableOpacity style={styles.button}
  onPress={async () => {
    try {
      setErrorMessage(<></>);
      setLoading(true);
      // Sign in the user and get the token
      const { account, firebaseIdToken } = await onGoogleButtonPress();

      console.log("User:", account.user);
      console.log("Token:", firebaseIdToken);

      // Send token to server
      const response = await fetch( serverURL + "/api/players/email/" + account.user._user.email, 
        {
          method: "GET",
        headers: {
          "Authorization": `Bearer ${firebaseIdToken}`, // important!
          "Content-Type": "application/json"
        },
      });

      console.log(response);

      socketIO.connectSocket(firebaseIdToken, serverURL);

      const data = await response.json();
      console.log("Server response:", data);

      if(!data.error && !(data.message))
      {
        setPlayer(data.data) //save server player
        setLoading(false);
        setSuccess(true);
      }
      else
      {
        setLoading(false);
        signOut(getAuth());
        setErrorMessage(<Text style={styles.errorText}>{data.message}</Text>);
        GoogleSignin.revokeAccess();
      }

    } catch (error: any) {
      console.log(error);
      console.error("Error signing in or calling server: " +  error);
      signOut(getAuth());
      setLoading(false);
      GoogleSignin.revokeAccess();
    }
  }}
>
  <Text style={styles.text}>GOOGLE SIGN-IN</Text>
</TouchableOpacity>
  {errorMessage}
  </>
)

  
}

export default App;
