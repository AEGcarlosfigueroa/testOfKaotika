import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { Text, Image, View, useWindowDimensions, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { GoogleAuthProvider, getAuth, signInWithCredential, signOut, onAuthStateChanged } from '@react-native-firebase/auth';
import React from 'react';
import { useState, useEffect } from 'react';
import googleJSON from './android/app/google-services.json';
import BootSplash from "react-native-bootsplash";
import Navigator from './components/navigator';
import socketIO from "./socketIO";
import { NavigationContainer } from '@react-navigation/native';
import pNotify from './pushNotification';
import messaging from '@react-native-firebase/messaging';
import { StatusBar } from 'react-native';
import { usePlayerStore } from './gameStore';
import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {

  console.log('Message handled in the background!', remoteMessage);
});

GoogleSignin.configure({
  //REMEMBER TO DOWNLOAD google-services.json and put it into the /android/app directory
  webClientId: googleJSON.client[0].oauth_client[1].client_id,
});

// export const serverURL = "http://10.50.0.50:6002";
// export const serverURL = "https://testofkaotika-server.onrender.com";
// const serverURL = "http://localhost:3000";
// export const serverURL = "http://10.70.0.24:3000"
// export const serverURL = "http://10.70.0.24:3000"
export const serverURL = 'http://10.70.0.154:3000'
// export const serverURL = 'http://192.168.0.224:3000'
// export const serverURL = 'http://192.168.1.131:3000'

const onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  await GoogleSignin.signIn();

  // Try the new style of google-sign in result, from v13+ of that module
  let idToken = (await (GoogleSignin.getTokens())).idToken;

  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const account = await signInWithCredential(getAuth(), googleCredential);

  const firebaseIdToken = await account.user.getIdToken();

  return { account, firebaseIdToken };
};

function App() {

  const { height, width, scale, fontScale } = useWindowDimensions();

  const styles = StyleSheet.create({
    button: {
      top: '45%',
      left: '25%',
      width: '50%',
      height: '5%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      borderRadius: '25%',
      borderWidth: 2,
      borderColor: 'grey'
    },
    text: {
      color: 'yellow',
      alignSelf: 'center',
      margin: '5%',
      fontSize: 20 * fontScale
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
      marginTop: StatusBar.currentHeight,
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

  setTimeout(async () => {
    await BootSplash.hide({ fade: true });
    console.log("BootSplash has been hidden successfully");
  }, 1000)

  const [initializing, setInitializing] = useState<Boolean>(true);

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState<Boolean>(false);

  const [success, setSuccess] = useState<Boolean>(false);

  const [errorMessage, setErrorMessage] = useState<Element>(<></>);

  const player = usePlayerStore(state => state.player);

  const setPlayer = usePlayerStore(state => state.setPlayer);

  const setIsInTower = usePlayerStore(state => state.setIsInTower)

  const setScrollState = usePlayerStore(state => state.setScrollState);

  const setObituaryState = usePlayerStore(state => state.setObituaryState)

  const [hasLoggedIn, setHasLoggedIn] = useState<Boolean>(false);

  async function fetchCurrentScrollState() {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axiosInstance.get(serverURL + "/api/states/all", { headers: { 'jwtauthorization': `Bearer ${token}` } });
    const data = await response.data;
    setScrollState(data.state.scrollState);
    setObituaryState(data.state.obituaryState);
    console.log("Server response:", data);
  }

  function handleAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (!user) {
      setSuccess(false);
    }
  }

  async function attemptLogIn() {
    try {
      setErrorMessage(<></>);
      setLoading(true);
      // Sign in the user and get the token
      const { account, firebaseIdToken } = await onGoogleButtonPress();

      console.log("User:", account.user.email);
      console.log("Token:", firebaseIdToken);

      const tokenResponse = await fetch(serverURL + "/api/jwt/generateToken/" + account.user.email,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${firebaseIdToken}`, // important!
            "Content-Type": "application/json"
          },
        });

      const tokenData = await tokenResponse.json();

      if (tokenResponse.ok) {
        await AsyncStorage.setItem('accessToken', tokenData.data.accessToken);
        await AsyncStorage.setItem('refreshToken', tokenData.data.refreshToken);
      }

      const accessToken = await AsyncStorage.getItem('accessToken')

      // Send token to server
      const response = await axiosInstance.get(serverURL + "/api/players/email/" + account.user.email, { headers: { 'jwtauthorization': "Bearer: " + accessToken } });

      console.log(response);

      socketIO.connectSocket(firebaseIdToken, serverURL);

      const data = await response.data;
      console.log("Server response:", data);

      if (!data.error && !(data.message)) {
        setPlayer(data.data) //save server player
        setLoading(false);
        setSuccess(true);
        if (data.data.isInTower === true) {
          setIsInTower(true);
        }
        else {
          setIsInTower(false);
        }

        await pNotify(serverURL, data.data.email);
        await fetchCurrentScrollState();
        setHasLoggedIn(true);
      }

      else {
        console.log(data)
        setLoading(false);
      }

    } catch (error: any) {
      console.log(error);
      console.error("Error signing in or calling server: " + error);
    }
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (GoogleSignin.getCurrentUser() && !hasLoggedIn) {
      attemptLogIn()
    }
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification?.body)
        ToastAndroid.show(remoteMessage.notification?.body, 5);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null;

  if (user && success) {
    return (
      <NavigationContainer>

        <Navigator />

      </NavigationContainer>

    )

  }

  let component = <></>

  if (loading) {
    component = <View style={styles.fullScreen}>
      <ActivityIndicator size="large" style={styles.spinner} />
    </View>
  }

  return (
    <>
      {component}
      <Image style={styles.image} source={require("./assets/castleDoor.png")} />
      <TouchableOpacity style={styles.button}
        onPress={async () => {
          try {
            setErrorMessage(<></>);
            setLoading(true);
            // Sign in the user and get the token
            const { account, firebaseIdToken } = await onGoogleButtonPress();

            console.log("User:", account.user.email);
            console.log("Token:", firebaseIdToken);

            const tokenResponse = await fetch(serverURL + "/api/jwt/generateToken/" + account.user.email,
              {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${firebaseIdToken}`, // important!
                  "Content-Type": "application/json"
                },
              });

            const tokenData = await tokenResponse.json();

            if (tokenResponse.ok) {
              await AsyncStorage.setItem('accessToken', tokenData.data.accessToken);
              await AsyncStorage.setItem('refreshToken', tokenData.data.refreshToken);
            }

            const accessToken = await AsyncStorage.getItem('accessToken')

            // Send token to server
            const response = await axiosInstance.get(serverURL + "/api/players/email/" + account.user.email, { headers: { 'jwtauthorization': "Bearer: " + accessToken } });

            console.log(response);

            socketIO.connectSocket(firebaseIdToken, serverURL);

            const data = await response.data;
            console.log("Server response:", data);

            if (!data.error && !(data.message)) {
              setPlayer(data.data) //save server player
              setLoading(false);
              setSuccess(true);
              if (data.data.isInTower === true) {
                setIsInTower(true);
              }
              else {
                setIsInTower(false);
              }

              await pNotify(serverURL, data.data.email);
              await fetchCurrentScrollState();
              setHasLoggedIn(true);
            }
            else {
              console.log(data)
              setLoading(false);
              signOut(getAuth());
              setErrorMessage(<Text style={styles.errorText}>{data.message}</Text>);
              GoogleSignin.revokeAccess();
            }

          } catch (error: any) {
            console.log(error);
            console.error("Error signing in or calling server: " + error);
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
