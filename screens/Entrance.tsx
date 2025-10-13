import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import socketIO from '../socketIO';

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

  const revealQR = () => setShowQR(prev => !prev);

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
