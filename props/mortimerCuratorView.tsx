import React, { useState } from "react";
import { View, Text, Image, useWindowDimensions, StyleSheet, TouchableOpacity } from "react-native";
import { deadlyEffects, usePlayerStore } from "../gameStore";
import socketIO from "../socketIO";

// Simple mapping from stored numbers to readable names
const deadlyEffectsNames: Record<string, string> = {
    "0": "Putrid Plague",
    "1": "Epic Weakness",
    "2": "Medular Apocalypse",
    "3": "Ethazium Curse",
};

export default function MortimerCuratorView({ player, index }: { player: any; index: number }) {

    const { height, width } = useWindowDimensions();

    const styles = getStyles(width, height);

    const setIsProcessingStatusApplication = usePlayerStore(state => state.setIsProcessingStatusApplication);

    const removeCurse = () => {
        const socket = socketIO.getSocket();

        if(socket)
        {
            socket.emit("release", player.email, deadlyEffects.ethaziumCurse);
            setIsProcessingStatusApplication(true);
        }
    }

    const cureDiseases = () => {
        const socket = socketIO.getSocket();

        if(socket)
        {
            socket.emit("disease", player.email);
            setIsProcessingStatusApplication(true);
        }
    }

    const recoverResistance = () => {
        const socket = socketIO.getSocket();

        if(socket)
        {
            socket.emit("restore", player.email, "resistance");
            setIsProcessingStatusApplication(true);
        }
    }

    // Determine text color for nickname
    const textColor = player.isInside ? 'yellow' : 'grey';

    return (
        <View style={styles.view}>
            {/* Player Avatar */}
            <Image
                resizeMode="cover"
                source={{ uri: player.avatar }}
                style={styles.image}
            />

            {/* Player Nickname */}
            <Text style={[styles.text, { color: textColor }]}>
                {player.nickname}
            </Text>

            <Text style={[styles.statusText, { color: textColor }]}>
                Resistance: {player.attributes[0].resistance}
            </Text>

            {/* Status Effects as a list */}
            <View style={styles.statusList}>
                {player.statusEffects?.length ? (
                    player.statusEffects.map((effect: string, i: number) => {
                        const isCurse = effect === deadlyEffects.ethaziumCurse;
                        return (
                            <Text
                                key={i}
                                style={[styles.statusText, { color: isCurse ? 'red' : 'yellow' }]}
                            >
                                • {deadlyEffectsNames[effect] || "Unknown"}
                            </Text>
                        );
                    })
                ) : (
                    <Text style={[styles.statusText, { color: 'grey' }]}>
                        No maladies
                    </Text>
                )}
            </View>
            <View style={styles.centeredView}>
                <TouchableOpacity style={styles.button} onPress={removeCurse}>
                    <Text style={styles.buttonText}>REMOVE CURSE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={cureDiseases}>
                    <Text style={styles.buttonText}>CURE SICKNESS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={recoverResistance}>
                    <Text style={styles.buttonText}>RECOVER RESISTANCE</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

function getStyles(width: number, height: number) {
    return StyleSheet.create({
        view: {
            width: width * 0.9,
            marginTop: '5%',
            backgroundColor: 'rgba(0,0,0,0.75)',
            borderWidth: 0.005*width,
            borderColor: 'gray',
            padding: 0.002*width,
            borderRadius: 10,
            position: 'relative',
        },
        text: {
            fontSize: 20,
            fontFamily: 'OptimusPrincepsSemiBold',
            marginBottom: 5,
        },
        buttonText: {
            fontSize: 16,
            fontFamily: 'OptimusPrincepsSemiBold',
            textAlign: 'center',
            textAlignVertical: 'center',
            color: 'gray',
            marginTop: 0.01*height
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            padding: '5%',
            height: 0.1 * height,
            backgroundColor: 'transparent',
            width: width * 0.9,
        },
        button: {
            width: 0.26*width,
            height: 0.08*height,
            padding: "1%",
            borderWidth: 0.0035*height,
            borderColor: 'gray',
            borderRadius: 0.01*height,
        },
        image: {
            width: width * 0.15,
            height: width * 0.15,
            borderRadius: width * 0.075,
            position: 'absolute',
            top: 10,
            right: 10,
        },
        statusList: {
            marginTop: 5,
        },
        statusText: {
            fontSize: 16,
            marginVertical: 1,
            fontFamily: 'OptimusPrincepsSemiBold',
        },
        checkBox: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
    });
}