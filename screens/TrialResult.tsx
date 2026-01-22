import { Text, useWindowDimensions, StyleSheet, Image, StatusBar, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { angeloStateList, usePlayerStore } from "../gameStore";
import background from './../assets/trialRoom.png';
import angelo from './../assets/angelo.png';

export default function TrialResult()
{
    const angeloState = usePlayerStore(state => state.angeloState);

    const setShowTrialResult = usePlayerStore(state => state.setShowTrialResult);

    const styles = getStyles();

    const exitScreen = () => {
        setShowTrialResult(false);
    }

    const getVerdict = () => {
        if(angeloState === angeloStateList.angeloFree)
        {
            return "INNOCENT"
        }

        return "GUILTY"
    }

    return(
        <>
            <Text style={styles.title}>VERDICT: {getVerdict()}</Text>
            <Image style={styles.angeloImage} source={angelo}/>
            <Image style={styles.image} source={background}/>
            <TouchableOpacity onPress={exitScreen} style={styles.button}><Text style={styles.buttonText2}>EXIT</Text></TouchableOpacity>
        </>
    )


}

function getStyles()
{
  const { height,  fontScale } = useWindowDimensions();

  const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: -10,
    },
    angeloImage: {
      height: height*0.2,
      width: height*0.2,
      position: 'absolute',
      top: 0.3*height,
      left: '30%',
      borderRadius: height * 0.2,
      borderWidth: height * 0.005,
      borderColor: 'lightblue',
      backgroundColor: 'black'
    },
    button: {
      position: 'absolute',
      top: 0.725*height,
      left: '10%',
      width: '80%',
      height: '8%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 15
    },
    button2: {
      position: 'absolute',
      top: 0.83*height,
      left: '10%',
      width: '80%',
      height: '8%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 15
    },
    title3: {
      fontSize: 20 * fontScale,
      marginTop: '5%',
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '2%',
      textAlign: 'center'
    },
    title4: {
      fontSize: 20 * fontScale,
      marginTop: 0.25 * height,
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '2%',
      textAlign: 'center'
    },
    title: {
      fontSize: 50 * fontScale,
      marginBottom: '5%',
      marginTop: StatusBar.currentHeight,
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
    title2: {
      fontSize: 50 * fontScale,
      marginBottom: '5%',
      marginTop: 0.25*height,
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
    fullScreen: {
        height: '100%',
        position: 'absolute',
        zIndex: 30,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,1)'
    },
    spinner: {
        marginTop: '99%'
    }
  });

  return styles
}