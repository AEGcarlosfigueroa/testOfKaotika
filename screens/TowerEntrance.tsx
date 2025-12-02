import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native"
import React from "react";
import { GenericButton } from "../props/genericButton";
import { usePlayerStore } from "../gameStore";
import pergamino from "../assets/pergamino.png"

function TowerEntrance() {

  const warning = "Turn back, traveler. The gate ahead does not open to the world of men."

  const player = usePlayerStore(state => state.player)

  const imageSource = require('../assets/towerEntrance.png')

  if (player?.profile.role !== 'ACOLITO') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Tower Logs</Text>
        <Image source={pergamino} style={styles.image} />
        <GenericButton />
      </View>
    )
  }
  else {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.title2}>THE TOWER ENTRANCE</Text>
        <Image source={imageSource} style={styles.image} />
        {player?.profile.role === "ACOLITO" && <Text style={[styles.title, { top: '40%', fontSize: 30 * fontScale }]}>{warning}</Text>}
        <GenericButton />
      </View>
    )
  }
}

export default TowerEntrance;

const { fontScale } = useWindowDimensions();

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
  title: {
    fontSize: 30 * fontScale,
    marginBottom: '150%',
    marginTop: '5%',
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
  title2: {
    fontSize: 30 * fontScale,
    marginBottom: '5%',
    marginTop: '25%',
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
})