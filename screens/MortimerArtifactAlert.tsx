import scrollImage from "./../assets/scrollAlert.png"
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import socketIO from "../socketIO";

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
            button: {
              position: 'absolute',
              top: '80%',
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
            buttonText2: {
              fontFamily: 'OptimusPrincepsSemiBold',
              color: '#E2DFD2',
              fontSize: 30,
              textAlign: 'center',
            },
        })
    
        return (
            <>
            <Image style={styles.image} source={scrollImage}/>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[styles.title, { top: '40%', fontSize: 20}]}>YOU ARE VERIFYING THE ARTIFACTS</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const socket = socketIO.getSocket();
              
                if (socket) {
                  socket.emit("artifactEvaluation", "reset");
                }
              }}
            >
              <Text style={styles.buttonText2}>Reset Search</Text>
            </TouchableOpacity>

            </>
        );
}