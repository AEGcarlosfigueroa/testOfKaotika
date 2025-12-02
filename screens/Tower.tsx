import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Animated, type ViewStyle } from "react-native"
import React, { useEffect, useRef, type PropsWithChildren } from "react";
import socketIO from "../socketIO";
import { signOut, getAuth } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import scrollImage from "./../assets/scroll.png";
import { removeNofify } from "../pushNotification";
import { usePlayerStore, scrollStateList } from "../gameStore";

type scrollProps = PropsWithChildren<{ style: ViewStyle }>

const Scroll: React.FC<scrollProps> = props => {


  const player = usePlayerStore(state => state.player)

  const setScrollState = usePlayerStore(state => state.setScrollState)

  const { height, width } = useWindowDimensions();

  const ScrollButton = Animated.createAnimatedComponent(TouchableOpacity);

  const moveAnim = useRef(new Animated.ValueXY({ x: 0.5 * width, y: 0.5 * height })).current;

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(moveAnim, {
            toValue: { y: 0.6 * height, x: 0.5 * width },
            duration: 3000,
            useNativeDriver: true
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 3000,
            useNativeDriver: true
          }),
        ]),
        Animated.parallel([
          Animated.timing(moveAnim, {
            toValue: { y: 0.5 * height, x: 0.5 * width },
            duration: 3000,
            useNativeDriver: true
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true
          }),
        ])
      ])
    ).start()
  }, [moveAnim, fadeAnim])

  return (
    <ScrollButton style={{
      ...props.style,
      transform: [{ translateX: moveAnim.x }, { translateY: moveAnim.y }],
      opacity: fadeAnim
    }}
      onPress={() => {
        const socket = socketIO.getSocket();
        if (socket) {
          if (player) {
            socket.emit("scrollCollected", player.email);

          }
          setScrollState(scrollStateList.collected);

        }

      }}>
      {props.children}
    </ScrollButton>
  );
}

function Tower() {
  const player = usePlayerStore(state => state.player)

  const scrollState = usePlayerStore(state => state.scrollState)

  const { fontScale } = useWindowDimensions();

  //Refractor later put in a seperate file called styles 
  const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: -10,
    },
    title: {
      fontSize: 48 * fontScale,
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

    },
    scrollStyle: {
      width: (100 * fontScale), height: (100 * fontScale), position: 'absolute', zIndex: 20
    },
    scrollImg: {
      width: (120 * fontScale), height: (120 * fontScale)
    },
    buttonText2: {
      fontFamily: 'OptimusPrincepsSemiBold',
      color: '#E2DFD2',
      fontSize: 36 * fontScale,
      textAlign: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: '10%',
      left: '12.5%',
      width: '75%',
      height: '10%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  let scrollObj = <></>;

  console.log(scrollState);

  if (scrollState === scrollStateList.uncollected) {
    scrollObj = (
      <Scroll style={styles.scrollStyle}>
        <Image source={scrollImage} style={styles.scrollImg} />
      </Scroll>
    );
  }

  return (
    <>
      <Image source={require('./../assets/settings.png')} style={styles.image} />
      <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
        <Text style={{ color: 'black', fontSize: 48 * fontScale, marginTop: '10%', position: 'relative', textAlign: 'center' }}>Welcome to the Tower!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (player) {
                removeNofify(player.email);
              }
              signOut(getAuth());
              GoogleSignin.revokeAccess();
              const socket = socketIO.getSocket();
              socket?.disconnect();
            }}>
            <Text style={[styles.buttonText2, { color: 'white' }]}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
      {scrollObj}
    </>
  );
}


export default Tower