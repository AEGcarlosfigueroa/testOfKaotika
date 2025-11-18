import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ColorValue} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import socketIO from '../socketIO';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {playerContext} from '../context';
import { buttonStyles } from '../props/genericButton';

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
    marginBottom: 50
  },
    
});

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

  const context = React.useContext(playerContext);
  const {player, setPlayer} = context;
  const [showQR, setShowQR] = useState<Boolean>(false);
  const [socketId, setSocketId] = useState<String>('');
  const [buttonColor, setColor] = useState<ColorValue>('#E2DFD2')

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

  if(player.profile.role !== 'ACOLITO')
  {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./../assets/Entrance.webp')} style={styles.image} />
        <TouchableOpacity
           style={buttonStyles.button2}
           onPress={() => navigation.navigate('OldSchool')}
         >
           <Text style={buttonStyles.buttonText2}>Back</Text>
         </TouchableOpacity>
    </View>
    )
  }

  // --- Render UI ---
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./../assets/Entrance.webp')} style={styles.image} />
      <View style= {buttonStyles.buttonContainer}>
      <TouchableOpacity
        onPress={revealQR}><Text style={[buttonStyles.buttonText2, {color : buttonColor}]}>{showQR ? 'Hide Esoteric Wisdom' : 'Reveal Mystery Scroll'}</Text>
      </TouchableOpacity>
      </View>
      {showQR && (
        <View style={styles.qrContainer}>
          <QRCode value={player?.email || 'no-email'} size={200} />
        </View>
      )}
        <TouchableOpacity
           style={buttonStyles.button2}
           onPress={() => navigation.navigate('OldSchool')}
         >
           <Text style={buttonStyles.buttonText2}>Back</Text>
         </TouchableOpacity>
    </View>
  );
}

export default Entrance;
