import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";

const styles = StyleSheet.create({
    view: {
        width: '90%',
        marginTop: '5%',
        height: '20%',
        backgroundColor: 'rgba(0,0,0,1)',
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
                <Image resizeMode="contain" src={player.avatar} style={styles.image}></Image>
                <Text style={{ fontSize: 40, color: textColor }}>{player.nickname}</Text>
                <Text style={{ fontSize: 40, color: textColor }}>Is Inside Laboratory?</Text>
                <CheckBox style={styles.checkBox} disabled={true} value={player.isInside} tintColors={ {true: 'yellow', false: "gray"} }/>
            </View>
    )
}