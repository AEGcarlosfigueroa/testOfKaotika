import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native"
import React from "react";
import { GenericButton } from "../props/genericButton";
import { usePlayerStore } from "../gameStore";
import pergamino from "../assets/pergamino.png";
import { Player } from "../interfaces/PlayerInterface";

function TowerEntrance() {

  const warning = "Turn back, traveler. The gate ahead does not open to the world of men."

  const player = usePlayerStore(state => state.player);

  const playerList = usePlayerStore(state => state.playerList);

  const imageSource = require('../assets/towerEntrance.png')

  if (player?.profile.role !== 'ACOLITO') {
    return (
      <>
      <Image source={pergamino} style={styles.image} />
        <Text style={styles.title}>Tower Logs</Text>
        <GenericButton />
        <View style={{ height: '85%', flex: 1, flexDirection: 'row', position: 'absolute', width: '90%', marginLeft: '5%', marginTop: '50%'}}>
          {playerList.map((elem: Player, i: any) => {
            if (elem.isInTower) {
              console.log(elem);
              return <Image key={i} src={elem.avatar} style={styles.entryImage} />;
            }
            return <View key={i}></View>
          })}
        </View>
      </>
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

const { height, fontScale } = useWindowDimensions();

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
    marginTop: '20%',
    color: '#E2DFD2',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
    boxShadow: '5px 5px 5px 5px black',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '5%',
    textAlign: 'center'
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
  },
  entryImage: {
    height: 0.1 * height,
    width: 0.1 * height,
    position: 'relative',
    padding: '1%',
    borderRadius: 0.1 * height,
    borderColor: 'lightblue',
    borderStyle: 'solid',
    borderWidth: 0.005 * height
  },
})