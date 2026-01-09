import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, useWindowDimensions, StatusBar, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import inn from './../assets/inn.png'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { usePlayerStore } from "../gameStore";
import socketIO from '../socketIO';
import { Player } from '../interfaces/PlayerInterface';
import { ActivityIndicator } from 'react-native';

function InnOfTheForgotten() {

    const player = usePlayerStore(state => state.player);

    const setPlayer = usePlayerStore(state => state.setPlayer);

    const [modalVisible, setModalVisible] = useState(false)

    const [sending, setSending] = useState(false);

    const [hasPrompted, setHasPrompted] = useState(false);

    const styles = getStyles();

    type RootStackParamList = {
        Home: undefined,
        Entrance: undefined,
        Tower: undefined,
        TowerEntrance: undefined,
        SpyCam: undefined,
        OldSchool: undefined,
        HollowOfTheLost: undefined
    }

    const handleBetrayerChange = () => {
        const socket = socketIO.getSocket();
        if (socket) {
            socket.emit('turnIntoBetrayer', " ")
        }
    }
    const onYesPress = () => {
        if (sending) return;
        setSending(true);
        handleBetrayerChange();
        setModalVisible(false);
    }

    useEffect(() => {
        const socket = socketIO.getSocket();
        if (!socket) return;
    
        console.log("Subscribing to authorization events");
    
        const handler = (updatePlayer: Player) => {
          console.log("Received updated player:", updatePlayer);
          setPlayer(updatePlayer);
          setSending(false);
        };
    
        socket.on("authorization", handler);
    
        return () => {
          console.log("Unsubscribing from authorization events");
          socket.off("authorization", handler);
        };
      }, [player]); 

    useEffect(() => {
        if (!hasPrompted && player?.isBetrayer === false) {
            setModalVisible(true);
            setHasPrompted(true);
        }
    }, [player, hasPrompted]);
    
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <>
            {sending && (
                <View style={styles.fullScreen}>
                  <ActivityIndicator size="large" style={styles.spinner} />
                </View>
            )}
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate('HollowOfTheLost')
              }}
            >
              <Text style={styles.buttonText2}>Back</Text>
            </TouchableOpacity>
            <Image style={styles.image} source={inn} />
            <Text style={styles.title}>INN OF THE FORGOTTEN</Text>

            <SafeAreaProvider>
                <SafeAreaView style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            // setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Would you like to join Dravokar? Ditch that foolish Mortimer dude and get filthy rich and powerful for it.</Text>
                                <View style={styles.buttonRow}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => onYesPress()}
                                    >
                                        <Text style={styles.textStyle}>YES!!</Text>
                                    </Pressable>

                                    <Pressable
                                        style={[styles.button, styles.buttonOpen]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.textStyle}>NO...</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>

        </>
    );
}

export default InnOfTheForgotten;

function getStyles() {
    const { fontScale, height } = useWindowDimensions();

    const styles = StyleSheet.create({
        image: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: -10,
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
            marginTop: (StatusBar.currentHeight || 0) + (0.07 * height),
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
        text: {
            fontSize: 16 * fontScale,
            marginBottom: '5%',
            marginTop: '25%',
            color: '#E2DFD2',
            boxShadow: '5px 5px 5px 5px black',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            fontFamily: 'OptimusPrincepsSemiBold',
            justifyContent: 'center',
            alignItems: 'center',
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            margin: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 10,
            padding: 100,
            alignItems: 'center',

        },
        button: {
            borderRadius: 10,
            padding: 15,
            elevation: 5,
            borderColor: 'grey',
            borderWidth: 2,
            margin: 10,


        },
        buttonOpen: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        buttonClose: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        textStyle: {
            color: '#E2DFD2',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
            color: '#E2DFD2',
            fontSize: 25 * fontScale,

        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between', // or 'center'
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
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
        },
    });

    return styles
}