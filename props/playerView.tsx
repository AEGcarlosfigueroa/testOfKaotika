import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";
import { DimensionValue } from "react-native";

const styles = StyleSheet.create({
    view: {
        width: '90%',
        marginTop: '5%',
        height: 'auto',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: 'gray',
        marginLeft: '5%',
        position: 'relative',
        display: 'flex'
    },
    checkBox: {

    },
    image: {
        width: '20%',
        height: '100%',
        marginLeft: '70%',
        position: 'absolute'
    }
})

export default function PlayerView (player: any, index: any)
{
    let textColor = 'grey';
    if(player.isInside)
    {
        textColor = 'yellow'
    }
    return (
            <View style={styles.view} key={index}>
                <Image resizeMode="contain" src={player.image} style={styles.image}></Image>
                <Text style={{ fontSize: 20, color: textColor }}>{player.nickname}</Text>
                <Text style={{ fontSize: 20, color: textColor }}>Is Inside?</Text>
                <CheckBox style={styles.checkBox} disabled={true} value={player.isInside} tintColors={ {true: 'yellow', false: "gray"} }/>
            </View>
    )
}