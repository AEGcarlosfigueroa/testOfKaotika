import { TouchableOpacity, Text, Image, StyleSheet, StatusBar, View, useWindowDimensions } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import HallOfSagesImage from "./../assets/hallOfSages.png";
import { usePlayerStore, states, angeloStateList } from "../gameStore";
import socketIO from "../socketIO";
import { Player } from "../interfaces/PlayerInterface";
import { useFocusEffect } from "@react-navigation/native";

export default function HallOfSages() {

  type RootStackParamList = {
    Home: undefined,
    Entrance: undefined,
    Tower: undefined,
    TowerEntrance: undefined,
    SpyCam: undefined,
    OldSchool: undefined
  }

  const playerList = usePlayerStore(state => state.playerList);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const player = usePlayerStore(state => state.player);

  const canShowArtifacts = usePlayerStore(state => state.canShowArtifacts);

  const allPlayersList = usePlayerStore(state => state.allPlayersList)

  const [canDeliver, setCanDeliver] = useState(false);

  const [hasNotified, setHasNotified] = useState(false);

  const mortimerPlayer = allPlayersList.find(p => p.profile.role === "MORTIMER");

  const isMortimerAbsent = mortimerPlayer ? !mortimerPlayer.isInHallOfSages : false;

  const { height } = useWindowDimensions();

  const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: -10,
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
    buttonText2: {
      fontFamily: 'OptimusPrincepsSemiBold',
      color: '#E2DFD2',
      fontSize: 30,
      textAlign: 'center',
    },
    entryImage: {
      height: 0.1 * height,
      width: 0.1 * height,
      position: 'relative',
      padding: '1%',
      borderRadius: 0.1 * height,
      borderColor: 'lightblue',
      borderStyle: 'solid',
      borderWidth: 0.005 * height
    },
    title: {
      fontSize: 40,
      marginBottom: '5%',
      marginTop: '25%',
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5%',
      textAlign: 'center',
    },
  });

  console.log(mortimerPlayer);

  useEffect(() => {

    const deliverable =
      states.angeloState === angeloStateList.angeloCaptured &&
      player?.email === states.angeloCapturer &&
      mortimerPlayer?.isInHallOfSages === true;


    console.log(mortimerPlayer?.isInHallOfSages)

    setCanDeliver(deliverable);


  }, [player?.email, states.angeloState, states.angeloCapturer, allPlayersList]);

  const button = (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        const socket = socketIO.getSocket();

        if (socket) {
          socket.emit("showArtifacts", " ");
        }
      }}
    >
      <Text style={styles.buttonText2}>Show Artifacts</Text>
    </TouchableOpacity>
  );

  const delivery = (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        const socket = socketIO.getSocket();

        if (socket) {
          socket.emit("deliverPrisioner", " ");
        }
      }}
    >
      <Text style={styles.buttonText2}>Delivery the Prisioner</Text>
    </TouchableOpacity>
  );


  useFocusEffect(
    useCallback(() => {
      const socket = socketIO.getSocket();
      socket?.emit("hallOfSages", "enter");

      return () => {
        socket?.emit("hallOfSages", "exit");
      };
    }, [])
  );

  const notifyMortimer = () => {
    console.log("sending message to Mortimer")
    if (!hasNotified && player?.email === states.angeloCapturer) {
      const socket = socketIO.getSocket();
      socket?.emit("angelo_IsWaiting", "");
      setHasNotified(true);
      console.log("Mortimer notified!");
    }
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          const socket = socketIO.getSocket();

          if (socket) {
            socket.emit("hallOfSages", "exit");
          }
          navigation.navigate('OldSchool')
        }}
      >
        <Text style={styles.buttonText2}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>HALL OF SAGES</Text>
      <Image style={styles.image} source={HallOfSagesImage} />
      <View style={{ height: '85%', marginTop: '20%', flex: 1, flexDirection: 'row', position: 'relative', width: '90%', marginLeft: '5%' }}>
        {playerList.map((elem: Player, i: any) => {
          if (elem.isInHallOfSages) {
            console.log(elem);
            return <Image key={i} src={elem.avatar} style={styles.entryImage} />;
          }
          return <View key={i}></View>
        })}
      </View>
      {
        (canShowArtifacts && player?.profile.role === 'ACOLITO') && button}
      {canDeliver && delivery}
      {player?.email === states.angeloCapturer && ( mortimerPlayer === undefined || mortimerPlayer?.isInHallOfSages === false) && (
        <TouchableOpacity style={styles.button} onPress={notifyMortimer}>
          <Text style={styles.buttonText2}>Notify Mortimer</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
