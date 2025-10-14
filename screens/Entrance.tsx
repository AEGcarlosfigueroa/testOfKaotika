import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import socketIO from '../socketIO';
import { useNavigation } from '@react-navigation/native';

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

function Entrance({ player }: { player: { email: string } }) {
  const [showQR, setShowQR] = useState(false);
  const [socketId, setSocketId] = useState('');
  const navigation = useNavigation(); // 👈 this is needed for navigation

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

  // --- Listen for entry verification from the server ---
  useEffect(() => {
    const socket = socketIO.getSocket();
    if (!socket) return;

    const handleEntryGranted = (data: any) => {
      if (data.verified) {
        Alert.alert('Access Granted', 'You may enter the next room.');
        navigation.navigate('Laboratory', { verified: true });
      } else {
        Alert.alert('Access Denied', 'You are not verified yet.');
      }
    };

    socket.on('entry-granted', handleEntryGranted);
    return () => socket.off('entry-granted', handleEntryGranted);
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
