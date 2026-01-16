import React from "react";
import { View, useWindowDimensions, StyleSheet, StatusBar, Image } from "react-native";
import { Text } from "react-native-gesture-handler";
import image from "./../assets/acolyteTired.png"

export default function AcolyteTired()
{
    const styles = getStyles();

    return (
    <View style={styles.fullScreen}>
      <Text style={styles.title}>YOU ARE TIRED</Text>
      <Image source={image} style={styles.image}/>
    </View>
    );
}

function getStyles() {
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
            marginTop: (StatusBar.currentHeight || 0) + (0.07 * height),
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
        text: {
            fontSize: 16 * fontScale,
            marginBottom: '5%',
            marginTop: '25%',
            color: '#E2DFD2',
            boxShadow: '5px 5px 5px 5px black',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            fontFamily: 'OptimusPrincepsSemiBold',
            justifyContent: 'center',
            alignItems: 'center',
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            margin: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 10,
            padding: 100,
            alignItems: 'center',

        },
        button: {
            borderRadius: 10,
            padding: 15,
            elevation: 5,
            borderColor: 'grey',
            borderWidth: 2,
            margin: 10,


        },
        buttonOpen: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        buttonClose: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        textStyle: {
            color: '#E2DFD2',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
            color: '#E2DFD2',
            fontSize: 25 * fontScale,

        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between', // or 'center'
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
        },
        fullScreen: {
          height: '100%',
          position: 'absolute',
          zIndex: 10,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,1)'
        },
        spinner: {
          marginTop: '99%'
        },
    });

    return styles
}