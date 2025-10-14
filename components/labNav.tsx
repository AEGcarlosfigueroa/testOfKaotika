import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import playerContext from '../context';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%',
  },
});

function LabNav() {

  const context = React.useContext(playerContext);
  const {player} = context;
  // Only verified players can see lab content
  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./../assets/tasks.png')} style={styles.image} />
      <Text style={{ color: 'white', fontSize: 24 }}>Welcome to the Laboratory!</Text>
    </View>
  );
}

export default LabNav;
