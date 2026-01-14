import { Image, Text, useWindowDimensions, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';
import { deadlyEffects } from "../interfaces/constants";
import { Player } from "../interfaces/PlayerInterface";
import { usePlayerStore } from '../gameStore';
import socketIO from "../socketIO";

export default function CursePlayerView({ player, index }: { player: Player, index: number }) {

    const { height } = useWindowDimensions();

    const setIsProcessingStatusApplication = usePlayerStore(state => state.setIsProcessingStatusApplication);

    let textColor = 'grey';

    const styles = getStyle();

    const handleCurseApplication = () => {
        const socket = socketIO.getSocket();
        const currentPlayer = player;

        if(socket && !currentPlayer.statusEffects.includes(deadlyEffects.ethaziumCurse))
        {
            setIsProcessingStatusApplication(true);
            socket.emit("curse", currentPlayer.email);
        }
    }

    if (player.statusEffects.includes(deadlyEffects.ethaziumCurse)) {
        textColor = 'red';
    }

    return (
        <TouchableOpacity style={styles.view} key={index} onPress={handleCurseApplication}>
            <Image resizeMode="contain" src={player.avatar} style={styles.image} />
            <Text style={{ fontSize: 20, color: textColor, position: 'relative', fontFamily: 'OptimusPrincepsSemiBold', }}>{player.nickname}</Text>
            <Text style={{ fontSize: 20, color: textColor, position: 'relative', fontFamily: 'OptimusPrincepsSemiBold', }}>Is Cursed?</Text>
            <AdvancedCheckbox
                size={0.035*height}
                checkBoxStyle={styles.checkBox}
                disabled={true}
                value={player.statusEffects.includes(deadlyEffects.ethaziumCurse)}
                checkedColor="red"
            />
        </TouchableOpacity>
    );
}

function getStyle()
{
    const { height, width, scale, fontScale } = useWindowDimensions();
    const styles = StyleSheet.create({
        view: {
            width: 0.90*width,
            marginTop: '5%',
            height: 0.12*height,
            backgroundColor: 'rgba(0,0,0,0.75)',
            borderWidth: 0.005*width,
            borderStyle: 'solid',
            borderColor: 'gray',
            marginLeft: '5%',
            position: 'relative',
            padding: 0.01 * width,
            borderRadius: 0.05 * width
        },
        checkBox: {
        },
        image: {
            width: 0.15*width,
            height: 0.15*width,
            marginTop: '5%',
            marginLeft: 0.65*width,
            position: 'absolute',
            borderRadius: 0.15*width
        }
    })
    return styles;
}