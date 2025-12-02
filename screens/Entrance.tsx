import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Text, ColorValue, StatusBar, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import socketIO from '../socketIO';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { usePlayerStore } from '../gameStore';
import PlayerView from '../props/playerView'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Player } from "../interfaces/PlayerInterface";
import labImage from './../assets/tasks.png'

function Entrance() {

  type RootStackParamList = {
    Home: undefined,
    Entrance: undefined,
    Tower: undefined,
    TowerEntrance: undefined,
    SpyCam: undefined,
    Map: undefined,
    OldSchool: undefined
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const player = usePlayerStore(state => state.player);

  const setPlayer = usePlayerStore(state => state.setPlayer)

  const playerList = usePlayerStore(state => state.playerList)

  const [showQR, setShowQR] = useState<Boolean>(false);
  const [socketId, setSocketId] = useState<String>('');
  const [buttonColor, setColor] = useState<ColorValue>('#ffce00')

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

  // --- Toggle QR visibility ---
  const revealQR = () => {
    setShowQR(prev => {
      const newValue = !prev;
      setColor(newValue ? '#E2DFD2' : '#ffce00'); // toggle color
      return newValue;
    });
  };

  useEffect(() => {
    const socket = socketIO.getSocket();
    if (!socket) return;

    const handleEntryGranted = (updatedPlayer: any) => {
      setPlayer(updatedPlayer);
    };

    socket.on('authorization', handleEntryGranted);
    return () => {
      socket.off('authorization', handleEntryGranted)
    }
  }, [navigation]);

  if (player?.profile.role !== 'ACOLITO') {
    return (
      <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>THE LAB LOGS</Text>
          <Image source={labImage} style={styles.image} />
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('OldSchool')}
          >
            <Text style={styles.buttonText2}>Back</Text>
          </TouchableOpacity>
          <SafeAreaProvider>
            <SafeAreaView>
              <ScrollView overScrollMode="auto" style={{ height: '75%'}}>
                {playerList.map((elem: Player, i: number) => {
                  return <PlayerView player={elem} index={i} />
                })}
              </ScrollView>
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      </>
    )
  }

  // --- Render UI ---
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={styles.title}>THE LAB ENTRANCE</Text>
      <Image source={require('./../assets/Entrance.webp')} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={revealQR}><Text style={[styles.buttonText2, { color: buttonColor }]}>{showQR ? 'Hide Esoteric Wisdom' : 'Reveal Mystery Scroll'}</Text>
        </TouchableOpacity>
      </View>
      {showQR && (
        <View style={styles.qrContainer}>
          <QRCode value={player?.email || 'no-email'} size={200} />
        </View>
      )}
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('OldSchool')}
      >
        <Text style={styles.buttonText2}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Entrance;

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
    marginBottom: '5%',
    marginTop: '30%',
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
});