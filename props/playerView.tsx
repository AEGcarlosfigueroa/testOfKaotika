import { Image, Text, useWindowDimensions, View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';

export default function PlayerView({ player, index }: { player: any, index: number }) {

    let textColor = 'grey';

    const styles = getStyle();

    if (player.isInside) {
        textColor = 'yellow';
    }

    return (
        <View style={styles.view} key={index}>
            <Image resizeMode="contain" src={player.avatar} style={styles.image} />
            <Text style={{ fontSize: 20, color: textColor, position: 'relative' }}>{player.nickname}</Text>
            <Text style={{ fontSize: 20, color: textColor, position: 'relative' }}>Is Inside Laboratory?</Text>
            <AdvancedCheckbox
                size={35}
                checkBoxStyle={styles.checkBox}
                disabled={true}
                value={player.isInside}
                checkedColor="yellow"
            />
        </View>
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
            backgroundColor: 'rgba(0,0,0,1)',
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: 'gray',
            marginLeft: '5%',
            position: 'relative',
        },
        checkBox: {
        },
        image: {
            width: 0.15*width,
            height: 0.15*width,
            marginTop: '5%',
            marginLeft: '70%',
            position: 'absolute',
            borderRadius: 0.15*width
        }
    })
    return styles;
}
