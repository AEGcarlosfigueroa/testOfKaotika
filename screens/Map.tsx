import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { buttonStyles } from "../props/genericButton";
import map from "../assets/map.png";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { isInTowerContext } from "../context";
import stars from "../assets/icons/stars.png"
import eye from "../assets/icons/eye.png"
import tarot from "../assets/icons/tarot.png"
import rune from "../assets/icons/rune.png"


function Map() {

  type RootStackParamList = {
    Home: undefined,
    Entrance: undefined,
    Tower: undefined,
    TowerEntrance: undefined,
    SpyCam: undefined
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const towerContext = React.useContext(isInTowerContext);
  const {isInTower, setIsInTower} = towerContext;

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
      width: (15*scale), height: (15*scale), top: (0.55*height), left: '10%', tintColor: 'white', position: 'absolute', zIndex: 20
    },
    towerStyle: {
      width : (15*scale), height : (15*scale), top: (0.3*height), left: '50%', tintColor: 'white', position: 'absolute', zIndex: 20
    },
    spycamStyle: {
      width : (15*scale), height : (15*scale), top: (0.6*height), left: '85%', tintColor: 'white', position: 'absolute', zIndex: 20
    }
  });

  return (
    <View style={styles.container}>
      <Image source={map} style={styles.mapImage} />
      <TouchableOpacity
      style={buttonStyles.button2}
      onPress={() => navigation.navigate('Home')}
    >
      <Text style={buttonStyles.buttonText2}>Back</Text>
    </TouchableOpacity>
      <View>
      <TouchableOpacity onPress={() =>
      {
        navigation.navigate('Entrance');
      }}>
        <View>
        <Image source={stars} style={styles.entranceStyle}/>
        </View>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {
        setIsInTower(true);
        console.log("entered tower");
        navigation.navigate('Tower');
      }}>
        <Image source={rune} style={styles.towerStyle}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('SpyCam')
      }}>
        <Image source={eye} style={styles.spycamStyle}/>
      </TouchableOpacity>
    </View>
  );
}

export default Map;
