import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%',
  },
});

function Laboratory({ player }: { player: any }) {
  // Only verified players can see lab content
  if (!player?.isInside) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>You are not verified yet!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./../assets/tasks.png')} style={styles.image} />
      <Text style={{ color: 'white', fontSize: 24 }}>Welcome to the Laboratory!</Text>
    </View>
  );
}

export default Laboratory;
