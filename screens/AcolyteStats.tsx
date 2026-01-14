import React, { useEffect, useState } from "react";
import { View, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "react-native-gesture-handler";
import image from "./../assets/acolyteStats.png";
import { usePlayerStore } from "../gameStore";
import socketIO from "../socketIO";
import { Player } from "../interfaces/PlayerInterface";

export default function AcolyteStats()
{
    const player = usePlayerStore(state => state.player);

    const setPlayer = usePlayerStore(state => state.setPlayer);

    const [isProcessing, setIsProcessing] = useState<Boolean>(false);

    const styles = getStyles();

    let component = <></>;

    const loading = (
        <View style={styles.fullScreen}>
          <ActivityIndicator size="large" style={styles.spinner} />
        </View>
    );

    useEffect(() => {
        const socket = socketIO.getSocket();
        if (!socket) return;
    
        console.log("Subscribing to authorization events");
    
        const handler = (updatePlayer: Player) => {
          console.log("Received updated player:", updatePlayer);
          setPlayer(updatePlayer);
          setIsProcessing(false);
        };
    
        socket.on("authorization", handler);
    
        return () => {
          console.log("Unsubscribing from authorization events");
          socket.off("authorization", handler);
        };
      }, [player]); 

    if(!player?.isBetrayer && (player?.attributes[0].resistance || 0) > 30 && player?.statusEffects[0] === undefined)
    {
        component = (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  const socket = socketIO.getSocket();
                
                  if (socket) {
                    socket.emit("acolyteRest", " ");
                    setIsProcessing(true);
                  }
                }}
            >
              <Text style={styles.buttonText2}>Get some rest</Text>
            </TouchableOpacity>
        )
    }

    return (
    <View style={styles.fullScreen}>
      <Text style={styles.title}>PLAYER STATS</Text>
      <Text style={styles.text}>Resistance: {player?.attributes[0].resistance}</Text>
      <Text style={styles.text}>Insanity: {player?.attributes[0].insanity}</Text>
      <Text style={styles.text}>Intelligence: {player?.attributes[0].intelligence}</Text>
      <Text style={styles.text}>Charisma: {player?.attributes[0].charisma}</Text>
      <Text style={styles.text}>Dexterity: {player?.attributes[0].dexterity}</Text>
      <Text style={styles.text}>Strength: {player?.attributes[0].strength}</Text>
      {component}
      {isProcessing && loading}
      <Image source={image} style={styles.image}/>
    </View>
    );
}

function getStyles() {
    const { fontScale, height } = useWindowDimensions();

    const styles = StyleSheet.create({
        image: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: -10,
        },
        button2: {
            position: 'absolute',
            top: StatusBar.currentHeight,
            left: '5%',
            width: '25%',
            height: '5%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 5,
            borderWidth: 2,
            borderColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 15
        },
        title: {
            fontSize: 50 * fontScale,
            marginBottom: '5%',
            marginTop: StatusBar.currentHeight || 0,
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
        buttonText2: {
            fontFamily: 'OptimusPrincepsSemiBold',
            color: '#E2DFD2',
            fontSize: 30,
            textAlign: 'center',
        },
        text: {
            fontSize: 32 * fontScale,
            marginBottom: '2%',
            marginTop: '2%',
            color: '#E2DFD2',
            backgroundColor: 'rgba(0,0,0,0.5)',
            maxWidth: "100%",
            padding: '3%',
            borderRadius: 0.02 * height,
            fontFamily: 'OptimusPrincepsSemiBold',
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center'
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            margin: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 10,
            padding: 100,
            alignItems: 'center',

        },
        button: {
            borderRadius: 10,
            padding: 15,
            elevation: 5,
            borderColor: 'grey',
            borderWidth: 2,
            margin: 10,
            backgroundColor: "rgba(0,0,0,0.5)"

        },
        buttonOpen: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        buttonClose: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        textStyle: {
            color: '#E2DFD2',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
            color: '#E2DFD2',
            fontSize: 25 * fontScale,

        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between', // or 'center'
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
        },
        fullScreen: {
          height: '100%',
          position: 'absolute',
          zIndex: 10,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,1)'
        },
        spinner: {
          marginTop: '99%'
        },
    });

    return styles
}