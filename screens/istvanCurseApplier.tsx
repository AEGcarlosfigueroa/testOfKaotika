import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Text, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
import CursePlayerView from '../props/cursePlayerView';
import socketIO from '../socketIO';
import { usePlayerStore } from '../gameStore';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Player } from "../interfaces/PlayerInterface";
import labImage from './../assets/tasks.png';

function istvanCurseApplier() {

  const styles = getStyles();

  const playerList = usePlayerStore(state => state.acolyteList);

  const isProcessingStatusApplication = usePlayerStore(state => state.isProcessingStatusApplication);

  const setIsProcessingStatusApplication = usePlayerStore(state => state.setIsProcessingStatusApplication);

  const [socketId, setSocketId] = useState<String>('');

  useEffect(() => {
      const socket = socketIO.getSocket();
      if (!socket) return;

      console.log("Subscribing to authorization events");

      const handler = () => {
        setIsProcessingStatusApplication(false);
      };
      

      socket.on("confirmation", handler);

      return () => {
        console.log("Unsubscribing from authorization events");
        socket.off("confirmation", handler);
      };
    }, [isProcessingStatusApplication]); 

  // --- Handle socket connection ---
  useEffect(() => {
    const socket = socketIO.getSocket();
    if (!socket) return;

    const handleConnect = () => setSocketId(socket.id || '');

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on('connect', handleConnect);
    }

    return () => {
      socket.off('connect', handleConnect);
    };
  }, []);

  const loading = (
    <View style={styles.fullScreen}>
      <ActivityIndicator size="large" style={styles.spinner} />
    </View>
  );

  
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Apply a curse</Text>
        <Text style={styles.title2}>Tap on an uninfected player to apply a curse</Text>
        <Image source={labImage} style={styles.image} />
        <SafeAreaProvider>
          <SafeAreaView>
            <ScrollView overScrollMode="auto" style={{ height: '75%'}}>
              {playerList.map((elem: Player, i: number) => {
                return (
                  <CursePlayerView player={elem} index={i} />
                )
              })}
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
        {isProcessingStatusApplication && loading}
      </View>
    </>
  )
}

export default istvanCurseApplier;

function getStyles()
{
  const { fontScale } = useWindowDimensions();

  const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: -10,
    },
    qrContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '40%',
      marginBottom: 50
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
    buttonText2: {
      fontFamily: 'OptimusPrincepsSemiBold',
      color: '#E2DFD2',
      fontSize: 30 * fontScale,
      textAlign: 'center',
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
    title: {
      fontSize: 30 * fontScale,
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
    },
    title2: {
      fontSize: 20 * fontScale,
      marginTop: '5%',
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '2%',
      textAlign: 'center'
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

  return styles;
}