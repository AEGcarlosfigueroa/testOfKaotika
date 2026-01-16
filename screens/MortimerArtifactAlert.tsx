import scrollImage from "./../assets/hallOfSages.png"
import { StyleSheet, Image, Text, View, TouchableOpacity, Animated, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import socketIO from "../socketIO";
import { usePlayerStore } from "../gameStore";
import artifactImage0 from './../assets/artifacts/artifact0.png'
import artifactImage1 from './../assets/artifacts/artifact1.png'
import artifactImage2 from './../assets/artifacts/artifact2.png'
import artifactImage3 from './../assets/artifacts/artifact3.png'

export default function MortimerArtifactAlert() {

  const artifactImages = [
    artifactImage0,
    artifactImage1,
    artifactImage2,
    artifactImage3
  ]

  console.log(artifactImages)

  const player = usePlayerStore(state => state.player)

  const [isButton, setButton] = useState<Boolean>(false);

  const { height, width } = useWindowDimensions();

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
    button2: {
      position: 'absolute',
      top: '70%',
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
    artifactImage: {
      marginTop: 0.001*width,
      width: 0.3*width,
      height: 0.3*width,
      margin: 0.001*width,
    }
  })

  const anims = artifactImages.map(() => ({
    moveAnim: useRef(new Animated.ValueXY({ x: 0.6 * width, y: 0.6 * height })).current,
    fadeAnim: useRef(new Animated.Value(0)).current,
  }));

  useEffect(() => {
    setButton(false);
    const sequences = anims.map((anim, i) =>
      Animated.sequence([
        Animated.parallel([
          Animated.timing(anim.moveAnim, {
            toValue: { x: 0.5*width, y: 0.05*height },
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(anim.moveAnim, {
            toValue: { x: 0.4*width, y: 0 },
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    Animated.stagger(0.2*width, sequences).start(() =>{
      setButton(true)
    });
  }, [anims]);


  return (
    <>
      <Image style={styles.image} source={scrollImage} />
      <View >
      <View style={{display: 'flex', flexDirection: 'row', right: 0.25*width, top: 0.2*height, flexWrap: 'wrap', width: 0.75*width}}>
          {artifactImages.map((img, i) => (
            <Animated.View
              key={i}
              style={{
                transform: anims[i].moveAnim.getTranslateTransform(),
                opacity: anims[i].fadeAnim,
                margin: 0.025*width,
              }}
            >
              <Image source={img} style={styles.artifactImage} />
            </Animated.View>
          ))}
        </View>
      </View>
      {isButton && (<>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          const socket = socketIO.getSocket();
          if (socket) {
            socket.emit("artifactEvaluation", "reset");
          }
        }}
      >
        <Text style={styles.buttonText2}>Reset Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const socket = socketIO.getSocket();

          if (socket) {
            socket.emit("artifactEvaluation", "verify");
          }
        }}
      >
        <Text style={styles.buttonText2}>Validate Search</Text>
      </TouchableOpacity>
      </>)}
    </>
  );
}
