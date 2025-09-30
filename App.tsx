import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button, View, Text} from 'react-native';
import { StyleSheet } from 'react-native';
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
    marginTop: '10%'
  },
  text: {
    backgroundColor: 'blue',
    textDecorationColor: 'white'
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

  return account;
};

function App()
{
  setTimeout( async () => {
    await BootSplash.hide({ fade: true });
    console.log("BootSplash has been hidden successfully");
  }, 1000)

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
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
    <View style={styles.button}>
    <Button
      title="Press here to see use data"
      onPress={() => console.log(getAuth())}
    />
    </View>
    <Text style={styles.text}>HELLO</Text>
    <View>
    <Button
      title="Press here to sign out"
      onPress={() => signOut(getAuth()).then(() => console.log('User signed out!'))}
    />
    </View>
    </>
  )
  }
  
  return (
  <View style={styles.button}>
  <Button
    title="Google Sign-In"
    onPress={() => onGoogleButtonPress().then(() => console.log(getAuth))}
  />
  <Button
      title="Press here to see use data"
      onPress={() => console.log(getAuth())}
    />
  </View>
  )
  
}

export default App;
