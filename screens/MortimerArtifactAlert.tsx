import scrollImage from "./../assets/scrollAlert.png"
import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";

export default function MortimerArtifactAlert()
{
    const styles = StyleSheet.create({
            image: {
                height: '100%',
                width: '100%',
                position: 'absolute',
                zIndex: -10,
            },
            title: {
            fontSize: 28,
            marginBottom: 20,
            marginTop: 20,
            color: '#E2DFD2',
            textShadowColor: 'rgba(0, 0, 0, 0.7)',
            textShadowOffset: { width: 2, height: 4 },
            textShadowRadius: 4,
            fontFamily: 'OptimusPrincepsSemiBold',
            boxShadow: '5px 5px 5px 5px black',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 15 
            },
        })
    
        return (
            <>
            <Image style={styles.image} source={scrollImage}/>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[styles.title, { top: '40%', fontSize: 20}]}>YOU ARE VERIFYING THE ARTIFACTS</Text>
            </View>
            </>
        );
}