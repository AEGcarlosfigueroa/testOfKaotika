import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, useWindowDimensions, StatusBar, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import inn from './../assets/inn.png'
import unknown from './../assets/icons/unknown.png';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { usePlayerStore, angeloStateList } from "../gameStore";
import socketIO from '../socketIO';
import { ActivityIndicator } from 'react-native';


function InnOfTheForgotten() {

    const player = usePlayerStore(state => state.player);

    const setPlayer = usePlayerStore(state => state.setPlayer);

    const [modalVisible, setModalVisible] = useState(false);

    const [angeloModal, setAngeloModal] = useState(false)

    const [showAngelo, setAngeloVisible] = useState(false);

    const [sending, setSending] = useState(false);

    const [hasPrompted, setHasPrompted] = useState(false);

    const [isCaptured, setIsCapture] = useState(false);

    const angeloState = usePlayerStore(state => state.angeloState);

    const angeloCapturer = usePlayerStore(state => state.angeloCapturer);

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
    const onOkPress = () => {
        console.log("checking")
        setIsCapture(false)
    }
    const onNoPress = () => {
        console.log("checking")
        console.log(angeloState)
        if (angeloState === angeloStateList.angeloFree) {
            console.log("angelo visible");
            console.log("angelo state: " + angeloState)
            setAngeloVisible(true)
        }
        else {
            setAngeloVisible(false);
        }
        setModalVisible(false)

    }

    useEffect(() => {
        // Only show modal if:
        // - Hasn't prompted yet
        // - Player is not a betrayer
        // - Player is ACOLITO
        // - Angelo is not captured or this player is not the capturer
        if (
            !hasPrompted &&
            player?.isBetrayer === false &&
            player.profile.role === 'ACOLITO' &&
            angeloCapturer !== player.email
        ) {
            setModalVisible(true);
            setHasPrompted(true);
        }
    }, [player, hasPrompted, angeloCapturer]);

    useEffect(() => {
        const socket = socketIO.getSocket();
        if (!socket) return;

        const handler = (message: string) => {
            setSending(false);
            if (message === "ok") {
                setAngeloVisible(false);
                setIsCapture(true)
            }
        };

        socket.on("confirmation", handler);

        // Cleanup function
        return () => {
            socket.off("confirmation", handler);
        };
    }, [sending]);

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
                                        onPress={() => onNoPress()}
                                    >
                                        <Text style={styles.textStyle}>NO...</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
            {showAngelo && (
                <View
                    style={{
                        height: '85%',
                        marginTop: '20%',
                        flex: 1,
                        flexDirection: 'row',
                        position: 'relative',
                        width: '90%',
                        marginLeft: '5%',
                    }}
                >
                    <Pressable
                        onPress={() => setAngeloModal(true)}
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image source={unknown} style={styles.entryImage} />
                    </Pressable>
                </View>
            )}

            {/* Modal for capturing Angelo */}
            <Modal transparent visible={angeloModal} animationType="fade">
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>You have Spotted Angelo!! Quickly! Grab HIM!!!</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            {/* YES Button */}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={async () => {
                                    setAngeloModal(false);
                                    setSending(true);

                                    try {
                                        const socket = socketIO.getSocket();
                                        if (socket) {
                                            socket.emit('capture_Angelo', player?.email, angeloStateList.angeloCaptured);
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        setSending(false);
                                    }
                                }}
                            >
                                <Text style={styles.textStyle}>Yes</Text>
                            </Pressable>

                            {/* NO Button */}
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => {
                                    setAngeloModal(false); // just close modal
                                    setAngeloVisible(true); // keep Angelo icon visible
                                    setIsCapture(true)

                                }}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCaptured}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    // setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>You have captured Angelo</Text>
                        <View style={styles.buttonRow}>

                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => onOkPress()}
                            >
                                <Text style={styles.textStyle}>OK...</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>



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
            backgroundColor: 'rgba(0,0,0,0.6)',
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
    });

    return styles
}