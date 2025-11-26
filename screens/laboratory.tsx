import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ColorValue } from 'react-native';
import { useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';
import socketIO from '../socketIO';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { removeNofify } from '../pushNotification';
import { StatusBar } from 'react-native';
import { usePlayerStore } from '../gameStore';

function Laboratory() {

  const styles = StyleSheet.create({
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
      fontSize: 18,
      textAlign: 'center',
      },

     image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: '75%'
  },
  logoutButton: {
    position: 'absolute',
    bottom: '20%',
    left: '25%',
    width: '50%',
    height: '8%',
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
  })

  const [showQR, setShowQR] = useState<Boolean>(false);
  const [socketId, setSocketId] = useState<String>('');

  const [buttonColor, setColor] = useState<ColorValue>('#E2DFD2');

  const player = usePlayerStore(state => state.player);

  const setPlayer = usePlayerStore(state => state.setPlayer)

  const navigation = useNavigation(); // this is needed for navigation

  const revealQR = () => setShowQR(prev => !prev);

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

  return (
    <>
    <Image source={require('./../assets/tasks.png')} style={styles.image} />
    <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24, marginTop: '10%', position: 'relative' }}>Welcome to the Laboratory!</Text>
        {showQR && (
        <View style={styles.qrContainer}>
          <QRCode value={player?.email || 'no-email'} size={150} />
        </View>
        
      )}
      <View style= {styles.logoutButton}>
       <TouchableOpacity
        onPress={() => {
          if(player)
          {
            removeNofify(player.email);

          }
          signOut(getAuth());
          GoogleSignin.revokeAccess();
          const socket = socketIO.getSocket();
          socket?.disconnect();
        }}>
      <Text style={[styles.buttonText2, {color : buttonColor}]}>LOG OUT</Text>
      </TouchableOpacity>
      </View>
      <View style= {styles.buttonContainer}>
       <TouchableOpacity
        onPress={revealQR}><Text style={[styles.buttonText2, {color : buttonColor}]}>{showQR ? 'Hide Esoteric Wisdom' : 'Reveal Mystery Scroll'}</Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

export default Laboratory;
