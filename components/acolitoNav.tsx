// acolitoNav.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import Home from '../screens/home';
import Entrance from '../screens/Entrance';
import Settings from '../screens/settings';
import { StyleSheet, Image } from 'react-native';
import rune from "../assets/icons/rune.png"
import moon from "../assets/icons/moon.png"
import tarot from "../assets/icons/tarot.png"



const styles = StyleSheet.create({
  topOffset: {
    marginTop: '10%',
  }
})

const Tab = createMaterialTopTabNavigator();

export function AcolitoNav() {
  return (
    <Tab.Navigator
      style={styles.topOffset}
      screenOptions={({ route }) => ({
       tabBarIcon: ({ color }) => {
          if(route.name === "Home")
          {
            return (<Image source={rune} style={{width : 30, height : 30, tintColor: color}}/>)
          }
          else if(route.name === "Entrance")
          {
            return (<Image source={moon} style={{width : 30, height : 30, tintColor: color}}/>)
          }
          else {
            return (<Image source={tarot} style={{width : 30, height : 30, tintColor: color}}/>)

          }
        },
        tabBarIndicatorStyle: { backgroundColor: '#E2DFD2' },
        tabBarActiveTintColor: '#ffce00',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.3)',
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
      })}
    >
      <Tab.Screen name="Home">{() => <Home/>}</Tab.Screen>
      <Tab.Screen name="Entrance">{() => <Entrance/>}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default AcolitoNav;