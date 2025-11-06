import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import React from "react";
import { buttonStyles } from "../props/genericButton";
import socketIO from "../socketIO";
import { signOut, getAuth } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

//Refractor later put in a seperate file called styles 
const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 20,
    color: '#E2DFD2',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
    boxShadow: '5px 5px 5px 5px black',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    // elevation: 2
    
  },
})

function Tower ()
{ 

  return (
    <>
    <Image source={require('./../assets/settings.png')} style={styles.image} />
    <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
      <Text style={{ color: 'black', fontSize: 24, marginTop: '10%', position: 'relative' }}>Welcome to the Tower!</Text>
      <View style= {buttonStyles.buttonContainer}>
       <TouchableOpacity
        onPress={() => {
          signOut(getAuth());
          GoogleSignin.revokeAccess();
          const socket = socketIO.getSocket();
          socket?.disconnect();
        }}>
      <Text style={[buttonStyles.buttonText2, {color : 'white'}]}>LOG OUT</Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
  );
    }
    

export default Tower