import React, { useState } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, StatusBar, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import dungeonImage from './../assets/dungeon.png';
import angeloImage from './../assets/angelo.png';
import { usePlayerStore } from '../gameStore';
import { angeloStateList } from '../gameStore';
import socketIO from '../socketIO';
import { useEffect } from 'react';

function OldSchoolDungeon() {

  const styles = getStyles();

  type RootStackParamList = {
    Home: undefined,
    Entrance: undefined,
    Tower: undefined,
    TowerEntrance: undefined,
    SpyCam: undefined,
    OldSchool: undefined,
    HallOfSages: undefined
  }

  const [isLoading, setIsLoading] = useState(false);

  const angeloState = usePlayerStore(state => state.angeloState);
  
  const setAngeloState = usePlayerStore(state => state.setAngeloState);

  const angeloCapturer = usePlayerStore(state => state.angeloCapturer);

  const setAngeloCapturer = usePlayerStore(state => state.setAngeloCapturer);

  const trialResult = usePlayerStore(state => state.trialResult);

  const setTrialResult = usePlayerStore(state => state.setTrialResult);

  const playersAuthorized = usePlayerStore(state => state.playersAuthorized);

  const setPlayersAuthorized = usePlayerStore(state => state.setPlayersAuthorized);

  const playersWhoHaveVoted = usePlayerStore(state => state.playersWhoHaveVoted)

  const setPlayersWhoHaveVoted = usePlayerStore(state => state.setPlayersWhoHaveVoted);
  
  const obituaryState = usePlayerStore(state => state.obituaryState);

  const setObituaryState = usePlayerStore(state => state.setObituaryState);

  const canShowArtifacts = usePlayerStore(state => state.canShowArtifacts);

  const setCanShowArtifacts = usePlayerStore(state => state.setCanShowArtifacts);

  const scrollState = usePlayerStore(state => state.scrollState);

  const setScrollState = usePlayerStore(state => state.setScrollState)

  const player = usePlayerStore(state => state.player);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {

    const socket = socketIO.getSocket();
    
    if (!socket) return;

    const handleStateUpdate = (message: any) => {
      setObituaryState(message.obituaryState);
      setScrollState(message.scrollState);
      setCanShowArtifacts(message.canShowArtifacts);
      setAngeloState(message.angeloState);
      setAngeloCapturer(message.angeloCapturer);
      setTrialResult(message.trialResult);
      setPlayersAuthorized(message.playersAuthorized);
      setPlayersWhoHaveVoted(message.playersWhoHaveVoted);

      if(message.angeloState === angeloStateList.angeloAwaitingTrial)
      {
        console.log("trial started");
        navigation.navigate("HallOfSages");
      }
      else
      {
        console.log("trial not started");
      }

      setIsLoading(false);
    }

    socket.on("stateUpdate", handleStateUpdate);

    return () => {
      socket.off("stateUpdate", handleStateUpdate);
    }
  }, [scrollState, canShowArtifacts, obituaryState, playersAuthorized, playersWhoHaveVoted, trialResult, angeloCapturer])

  const startTrial = () => {
    const socket = socketIO.getSocket();
          
    if (socket) {
      socket.emit("startTrial", " ");
    }

    setIsLoading(true);
  }

  return (
    <>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            navigation.navigate('OldSchool')
          }}
        >
          <Text style={styles.buttonText2}>Back</Text>
        </TouchableOpacity>
        <Image style={styles.image} source={dungeonImage}/>
        {angeloState === angeloStateList.angeloDelivered && <Image style={styles.angeloImage} source={angeloImage}/>}
        {(angeloState === angeloStateList.angeloDelivered && player?.profile.role === 'MORTIMER') && (<TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText2} onPress={startTrial}>START TRIAL</Text>
        </TouchableOpacity>)}
        <Text style={styles.title}>THE DUNGEON</Text>
        {isLoading && 
        (<View style={styles.fullScreen}>
            <ActivityIndicator size="large" style={styles.spinner} />
         </View>)}
    </>
  );
}

export default OldSchoolDungeon;

function getStyles()
{
  const { height,  fontScale } = useWindowDimensions();

  const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: -10,
    },
    angeloImage: {
      height: height*0.2,
      width: height*0.2,
      position: 'absolute',
      top: 0.3*height,
      left: '30%',
      borderRadius: height * 0.2,
      borderWidth: height * 0.005,
      borderColor: 'lightblue',
      backgroundColor: 'black'
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
    buttonText2: {
      fontFamily: 'OptimusPrincepsSemiBold',
      color: '#E2DFD2',
      fontSize: 30,
      textAlign: 'center',
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
    }
  });

  return styles
}