import React from 'react';
import { View, Image, StyleSheet, Text, useWindowDimensions, StatusBar } from 'react-native';
import imageSource from "./../assets/obituary.png";
import rosary from "./../assets/rosary.png";
import artifact0 from "./../assets/artifacts/artifact0.png";
import artifact1 from "./../assets/artifacts/artifact1.png";
import artifact2 from "./../assets/artifacts/artifact2.png";
import artifact3 from "./../assets/artifacts/artifact3.png";

export default function Obituary()
{
    const styles = getStyles();

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>THE OBITUARY</Text>
          <Image source={imageSource} style={styles.image} />
          <Image source={rosary} resizeMode='contain' style={styles.rosary}/>
          <View style={styles.rosaryContainer}>
            <Image source={artifact0} resizeMode='contain' style={{ height: '25%', width: '50%', resizeMode: 'contain', position: 'relative', marginTop: '15%' }}/>
            <Image source={artifact1} resizeMode='contain' style={{ height: '25%', width: '50%', resizeMode: 'contain', position: 'relative', marginTop: '15%' }}/>
            <Image source={artifact2} resizeMode='contain' style={{ height: '25%', width: '50%', resizeMode: 'contain', position: 'relative', marginTop: '15%' }}/>
            <Image source={artifact3} resizeMode='contain' style={{ height: '25%', width: '50%', resizeMode: 'contain', position: 'relative', marginTop: '15%' }}/>
          </View>
        </View>
      );
}

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
      rosaryContainer: {
        height: 0.4*height,
        width: 'auto',
        position: 'absolute',
        marginTop: 0.465*height,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        flexWrap: 'wrap'
      },
      rosary: {
        height: 0.4*height,
        width: 0.4*height,
        resizeMode: 'contain',
        position: 'absolute',
        marginTop: 0.5*height,
      }
    });

    return styles;
}