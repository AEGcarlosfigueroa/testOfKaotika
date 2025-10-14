import { Image, StyleSheet } from "react-native";
import React from 'react';
import { View, Text } from 'react-native';


const styles = StyleSheet.create({
    image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%'
  }
})
function Laboratory({route, navigation}) {
    const { verified } = route.params || {};

    if (!verified) {
        navigation.replace('Entrance');
        return null;
    }

    return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
    <Image source={require("./../assets/tasks.png")} style={styles.image}/>
    <Text style={{ color: 'white', fontSize: 24 }}>Welcome to the Next Room!</Text>
    </View>
    );    
}
export default Laboratory;