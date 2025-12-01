import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image, useWindowDimensions, View } from "react-native";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import socketIO from "../socketIO";
import { usePlayerStore } from "../gameStore";
import { removeNofify } from '../pushNotification';


function Settings() {

  const player = usePlayerStore(state => state.player);


  const {height, width, scale, fontScale} = useWindowDimensions();


const styles = StyleSheet.create({
  button: {
      position: 'absolute',
      bottom: '50%',
      left: '12.5%',
      width: '75%',
      height: '10%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',

  },
  text: {
      fontSize: 35*fontScale,
      color: '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
  },
  view: {
    backgroundColor: 'grey',
    height: '100%',
    width: '100%'
  },
  image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%'
  }
});


  
  let imageSource;

    switch(player?.profile.role) {

    case "ACOLITO":
      imageSource = require("./../assets/settings.png");
      break;
    case "ISTVAN":
      imageSource = require("./../assets/istvanHome.webp");
      break;
    case "MORTIMER":
      imageSource = require("./../assets/studyChamber.webp");
      break;
    case "VILLANO":
      imageSource = require("./../assets/dungeon.png");
      break;
  }

    return (
          <>
        <Image source={imageSource} style={styles.image}/>
               <View style={styles.button}>
               <TouchableOpacity
               onPress={() => {
                 if(player)
                 {
                   removeNofify(player.email);
       
                 }
                 signOut(getAuth());
                 GoogleSignin.revokeAccess();
                 const socket = socketIO.getSocket();
                 socket?.disconnect();
               }}>
               <Text style= {styles.text}>SIGN OUT</Text>
             </TouchableOpacity>
             </View>
        </>
    );
}

export default Settings