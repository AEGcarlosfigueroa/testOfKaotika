import React, { useState } from "react";
import { View, Text, Image, useWindowDimensions, StyleSheet } from "react-native";
import { deadlyEffects } from "../gameStore";

// Simple mapping from stored numbers to readable names
const deadlyEffectsNames: Record<string, string> = {
    "0": "Putrid Plague",
    "1": "Epic Weakness",
    "2": "Medula Apocalypse",
    "3": "Ethazium Curse"
};

export default function NonBetrayerView({ player, index }: { player: any; index: number }) {

    const { height, width } = useWindowDimensions();

    const styles = getStyles(width, height);

    const [modalVisible, setModalVisible] = useState(false)

    const [hasPrompted, setHasPrompted] = useState(false);


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
        </View>
    );
}

function getStyles(width: number, height: number) {
    return StyleSheet.create({
        view: {
            width: width * 0.9,
            marginTop: '5%',
            backgroundColor: 'rgba(0,0,0,1)',
            borderWidth: 3,
            borderColor: 'gray',
            padding: 10,
            borderRadius: 10,
            position: 'relative',
        },
        text: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
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
        },
        checkBox: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
    });
}
