import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import map from "../assets/map.png";
import { mapContext } from "../context";
import rune from "../assets/icons/rune.png"
import moon from "../assets/icons/moon.png"
import tarot from "../assets/icons/tarot.png"

function Map() {
  const { mapView, setMap } = React.useContext(mapContext);

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
    },
  button: {
    position: 'absolute',
    bottom: 700,
    left: '5%',
    width: '25%',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',

    
  },
    buttonText: {
      fontFamily: 'OptimusPrincepsSemiBold',
      color: '#E2DFD2',
      fontSize: 18,
      textAlign: 'center',
    },
  });



  return (
    <View style={styles.container}>
      <Image source={map} style={styles.mapImage} />
      <TouchableOpacity style={styles.button} onPress={() => setMap(false)}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
      <Image source={rune} style={{width : 30, height : 30, bottom: '10%', tintColor: 'white'}}/>

    </View>
  );
}

export default Map;
