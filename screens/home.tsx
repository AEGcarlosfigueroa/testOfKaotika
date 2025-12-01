import React, { useState, useEffect, useContext } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import socketIO from '../socketIO';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { removeNofify } from '../pushNotification';
import { usePlayerStore } from '../gameStore';




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

    const mapView = usePlayerStore(state => state.mapView)

    const setMap = usePlayerStore(state => state.setMap)

    const player = usePlayerStore(state => state.player);

    if (player) {
  console.log(player.level); // ✅ safe, TypeScript knows player is not null here
}


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
  });
  


  let imageSource;

  switch(player?.profile.role) {
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
      <Text style={styles.title}>Welcome {player?.profile.role}</Text>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
}

export default Home;