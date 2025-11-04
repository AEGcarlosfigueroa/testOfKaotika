import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';
import {playerContext} from '../context';
import socketIO from '../socketIO';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../props/genericButton';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const styles = StyleSheet.create({
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
  }
});



function Laboratory() {

  const [showQR, setShowQR] = useState(false);
  const [socketId, setSocketId] = useState('');

  const [buttonColor, setColor] = useState('#E2DFD2');

  const context = React.useContext(playerContext);
  const {player, setPlayer} = context;
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
  
        if (updatedPlayer.isInside) {
  
          Alert.alert('Access Denied', 'You may not exit the laboratory');
          
        } else {
          Alert.alert('Access Granted', 'You may exit the laboratory');
        }
      
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
          signOut(getAuth());
          GoogleSignin.revokeAccess();
          const socket = socketIO.getSocket();
          socket?.disconnect();
        }}>
      <Text style={[buttonStyles.buttonText2, {color : buttonColor}]}>LOG OUT</Text>
      </TouchableOpacity>
      </View>
      <View style= {buttonStyles.buttonContainer}>
       <TouchableOpacity
        onPress={revealQR}><Text style={[buttonStyles.buttonText2, {color : buttonColor}]}>{showQR ? 'Hide Esoteric Wisdom' : 'Reveal Mystery Scroll'}</Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

export default Laboratory;
