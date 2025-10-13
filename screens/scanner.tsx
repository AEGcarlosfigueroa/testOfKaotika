import React, { useEffect } from 'react';
import { View, Alert, Text, Image, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
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
});

function Scanner() {
  const handleSuccess = (e: { data: string }) => {
    const scannedEmail = e.data; // QR code should contain the Acolito email
    console.log("Scanned email:", scannedEmail);

    // Send it to server via socket
    const socket = socketIO.getSocket();
    if (socket) {
      socket.emit("scan-acolito", { email: scannedEmail });
    }
  };

  useEffect(() => {
    const socket = socketIO.getSocket();
    if (!socket) return;

    const handleScanResult = (data: any) => {
      if (data.success) {
        Alert.alert("Scan Success!", `You scanned: ${data.name}`);
      } else {
        Alert.alert("Scan Failed", data.message);
      }
    };

    socket.on("scan-result", handleScanResult);

    return () => {
      socket.off("scan-result", handleScanResult);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
    <Image source={require("./../assets/settings.png")} style={styles.image}/>  
      <QRCodeScanner
        onRead={handleSuccess}
        reactivate={true} // allows scanning again without closing camera
        showMarker={true} // shows a small box to align the QR
        topContent={<View style={{ margin: 20 }}><Text>Scan an Acolito QR</Text></View>}
      />
    </View>
  );
}

export default Scanner;
