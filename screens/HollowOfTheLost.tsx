import React from 'react';
import { View, Image, StyleSheet, Text, useWindowDimensions, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import background from './../assets/hollowOfTheLost.png';

function HollowOfTheLost() {

  const styles = getStyles();

  type RootStackParamList = {
    Map: undefined,
    Home: undefined,
    Entrance: undefined,
    Tower: undefined,
    TowerEntrance: undefined,
    SpyCam: undefined,
    OldSchool: undefined
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            navigation.navigate('Map')
          }}
        >
          <Text style={styles.buttonText2}>Back</Text>
        </TouchableOpacity>
        <Image style={styles.image} source={background} />
        <Text style={styles.title}>HOLLOW OF THE LOST</Text>
    </>
  );
}

export default HollowOfTheLost;

function getStyles()
{
  const { fontScale, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: -10,
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
    title: {
      fontSize: 50 * fontScale,
      marginBottom: '5%',
      marginTop: (StatusBar.currentHeight || 0) + (0.07*height),
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
    buttonText2: {
      fontFamily: 'OptimusPrincepsSemiBold',
      color: '#E2DFD2',
      fontSize: 30,
      textAlign: 'center',
    },
  });

  return styles
}