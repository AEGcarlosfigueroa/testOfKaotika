import scrollImage from "./../assets/hallOfSages.png"
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import socketIO from "../socketIO";
import { usePlayerStore } from "../gameStore";
import artifactImage0 from './../assets/artifacts/artifact0.png'
import artifactImage1 from './../assets/artifacts/artifact1.png'
import artifactImage2 from './../assets/artifacts/artifact2.png'
import artifactImage3 from './../assets/artifacts/artifact3.png'

export default function MortimerArtifactAlert() {

  const artifactImages = [
    artifactImage0,
    artifactImage1,
    artifactImage2,
    artifactImage3
  ]

  const player = usePlayerStore(state => state.player)

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
      padding: 15
    },
    button: {
      position: 'absolute',
      top: '80%',
      left: '10%',
      width: '80%',
      height: '8%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 15
    },
    button2: {
      position: 'absolute',
      top: '70%',
      left: '10%',
      width: '80%',
      height: '8%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 15
    },
    buttonText2: {
      fontFamily: 'OptimusPrincepsSemiBold',
      color: '#E2DFD2',
      fontSize: 30,
      textAlign: 'center',
    },
    artifactImage: {
      width: 80,
      height: 80,
      margin: 10,
      zIndex: 10,
    }

  })

  return (
    <>
      <Image style={styles.image} source={scrollImage} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={[styles.title, { top: '40%', fontSize: 20 }]}>YOU ARE VERIFYING THE ARTIFACTS</Text>
        {player?.artifactInventory.map((elem: string, i: number) => {
          console.log("Player inventory:", player?.artifactInventory);
          console.log("elem:", elem, "index:", parseInt(elem));
          return (
            <Image
              key={i}
              source={artifactImages[parseInt(elem)]}
              style={styles.artifactImage}
            />
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          const socket = socketIO.getSocket();
          if (socket) {
            socket.emit("artifactEvaluation", "reset");
          }
        }}
      >
        <Text style={styles.buttonText2}>Reset Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const socket = socketIO.getSocket();

          if (socket) {
            socket.emit("artifactEvaluation", "verify");
          }
        }}
      >
        <Text style={styles.buttonText2}>Validate Search</Text>
      </TouchableOpacity>
    </>
  );
}
