import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import socketIO from '../socketIO';
// import socket from '../socket';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  }
});

type Player = { profile: { role: "ACOLITO" | "ISTVAN" | "MORTIMER" | "VILLANO" } };

function Home({ player }: { player: Player }) {
  let imageSource;

  switch(player.profile.role) {
    case "ACOLITO":
      imageSource = require("./../assets/Acolytes.webp");
      break;
    case "ISTVAN":
      imageSource = require("./../assets/home.webp");
      break;
    case "MORTIMER":
      imageSource = require("./../assets/hallOfPower.png");
      break;
    case "VILLANO":
      imageSource = require("./../assets/dungeon.png");
      break;
  }

  const [showQR, setShowQR] = useState(false);
  const [socketId, setSocketId] = useState("null")

  
  
  useEffect (() =>{
    const socket = socketIO.getSocket();
    if(!socket){
      return;
    }
    const handlesConnect = () => {
        setSocketId(socket.id || "");
    }

    if(socket.connected)
    {
      handlesConnect();
    }
    else {
      socket.on("connect", handlesConnect);
    }

    // return () => {
    // socket.off("connect", handlesConnect);
    // };

  },[]);

  const revealQR = () => {
    setShowQR(prev => !prev);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={imageSource} style={styles.image} />

      <Button onPress={revealQR} title={showQR ? "Hide Esoteric Wisdom" : " Reveal Mystery SCroll"}/>

      {showQR && <QRCode value={socketId} size={150} />}
    </View>
  );
}

export default Home;