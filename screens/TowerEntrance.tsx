import { View, Text, Image, StyleSheet, Alert } from "react-native"
import React, { useContext, useEffect, useState } from "react";
import { playerContext } from "../context";
import { GenericButton } from "../props/genericButton";
import socketIO from "../socketIO";
import { useNavigation } from '@react-navigation/native';

//Refractor later put in a seperate file called styles 
const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 20,
    color: '#E2DFD2',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
    boxShadow: '5px 5px 5px 5px black',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    // elevation: 2
    
  },
})

function TowerEntrance ()
{ 
  
    const warning = "Turn back, traveler. The gate ahead does not open to the world of men."
    const context = React.useContext(playerContext);
    const {player, setPlayer} = context;

    const imageSource = require('../assets/settings.png')
    const [socketId, setSocketId] = useState('');
    const navigation = useNavigation();

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


      useEffect(() => {
          const socket = socketIO.getSocket();
          if (!socket) return;
      
          const handleEntryGranted = (updatedPlayer: any) => {
            setPlayer(updatedPlayer);
      
            if (updatedPlayer.isInTower) {
      
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

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image source={imageSource} style={styles.image}/>
                {player.profile.role === "ACOLITO" && <Text style={[styles.title, { top: '40%', fontSize: 20}]}>{warning}</Text>}
                <GenericButton/>
            </View>
        )
    }
    

export default TowerEntrance