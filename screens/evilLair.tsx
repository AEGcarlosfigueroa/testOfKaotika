import dungeon from "../assets/dungeon.png"
import settings from "../assets/settings.png"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useContext } from "react";
import { playerContext } from "../context";
import { GenericButton, buttonStyles } from "../props/genericButton";

//Refractor later put in a seperate file called styles 
const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 20,
    color: '#E2DFD2',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
    boxShadow: '5px 5px 5px 5px black',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    // elevation: 2
    
  },
})

function EvilLair ()
{ 
    const warning = "Turn back, traveler. The gate ahead does not open to the world of men."
    const context = useContext(playerContext)
    const {player} = context
    const imageSource = require('../assets/settings.png')

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image source={imageSource} style={styles.image}/>
                {player.profile.role === "ACOLITO" && <Text style={[styles.title, { top: '40%', fontSize: 20}]}>{warning}</Text>}
                <GenericButton/>
            </View>
        )
    }
    

export default EvilLair