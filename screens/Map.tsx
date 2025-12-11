import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import map from "../assets/map.png";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import eye from "../assets/icons/eye.png"
import moon from "../assets/icons/moon.png"
import rune from "../assets/icons/rune.png"
import { StatusBar } from "react-native";
import { obituaryStateList, usePlayerStore } from "../gameStore";
import book from "../assets/icons/book.png";
import { serverURL } from "../App";

function Map() {

  const styles = getStyles();

  const obituaryState = usePlayerStore(state => state.obituaryState);

  type RootStackParamList = {
    Home: undefined,
    Entrance: undefined,
    Tower: undefined,
    TowerEntrance: undefined,
    SpyCam: undefined,
    Map: undefined,
    OldSchool: undefined,
    Swamp: undefined,
    Obituary: undefined
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const setIsInTower = usePlayerStore(state => state.setIsInTower)

  const setArtifacts = usePlayerStore(state => state.setArtifacts);

  const fetchArtifactsDB = async () => {
    try {
      const response = await fetch(`${serverURL}/api/artifacts/all`);
      const data = await response.json();
      console.log("Artifacts:");
      console.log(data);
      setArtifacts(data.artifactData);
      console.log("all artifacts acquired:", data.artifactData);
    } catch (error) {
      console.log("Error fetching artifacts:", error);
    }
    
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>THE MAP</Text>
      <Image source={map} style={styles.mapImage} />
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText2}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.oldschoolStyle} onPress={() => {
        navigation.navigate('OldSchool');
      }}>
        <Image source={moon} style={styles.image} />
        <Text style={styles.text}>School</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.towerStyle} onPress={() => {
        setIsInTower(true);
        console.log("entered tower");
        navigation.navigate('Tower');
      }}>
        <Image source={rune} style={styles.image} />
        <Text style={styles.text}>Tower</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.swampStyle} onPress={ async () => {
        await fetchArtifactsDB();
        navigation.navigate('Swamp')
      }}>
        <Image source={book} style={styles.image} />
        <Text style={styles.text}>Swamp</Text>
      </TouchableOpacity>
      {(obituaryState === obituaryStateList.unlocked) && (
        <TouchableOpacity style={styles.obituaryStyle} onPress={() => {
          navigation.navigate('Obituary')
        }}>
          <Image source={eye} style={styles.image} />
          <Text style={styles.text}>Obituary</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Map;

function getStyles()
{
  const { height, fontScale } = useWindowDimensions();

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
      width: (108*fontScale), height: (100*fontScale), top: (0.55*height), left: '10%', tintColor: 'white', position: 'absolute', zIndex: 20
    },
    towerStyle: {
      width : (108*fontScale), height : (100*fontScale), top: (0.3*height), left: '50%', position: 'absolute', zIndex: 20
    },
    image: {
      width : (50*fontScale), height : (50*fontScale), tintColor: 'white'
    },
    swampStyle: {
      width : (108*fontScale), height : (100*fontScale), top: (0.5*height), left: '70%', position: 'absolute', zIndex: 20
    },
    obituaryStyle: {
      width : (108*fontScale), height : (100*fontScale), top: (0.75*height), left: '60%', position: 'absolute', zIndex: 20
    },
    title: {
      fontSize: 30*fontScale,
      marginBottom: '5%',
      marginTop: '25%',
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
    text: {
      fontSize: 20*fontScale,
      marginBottom: '5%',
      marginTop: '25%',
      color: '#E2DFD2',
      fontFamily: 'OptimusPrincepsSemiBold',
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
      fontSize: 30 * fontScale,
      textAlign: 'center',
      },
    
    });

  return styles
}



