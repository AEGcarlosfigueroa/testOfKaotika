import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Animated, type ViewStyle } from "react-native"
import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { buttonStyles } from "../props/genericButton";
import socketIO from "../socketIO";
import { signOut, getAuth } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import scrollImage from "./../assets/scroll.png";
import { removeNofify } from "../pushNotification";
import { playerContext, scrollStateContext, scrollStateList } from "../context";

type scrollProps = PropsWithChildren<{style: ViewStyle}>

const Scroll: React.FC<scrollProps> = props => {

  const contextPlayer = React.useContext(playerContext);

  const context = React.useContext(scrollStateContext);

  const {scrollState, setScrollState} = context;

  const {player, setPlayer} = contextPlayer;
  
  const {height, width, scale, fontScale} = useWindowDimensions();

  const ScrollButton = Animated.createAnimatedComponent(TouchableOpacity);

  const moveAnim = useRef(new Animated.ValueXY({x: 0.5*width, y: 0.5*height})).current;

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
      Animated.parallel([
        Animated.timing(moveAnim, {
          toValue: {y: 0.6*height, x: 0.5*width},
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
          toValue: {y: 0.5*height, x: 0.5*width},
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

  return(
    <ScrollButton style={{
      ...props.style,
      transform: [{translateX: moveAnim.x}, {translateY: moveAnim.y}], 
      opacity: fadeAnim
    }}
    onPress={() => {
      const socket = socketIO.getSocket();
      if(socket)
      {
        socket.emit("scrollCollected", player.email);
        setScrollState(scrollState.collected);
      }

    }}>
      {props.children}
    </ScrollButton>
  );
}

function Tower ()
{ 

  const context = React.useContext(scrollStateContext);

  const {scrollState, setScrollState} = context;

  const {height, width, scale, fontScale} = useWindowDimensions();

  const contextPlayer = React.useContext(playerContext);

  const {player, setPlayer} = contextPlayer;

  //Refractor later put in a seperate file called styles 
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
      padding: 15,
      // elevation: 2

    },
    scrollStyle: {
      width : (30*scale), height : (30*scale), position: 'absolute', zIndex: 20
    },
    scrollImg: {
      width : (30*scale), height : (30*scale)
    },
  })

  let scrollObj = <></>;

  console.log(scrollState);

  if(scrollState === scrollStateList.uncollected)
  {
    scrollObj = (
      <Scroll style={styles.scrollStyle}>
      <Image source={scrollImage} style={styles.scrollImg}/>
      </Scroll>
    );
  }

  return (
    <>
    <Image source={require('./../assets/settings.png')} style={styles.image} />
    <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
      <Text style={{ color: 'black', fontSize: 24, marginTop: '10%', position: 'relative' }}>Welcome to the Tower!</Text>
      <View style= {buttonStyles.buttonContainer}>
       <TouchableOpacity
        onPress={() => {
          removeNofify(player.email);
          signOut(getAuth());
          GoogleSignin.revokeAccess();
          const socket = socketIO.getSocket();
          socket?.disconnect();
        }}>
      <Text style={[buttonStyles.buttonText2, {color : 'white'}]}>LOG OUT</Text>
      </TouchableOpacity>
      </View>
    </View>
    {scrollObj}
    </>
  );
    }
    

export default Tower