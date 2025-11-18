import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { buttonStyles } from "../props/genericButton";
import map from "../assets/oldSchool.png";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { scrollStateContext, scrollStateList } from "../context";
import stars from "../assets/icons/stars.png"
import eye from "../assets/icons/eye.png"
import tarot from "../assets/icons/tarot.png"
import rune from "../assets/icons/rune.png"


function OldSchool() {

  const context = React.useContext(scrollStateContext);

  const {scrollState, setScrollState} = context;

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
      width: (15*scale), height: (15*scale), top: (0.25*height), left: '10%', tintColor: 'white', position: 'absolute', zIndex: 20
    },
    hallStyle: {
      width: (15*scale), height: (15*scale), top: (0.25*height), left: '80%', tintColor: 'yellow', position: 'absolute', zIndex: 20
    },
    image: {
      width : (15*scale), height : (15*scale), tintColor: 'white'
    },
    image2: {
      width : (15*scale), height : (15*scale), tintColor: 'yellow'
    },
  });

  let hallSages = <></>;

  if(scrollState === scrollStateList.destroyed)
  {
    hallSages = (
      <TouchableOpacity style={styles.hallStyle} onPress={() =>
      {
        navigation.navigate('HallOfSages');
      }}>
        <Image source={tarot} style={styles.image2}/>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={map} style={styles.mapImage} />
      <TouchableOpacity
      style={buttonStyles.button2}
      onPress={() => navigation.navigate('Map')}
    >
      <Text style={buttonStyles.buttonText2}>Back</Text>
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