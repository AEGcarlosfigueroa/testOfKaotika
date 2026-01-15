import React, { useEffect, useState } from "react";
import { View, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert, Pressable, Modal } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from "react-native-gesture-handler";
import image from "./../assets/illness.png";
import { usePlayerStore, deadlyEffects } from "../gameStore";
import socketIO from "../socketIO";
import { Player } from "../interfaces/PlayerInterface";
import NonBetrayerView, { deadlyEffectsArray } from '../props/nonBetrayerView'

export default function Infectorium() {

    const player = usePlayerStore(state => state.player);

    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    const setPlayer = usePlayerStore(state => state.setPlayer);

    const playerList = usePlayerStore(state => state.acolyteList);

    const [modalVisible, setModalVisible] = useState(false)

    const styles = getStyles();

    let component = <></>;

    const loading = (
        <View style={styles.fullScreen}>
            <ActivityIndicator size="large" style={styles.spinner} />
        </View>
    );

    const handlePressPlayer = (pressedPlayer: Player) => {
        setSelectedPlayer(pressedPlayer);
        setModalVisible(true);
    };

    useEffect(() => {
        const socket = socketIO.getSocket();
        if (!socket) return;

        console.log("Subscribing to authorization events");

        const handler = (updatePlayer: Player) => {
            console.log("Received updated player:", updatePlayer);
            setPlayer(updatePlayer);
        };

        socket.on("authorization", handler);

        return () => {
            console.log("Unsubscribing from authorization events");
            socket.off("authorization", handler);
        };
    }, [player]);


    return (
        <View style={styles.fullScreen}>
            <Text style={styles.title}>Miasma Den</Text>
            {component}
            <Image source={image} style={styles.image} />
            <SafeAreaProvider>
                <SafeAreaView>
                    <ScrollView overScrollMode="auto" style={{ height: '75%' }}>
                        {playerList.map((elem: Player, i: number) => (
                            <NonBetrayerView player={elem} index={i} key={i} onPress={() => handlePressPlayer(elem)} />
                        ))}
                    </ScrollView>
                    <Modal transparent visible={modalVisible} animationType="fade">
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>
                                    Select an illness to afflict {selectedPlayer?.nickname}
                                </Text>

                                <View style={{ maxHeight: '60%' }}>
                                    <ScrollView contentContainerStyle={styles.effectsGrid}>
                                        {deadlyEffectsArray.map(effect => {
                                            const isApplied = selectedPlayer?.statusEffects.includes(effect.id); // check if player already has it

                                            return (
                                                <Pressable
                                                    key={effect.id}
                                                    style={[
                                                        styles.effectButton,
                                                        isApplied && styles.disabledEffectButton // apply special style
                                                    ]}
                                                    onPress={() => {
                                                        if (isApplied) return; // do nothing if already applied
                                                        socketIO.getSocket()?.emit(
                                                            "disease",
                                                            selectedPlayer?.email,
                                                            effect.id
                                                        );
                                                        setModalVisible(false);
                                                    }}
                                                    disabled={isApplied} // actually disables Pressable
                                                >
                                                    <Text
                                                        style={[
                                                            styles.effectText,
                                                            isApplied && styles.disabledEffectText
                                                        ]}
                                                    >
                                                        {effect.label}
                                                    </Text>
                                                </Pressable>
                                            );
                                        })}
                                    </ScrollView>
                                </View>

                                <Pressable
                                    style={[styles.effectButton, { width: '100%', marginTop: 10 }]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.effectText}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
}

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
            marginTop: StatusBar.currentHeight || 0,
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
            fontSize: 32 * fontScale,
            marginBottom: '2%',
            marginTop: '2%',
            color: '#E2DFD2',
            backgroundColor: 'rgba(0,0,0,0.5)',
            maxWidth: "100%",
            padding: '3%',
            borderRadius: 0.02 * height,
            fontFamily: 'OptimusPrincepsSemiBold',
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center'
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            width: '90%',
            maxHeight: '70%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            borderRadius: 12,
            padding: 20,
        },

        button: {
            borderRadius: 10,
            padding: 15,
            elevation: 5,
            borderColor: 'grey',
            borderWidth: 2,
            margin: 10,
            backgroundColor: "rgba(0,0,0,0.5)"

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
        effectsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
        },
        effectButton: {
            width: '45%',      // 2 per row
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#E2DFD2',
            backgroundColor: 'rgba(0,0,0,0.6)',
        },
        effectText: {
            color: 'yellow',
            textAlign: 'center',
            fontFamily: 'OptimusPrincepsSemiBold',
            fontSize: 20,
        },
        disabledEffectButton: {
            backgroundColor: 'rgba(128,128,128,0.5)', // greyed out
            borderColor: 'grey',
        },
        disabledEffectText: {
            color: 'lightgrey',
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