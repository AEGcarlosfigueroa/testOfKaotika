import React from 'react';
import { Image, StyleSheet, View, Text, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';
import playerContext from '../context';
import socketIO from '../socketIO';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%',
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



function Laboratory() {

  const [showQR, setShowQR] = useState(false);
  const [socketId, setSocketId] = useState('');

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
    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24 }}>Welcome to the Laboratory!</Text>
       <Button
          onPress={revealQR}
          title={showQR ? 'Hide Esoteric Wisdom' : 'Reveal Mystery Scroll'}
        />
        {showQR && (
        <View style={styles.qrContainer}>
          <QRCode value={player?.email || 'no-email'} size={150} />
        </View>
      )}
    </View>
    </>
  );
}

export default Laboratory;
