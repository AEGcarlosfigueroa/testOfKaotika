import React, { useState, useEffect, useContext } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {playerContext} from '../context';
import { mapContext } from '../context';
import { useNavigation } from "@react-navigation/native";
import {buttonStyles} from "../props/genericButton"


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
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    left: '25%',
    width: '50%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
  },
  
});


function Home() {

  const navigation = useNavigation();

  const context = useContext(playerContext)
  const {player} = context;

  const contextMap = useContext(mapContext)

  const {mapView, setMap} = contextMap
  


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
      <View style={buttonStyles.buttonContainer}>
        <TouchableOpacity
        onPress={() => {setMap(true);
          navigation.navigate('Map')
        }}>
        <Text style= {buttonStyles.buttonText}>OPEN MAP</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;