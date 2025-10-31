import React, {useState} from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { GenericButton, buttonStyles } from "../props/genericButton";
import map from "../assets/map.png";
import { useNavigation } from "@react-navigation/native";
import { mapContext } from "../context";
import rune from "../assets/icons/rune.png"
import SpyCam from '../screens/SpyCam';
import stars from "../assets/icons/stars.png"
import eye from "../assets/icons/eye.png"
import tarot from "../assets/icons/tarot.png"
import Entrance from "./Entrance";

function Map() {
  const navigation = useNavigation();
  const { mapView, setMap } = React.useContext(mapContext);
  const [currentLocation, setText] = useState(false)

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
  });

  const {height, width, scale, fontScale} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image source={map} style={styles.mapImage} />
      <TouchableOpacity
      style={buttonStyles.button2}
      onPress={() => navigation.navigate("Home")}
    >
      <Text style={buttonStyles.buttonText2}>Back</Text>
    </TouchableOpacity>
      <View>
      <TouchableOpacity onPress={() =>
      {
        navigation.navigate('Entrance');
      }}>
        <View>
        <Image source={stars} style={{ width: (15*scale), height: (15*scale), top: '1400%', left: '10%', tintColor: 'white', position: 'fixed', zIndex: 20}}/>
        </View>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Lair')
      }}>
        <Image source={tarot} style={{ width : (15*scale), height : (15*scale), top: "1300%", left: '85%', tintColor: 'white', position: 'fixed', zIndex: 20}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('SpyCam')
      }}>
        <Image source={eye} style={{width : (15*scale), height : (15*scale), top: "500%", left: '50%', tintColor: 'white', position: 'fixed', zIndex: 20}}/>
      </TouchableOpacity>
    </View>
  );
}

export default Map;
