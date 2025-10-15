import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import socketIO from '../socketIO';
import { useNavigation } from '@react-navigation/native';
import playerContext from '../context';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Entrance() {

  const context = React.useContext(playerContext);
  const {player, setPlayer} = context
  const [showQR, setShowQR] = useState(false);
  const [socketId, setSocketId] = useState('');
  const navigation = useNavigation(); // this is needed for navigation

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
  const revealQR = () => setShowQR(prev => !prev);

  useEffect(() => {
    const socket = socketIO.getSocket();
    if (!socket) return;

    const handleEntryGranted = (updatedPlayer: any) => {
      setPlayer(updatedPlayer);

      if (updatedPlayer.isInside) {

        Alert.alert('Access Granted', 'You may enter the next room.');
        
      } else {
        Alert.alert('Access Denied', 'You are not verified yet.');
      }
    
    };

    socket.on('authorization', handleEntryGranted);
    return () => {
      socket.off('authorization', handleEntryGranted)
    }
  }, [navigation]);

  // --- Render UI ---
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./../assets/Entrance.webp')} style={styles.image} />
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
  );
}

export default Entrance;
