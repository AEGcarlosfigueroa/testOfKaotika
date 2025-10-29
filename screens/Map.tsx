import React, {useState} from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
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
      justifyContent: "center",
      alignItems: "center",
    },
    mapImage: {
      width: "100%",
      height: "100%",
      zIndex: -10,
      position: 'absolute'
    },
  });



  return (
    <View style={styles.container}>
      <Image source={map} style={styles.mapImage} />
      <GenericButton/>
      <View>
      <TouchableOpacity onPress={() => {
      // code to run when pressed
      setText(!currentLocation)
      }}> 
        <Image source={rune} style={{width : 30, height : 30, top: '550%', tintColor: 'white'}}/>
      </TouchableOpacity>
      {currentLocation && <Text style= {{position: "absolute", fontFamily: 'OptimusPrinceps', color: 'white', top: '700%'}}>YOU ARE HERE</Text>}
      </View>
      <View>
      <TouchableOpacity onPress={() =>
      {
        navigation.navigate('Entrance');
      }}>
        <Image source={stars} style={{ width : 30, height : 30, top: '350%', right: '350%', tintColor: 'white'}}/>
      </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image source={tarot} style={{width : 30, height : 30, top: '500%', left: '35%', tintColor: 'white'}}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={eye} style={{width : 30, height : 30, bottom: '700%', left: '5%', tintColor: 'white'}}/>
      </TouchableOpacity>
    </View>
  );
}

export default Map;
