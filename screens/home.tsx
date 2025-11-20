import React, { useState, useEffect, useContext } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, StatusBar } from 'react-native';
import {playerContext} from '../context';
import { mapContext } from '../context';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import socketIO from '../socketIO';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { removeNofify } from '../pushNotification';




function Home() {

  type RootStackParamList = {
      Home: undefined,
      Entrance: undefined,
      Tower: undefined,
      TowerEntrance: undefined,
      SpyCam: undefined,
      Map: undefined
    }

    const {height, width, scale, fontScale} = useWindowDimensions();
  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const context = useContext(playerContext)
    const {player} = context;

    const contextMap = useContext(mapContext)

    const {mapView, setMap} = contextMap

    const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: -10,
    },

    title: {
      fontSize: 50*fontScale,
      marginBottom: '5%',
      marginTop: StatusBar.currentHeight,
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5%',
      textAlign: 'center'
      // elevation: 2

    },
    buttonText: {
      fontSize: 35*fontScale,
      color: '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
    },
    logoutButton: {
      position: 'absolute',
      bottom: '20%',
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
    buttonContainer: {
      position: 'absolute',
      bottom: '10%',
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
  });
  


  let imageSource;

  switch(player.profile.role) {
    case "ACOLITO":
      imageSource = require("./../assets/Acolytes.webp");
      break;
    case "ISTVAN":
      imageSource = require("./../assets/home.webp");
      break;
    case "MORTIMER":
      imageSource = require("./../assets/hallOfPower.png");
      break;
    case "VILLANO":
      imageSource = require("./../assets/dungeon.png");
      break;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={styles.title}>Welcome {player.profile.role}</Text>
      <Image source={imageSource} style={styles.image} />
       <View style={styles.logoutButton}>
        <TouchableOpacity
        onPress={() => {
          removeNofify(player.email);
          signOut(getAuth());
          GoogleSignin.revokeAccess();
          const socket = socketIO.getSocket();
          socket?.disconnect();
        }}>
        <Text style= {styles.buttonText}>SIGN OUT</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={() => {setMap(true);
          navigation.navigate('Map')
        }}>
        <Text style= {styles.buttonText}>OPEN MAP</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;