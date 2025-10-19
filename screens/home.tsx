import React, { useState, useEffect, useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import playerContext from '../context';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#ffdb00',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
    boxShadow: '5px 5px 5px 5px black',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    // elevation: 2
    
  },
  
});


function Home() {

  const context = useContext(playerContext)
  const {player} = context;

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>Welcome {player.profile.role}</Text>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
}

export default Home;