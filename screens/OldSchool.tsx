import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { StatusBar } from "react-native";
import map from "../assets/oldSchool.png";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { scrollStateList } from "../context";
import stars from "../assets/icons/stars.png"
import eye from "../assets/icons/eye.png"
import tarot from "../assets/icons/tarot.png"
import rune from "../assets/icons/rune.png"
import { usePlayerStore } from "../gameStore";
import socketIO from "../socketIO";


function OldSchool() {

  const scrollState = usePlayerStore(state => state.scrollState)

  type RootStackParamList = {
    Home: undefined,
    Entrance: undefined,
    Tower: undefined,
    TowerEntrance: undefined,
    SpyCam: undefined,
    Map: undefined,
    OldSchool: undefined,
    HallOfSages: undefined
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {height, width, scale, fontScale} = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%"
    },
    mapImage: {
      width: "100%",
      height: "100%",
      zIndex: -10,
      position: 'absolute'
    },
    entranceStyle: {
      width: (15*scale), height: (15*scale), top: (0.25*height), left: (0.15*width), tintColor: 'black', position: 'absolute', zIndex: 20
    },
    hallStyle: {
      width: (15*scale), height: (15*scale), top: (0.25*height), left: '80%', tintColor: 'yellow', position: 'absolute', zIndex: 20
    },
    image: {
      width : (60*fontScale), height : (60*fontScale), tintColor: 'white'
    },
    image2: {
      width : (60*fontScale), height : (60*fontScale), tintColor: 'yellow'
    },
    title: {
      fontSize: 30*fontScale,
      marginBottom: '5%',
      marginTop: '20%',
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5%',
      textAlign: 'center'
      // elevation: 2
    },
    button2: {
          position: 'absolute',
          top: StatusBar.currentHeight,
          left: '5%',
          width: '25%',
          height: '5%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 5,
          borderWidth: 2,
          borderColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 15
    
        },
          buttonText2: {
          fontFamily: 'OptimusPrincepsSemiBold',
          color: '#E2DFD2',
          fontSize: 30*fontScale,
          textAlign: 'center',
          },
  });

  let hallSages = <></>;

  if(scrollState === scrollStateList.destroyed)
  {
    hallSages = (
      <TouchableOpacity style={styles.hallStyle} onPress={() =>
      {
        const socket = socketIO.getSocket();
        if(socket)
        {
          socket.emit("hallOfSages", "enter");
          console.log("hallOfSages message emitted");
        }
        navigation.navigate('HallOfSages');
      }}>
        <Image source={tarot} style={styles.image2}/>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THE OLD SCHOOL</Text>
      <Image source={map} style={styles.mapImage} />
      <TouchableOpacity
      style={styles.button2}
      onPress={() => navigation.navigate('Map')}
    >
      <Text style={styles.buttonText2}>Back</Text>
    </TouchableOpacity>
      <TouchableOpacity style={styles.entranceStyle} onPress={() =>
      {
        navigation.navigate('Entrance');
      }}>
        <Image source={stars} style={styles.image}/>
      </TouchableOpacity>
       {hallSages}
    </View>
  );
}

export default OldSchool;