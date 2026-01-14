import { Image, Text, useWindowDimensions, View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';

export default function PlayerView({ player, index }: { player: any, index: number }) {

    const { height } = useWindowDimensions();

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
                size={0.035*height}
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
