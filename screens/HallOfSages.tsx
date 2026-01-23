import { TouchableOpacity, Text, Image, StyleSheet, StatusBar, View, useWindowDimensions, ToastAndroid, ActivityIndicator } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import HallOfSagesImage from "./../assets/hallOfSages.png";
import { usePlayerStore, angeloStateList } from "../gameStore";
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
    OldSchool: undefined,
    OldSchoolDungeon: undefined
  }

  const [loading, setLoading] = useState(false);

  const playerList = usePlayerStore(state => state.playerList);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const player = usePlayerStore(state => state.player);

  const angeloCapturer = usePlayerStore(state => state.angeloCapturer);

  const angeloState = usePlayerStore(state => state.angeloState)

  const canShowArtifacts = usePlayerStore(state => state.canShowArtifacts);

  const allPlayersList = usePlayerStore(state => state.allPlayersList)

  const [canDeliver, setCanDeliver] = useState(false);

  const [hasNotified, setHasNotified] = useState(false);

  const mortimerPlayer = allPlayersList.find(p => p.profile.role === "MORTIMER");

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

  console.log(mortimerPlayer);

  useEffect(() => {
        const socket = socketIO.getSocket();
        if (!socket) return;

        const handler = (message: string) => {
            setLoading(false);
            if(message === "ok")
            {
              ToastAndroid.show("Angelo has been delivered to the Dungeon", 2000);
              if(player?.profile.role === 'MORTIMER')
              {
                navigation.navigate("OldSchoolDungeon")
              }
            }
        };

        socket.on("confirmation", handler);

        // Cleanup function
        return () => {
            socket.off("confirmation", handler);
        };
    }, [loading]);

  useEffect(() => {
    const deliverable =
      angeloState === angeloStateList.angeloCaptured &&
      player?.email === angeloCapturer &&
      mortimerPlayer?.isInHallOfSages === true;

    setCanDeliver(deliverable);
  }, [
    player?.email,
    angeloState,
    angeloCapturer,
    mortimerPlayer
  ]);

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

        if (socket && player) {
          socket.emit("deliverAngeloToMortimer", player.email);
          setLoading(true);
        }
      }}
    >
      <Text style={styles.buttonText2}>Deliver the Prisioner</Text>
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
    if (!hasNotified && player?.email === angeloCapturer) {
      const socket = socketIO.getSocket();
      socket?.emit("angelo_IsWaiting", "");
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
        {allPlayersList.map((elem: Player, i: any) => {
          if (elem.isInHallOfSages) {
            console.log(elem);
            return <Image key={i} src={elem.avatar} style={styles.entryImage} />;
          }
          return <View key={i}></View>
        })}
      </View>
      {loading && (
          <View style={styles.fullScreen}>
              <ActivityIndicator size="large" style={styles.spinner} />
          </View>
      )}
      {
        (canShowArtifacts && player?.profile.role === 'ACOLITO' && angeloState !== angeloStateList.angeloCaptured) && button}
      {canDeliver && delivery}
      {player?.email === angeloCapturer && (mortimerPlayer === undefined || mortimerPlayer?.isInHallOfSages === false) && (
        <TouchableOpacity style={styles.button} onPress={notifyMortimer}>
          <Text style={styles.buttonText2}>Notify Mortimer</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
