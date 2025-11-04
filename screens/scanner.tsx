import React, { useEffect, useState } from 'react';
import { View, Alert, Text, Image, StyleSheet, Platform, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import socketIO from '../socketIO';
import { GenericButton } from '../props/genericButton';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
  title: {
    fontSize: 24,
    color: '#E2DFD2',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
    position: 'absolute',
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    top: '15%',
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: '25%',
    width: '50%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
  },
});

export default function Scanner() {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [camera, setCamera] = useState(false);

  useEffect(() => {
    async function requestPermission() {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'We need access to your camera to scan QR codes',
              buttonPositive: 'OK',
            }
          );
          setCameraPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Camera permission denied');
          }
        } else {
          setCameraPermission(true);
        }
      } catch (err) {
        console.warn('Permission request error:', err);
      }
    }
    requestPermission();
  }, []);

  const onReadCode = (event: any) => {
    if (!scanned) {
      const scannedEmail = event.nativeEvent.codeStringValue;
      setScanned(true);
      setCamera(prev => !prev);
      console.log('Scanned email:', scannedEmail);

      const socket = socketIO.getSocket();
      if (socket) socket.emit('scan', scannedEmail);

      Alert.alert('Scan Success!', `You scanned: ${scannedEmail}`);
    }
  };

  useEffect(() => {
    const socket = socketIO.getSocket();
    if (!socket) return;

    const handleScanResult = (data: any) => {
      if (data.success) {
        Alert.alert('Scan Success!', `You scanned: ${data.name}`);
      } else {
        Alert.alert('Scan Failed', data.message);
      }
    };

    socket.on('scan-result', handleScanResult);
    return () => socket.off('scan-result', handleScanResult);
  }, []);

  if (!cameraPermission) return <Text>Loading camera...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <GenericButton/>
      <Image source={require('./../assets/orb.png')} style={styles.image} />
      {camera && (
        <Camera
          style={{ flex: 1 }}
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={onReadCode}
        />
      )}
      <View style={styles.overlay}>
        {!camera && <Text style={styles.title}>Scan the forbidden Scroll</Text>}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setScanned(false);
            setCamera(prev => !prev);
          }}
        >
          <Text style={styles.buttonText}>{camera ? 'Close Camera' : 'Open Camera'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
