import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Text, Image, View} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { GoogleAuthProvider, getAuth, signInWithCredential, signOut, onAuthStateChanged } from '@react-native-firebase/auth';
import React from 'react';
import { useState, useEffect } from 'react';
import googleJSON from './android/app/google-services.json';
import BootSplash from "react-native-bootsplash";

GoogleSignin.configure({
  //REMEMBER TO DOWNLOAD google-services.json and put it into the /andoird/app directory
  webClientId: googleJSON.client[0].oauth_client[1].client_id,
});

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
  let idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);

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

  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if(user)
  {
    return (
      <>
    <TouchableOpacity style={styles.button}
      onPress={() => signOut(getAuth()).then(() => console.log('User signed out!'))}
    >
      <Text style={styles.text}>SIGN OUT</Text>
    </TouchableOpacity>
    </>
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
  <View style={styles.button}>
   <Button
  title="Google Sign-In"
  onPress={async () => {
    try {
      // Sign in the user and get the token
      const { account, firebaseIdToken } = await onGoogleButtonPress();

      console.log("User:", account.user);
      console.log("Token:", firebaseIdToken);

      // Send token to server
      const response = await fetch("http://localhost:3000/api/players", {
        method: "GET", // or POST if your route is POST
        headers: {
          "Authorization": `Bearer ${firebaseIdToken}`, // important!
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();
      console.log("Server response:", data);

    } catch (err) {
      console.error("Error signing in or calling server:", err);
    }
  }}
/>

  </View>
)

  
}

export default App;
