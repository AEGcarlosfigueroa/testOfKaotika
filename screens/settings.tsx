import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import socketIO from "../socketIO";
import {playerContext} from "../context";


const styles = StyleSheet.create({
    button: {
    top: '45%',
    left: '25%',
    width: '50%',
    height : '10%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    borderRadius: 5,
    borderColor: 'grey',
    justifyContent: 'center'

  },
  text: {
    color: '#E2DFD2',
    alignSelf: 'center',
    fontSize: 18,
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

function Settings() {

  const context = React.useContext(playerContext)
  const {player} = context
  
  let imageSource;

    switch(player.profile.role) {

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
        <TouchableOpacity style={styles.button}
          onPress={() => {
            signOut(getAuth());
            GoogleSignin.revokeAccess();
            const socket = socketIO.getSocket();
            socket?.disconnect();
          }}
        >
          <Text style={styles.text}>SIGN OUT</Text>
        </TouchableOpacity>
        </>
    );
}

export default Settings