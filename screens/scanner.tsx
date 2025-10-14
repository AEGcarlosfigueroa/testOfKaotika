import React, { useEffect, useState } from 'react';
import { View, Alert, Text, Image, StyleSheet, Button, Platform, PermissionsAndroid } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import socketIO from '../socketIO';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  overlay: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
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
        setCameraPermission(true); // iOS handled automatically
      }
    } catch (err) {
      console.warn('Permission request error:', err);
    }
  }
  requestPermission();
}, []);


  // Handle QR code scan
  const onReadCode = (event: any) => {
    if (!scanned) {
      const scannedEmail = event.nativeEvent.codeStringValue;
      setScanned(true);
      console.log('Scanned email:', scannedEmail);

      const socket = socketIO.getSocket();
      if (socket) socket.emit('scan-acolito', { email: scannedEmail });

      Alert.alert('Scan Success!', `You scanned: ${scannedEmail}`);
    }
  };

  // Listen for server response
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
      <Image source={require('./../assets/orb.png')} style={styles.image} />
      {camera ? (
        <Camera
          style={{ flex: 1 }}
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={onReadCode}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Camera is off</Text>
        </View>
      )}
      <View style={styles.overlay}>
        <Text style={styles.title}>Scan an Acolito QR</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={camera ? 'Close Camera' : 'Open Camera'}
          onPress={() => {
            setScanned(false); // reset for new scans
            setCamera(prev => !prev);
          }}
        />
      </View>
    </View>
  );
}
