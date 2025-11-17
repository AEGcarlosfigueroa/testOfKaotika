import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { buttonStyles } from "../props/genericButton";
import map from "../assets/map.png";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { isInTowerContext } from "../context";
import stars from "../assets/icons/stars.png"
import eye from "../assets/icons/eye.png"
import moon from "../assets/icons/moon.png"
import rune from "../assets/icons/rune.png"


function Map() {

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
    oldschoolStyle: {
      width: (15*scale), height: (15*scale), top: (0.55*height), left: '10%', tintColor: 'white', position: 'absolute', zIndex: 20
    },
    towerStyle: {
      width : (15*scale), height : (15*scale), top: (0.3*height), left: '50%', position: 'absolute', zIndex: 20
    },
    image: {
      width : (15*scale), height : (15*scale), tintColor: 'white'
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

      <TouchableOpacity style={styles.oldschoolStyle} onPress={() =>
      {
        navigation.navigate('OldSchool');
      }}>
        <Image source={moon} style={styles.image}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.towerStyle} onPress={() => {
        setIsInTower(true);
        console.log("entered tower");
        navigation.navigate('Tower');
      }}>
        <Image source={rune} style={styles.image}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.spycamStyle} onPress={() => {
        navigation.navigate('SpyCam')
      }}>
        <Image source={eye} style={styles.image}/>
      </TouchableOpacity>

    </View>
  );
}

export default Map;
