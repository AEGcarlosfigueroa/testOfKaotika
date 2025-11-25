import socketIO from "../socketIO";
import scrollImage from "./../assets/scrollAlert.png"
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import React from "react";

export default function ScrollAlert()
{

    const styles = StyleSheet.create({
        image: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: -10,
        },
        button: {
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '60%',
            height: '8%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 5,
            borderWidth: 2,
            borderColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            fontSize: 24,
            color: '#fff',
            textShadowColor: 'rgba(0, 0, 0, 0.7)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 4,
            fontFamily: 'OptimusPrincepsSemiBold',
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
        padding: 15,
        // elevation: 2  
        },
    })

    return (
        <>
        <Image style={styles.image} source={scrollImage}/>
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.title, { top: '40%', fontSize: 20}]}>AN ACOLYTE HAS FOUND THE SCROLL</Text>
        </View>
        <TouchableOpacity
        
          style={styles.button}
          onPress={() => {

            const socket = socketIO.getSocket();

            if(socket)
            {
                socket.emit("scrollDestroyed", "");
            }
          }}
        >
          <Text style={styles.buttonText}>DESTROY CONJURE</Text>
        </TouchableOpacity>
        </>
    );
}