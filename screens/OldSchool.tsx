import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { StatusBar } from "react-native";
import map from "../assets/oldSchool.png";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import stars from "../assets/icons/stars.png"
import tarot from "../assets/icons/tarot.png"
import jailDoor from "../assets/icons/jailDoor.png"
import { usePlayerStore, scrollStateList } from "../gameStore";

function OldSchool() {

  const scrollState = usePlayerStore(state => state.scrollState);

  const styles = getStyles();

  type RootStackParamList = {
    Home: undefined,
    Entrance: undefined,
    Tower: undefined,
    TowerEntrance: undefined,
    SpyCam: undefined,
    Map: undefined,
    OldSchool: undefined,
    HallOfSages: undefined,
    OldSchoolDungeon: undefined
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  let hallSages = <></>;

  if (scrollState === scrollStateList.destroyed) {
    hallSages = (
      <TouchableOpacity style={styles.hallStyle} onPress={() => {
        navigation.navigate('HallOfSages');
      }}>
        <Image source={tarot} style={styles.image2} />
        <Text style={styles.text}>HALL OF SAGES</Text>
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
      <TouchableOpacity style={styles.entranceStyle} onPress={() => {
        navigation.navigate('Entrance');
      }}>
        <Image source={stars} style={styles.image} />
        <Text style={styles.text}>LAB</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dungeonStyle} onPress={() => {
        navigation.navigate('OldSchoolDungeon');
      }}>
        <Image source={jailDoor} style={styles.image} />
        <Text style={styles.text}>DUNGEON</Text>
      </TouchableOpacity>
      {hallSages}
    </View>
  );
}

export default OldSchool;

function getStyles()
{
  const { height, width, scale, fontScale } = useWindowDimensions();

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
      width: (100*fontScale), height: (100*fontScale), top: (0.25 * height), left: (0.15 * width), tintColor: 'black', position: 'absolute', zIndex: 20
    },
    hallStyle: {
      width: (100*fontScale), height: (100*fontScale), top: (0.25 * height), left: '75%', tintColor: 'yellow', position: 'absolute', zIndex: 20
    },
    dungeonStyle: {
      width: (110*fontScale), height: (100*fontScale), top: (0.58 * height), left: '45%', tintColor: 'yellow', position: 'absolute', zIndex: 20
    },
    image: {
      width: (60 * fontScale), height: (60 * fontScale), tintColor: 'white'
    },
    image2: {
      width: (60 * fontScale), height: (60 * fontScale), tintColor: 'yellow'
    },
    title: {
      fontSize: 30 * fontScale,
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
    text: {
      fontSize: 20*fontScale,
      marginBottom: '5%',
      marginTop: '25%',
      color: '#E2DFD2',
      fontFamily: 'OptimusPrincepsSemiBold',
    },
    buttonText2: {
      fontFamily: 'OptimusPrincepsSemiBold',
      color: '#E2DFD2',
      fontSize: 30 * fontScale,
      textAlign: 'center',
    },
  });

  return styles;
}

