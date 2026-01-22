import { Text, useWindowDimensions, StyleSheet, Image, StatusBar, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { usePlayerStore } from "../gameStore";
import background from './../assets/trialRoom.png';
import angelo from './../assets/angelo.png';
import socketIO from "../socketIO";

export default function TrialRoom()
{
    const styles = getStyles();

    const [sending, setSending] = useState(false);

    const playersWhoHaveVoted = usePlayerStore(state => state.playersWhoHaveVoted);

    const playersAuthorizedToVote = usePlayerStore(state => state.playersAuthorized);

    const trialResult = usePlayerStore(state => state.trialResult);

    const player = usePlayerStore(state => state.player);

    const onGuiltyPressed = () => {
        const socket = socketIO.getSocket();
        if(!socket) return;

        socket.emit("trialVote", "guilty");

        setSending(true);
    }

    const onInnocentPressed = () => {
        const socket = socketIO.getSocket();
        if(!socket) return;

        socket.emit("trialVote", "innocent");

        setSending(true);
    }

    const restartTrial = () => {
        const socket = socketIO.getSocket();
        if(!socket) return;

        socket.emit("restartTrial", " ");

        setSending(true);
    }

    const endTrial = () => {
        const socket = socketIO.getSocket();
        if(!socket) return;

        socket.emit("endTrial", " ");

        setSending(true);
    }

    useEffect(() => {
        const socket = socketIO.getSocket();
        if (!socket) return;

        const handler = () => {
            setSending(false);
        };

        socket.on("confirmation", handler);

        // Cleanup function
        return () => {
            socket.off("confirmation", handler);
        };
    }, [sending]);

    const getEndingText = () => {
        if(trialResult.guilty === trialResult.innocent)
        {
            return "TIE"
        }
        else if(trialResult.guilty < trialResult.innocent)
        {
            return "INNOCENT"
        }
        else
        {
            return "GUILTY"
        }
    }

    if(player?.profile.role === 'MORTIMER')
    {
        return (
            <>
            <Image source={background} style={styles.image}/>
            <Text style={styles.title}>THE TRIAL</Text>
            <Text style={styles.title3}>Angelo DiMortis has been charged with crimes against the entirety of Kaotika. His fate is now in your hands.</Text>
            <Image source={angelo} style={styles.angeloImage}/>
            {(playersAuthorizedToVote !== playersWhoHaveVoted.length) && (
                <>
                    <Text style={styles.title4}>WAITING FOR PLAYERS TO CAST THEIR VOTE. CURRENT VOTE COUNT:</Text>
                    <Text style={styles.title3}>GUILTY: {trialResult.guilty}</Text>
                    <Text style={styles.title3}>INNOCENT: {trialResult.innocent}</Text>
                </>
            )}

            {(playersAuthorizedToVote === playersWhoHaveVoted.length) && (
                <>
                    <Text style={styles.title4}>VERDICT: {getEndingText()}</Text>
                    <TouchableOpacity onPress={restartTrial} style={styles.button}><Text style={styles.buttonText2}>RESTART TRIAL</Text></TouchableOpacity>
                    {trialResult.guilty !== trialResult.innocent &&<TouchableOpacity onPress={endTrial} style={styles.button2}><Text style={styles.buttonText2}>END TRIAL</Text></TouchableOpacity>}
                </>
            )}

            {sending && (
                <View style={styles.fullScreen}>
                    <ActivityIndicator size="large" style={styles.spinner} />
                </View>
            )}

        </>
        );
    }

    return (
        <>
            <Image source={background} style={styles.image}/>
            <Text style={styles.title}>THE TRIAL</Text>
            <Text style={styles.title3}>Angelo DiMortis has been charged with crimes against the entirety of Kaotika. His fate is now in your hands.</Text>
            <Image source={angelo} style={styles.angeloImage}/>
            <Text style={styles.title2}>CAST YOUR VOTE</Text>
            {sending && (
                <View style={styles.fullScreen}>
                    <ActivityIndicator size="large" style={styles.spinner} />
                </View>
            )}
            {!(playersWhoHaveVoted.includes(player?.email || " ")) && <TouchableOpacity onPress={onGuiltyPressed} style={styles.button}><Text style={styles.buttonText2}>GUILTY</Text></TouchableOpacity>}
            {!(playersWhoHaveVoted.includes(player?.email || " ")) && <TouchableOpacity onPress={onInnocentPressed} style={styles.button2}><Text style={styles.buttonText2}>INNOCENT</Text></TouchableOpacity>}
            {(playersWhoHaveVoted.includes(player?.email || " ")) && <Text style={styles.title3}>You have casted your vote, waiting for the trial to end or restart...</Text>}
        </>
    );
}


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
      top: 0.725*height,
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
      top: 0.83*height,
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
    title3: {
      fontSize: 20 * fontScale,
      marginTop: '5%',
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '2%',
      textAlign: 'center'
    },
    title4: {
      fontSize: 20 * fontScale,
      marginTop: 0.25 * height,
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '2%',
      textAlign: 'center'
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
    title2: {
      fontSize: 50 * fontScale,
      marginBottom: '5%',
      marginTop: 0.25*height,
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
        zIndex: 30,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,1)'
    },
    spinner: {
        marginTop: '99%'
    }
  });

  return styles
}

