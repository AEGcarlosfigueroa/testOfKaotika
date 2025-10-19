// acolitoNav.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import Home from '../screens/home';
import Entrance from '../screens/Entrance';
import Settings from '../screens/settings';
import { StyleSheet, Image } from 'react-native';
import SpyCam from '../screens/SpyCam';
import stars from "../assets/icons/stars.png"
import eye from "../assets/icons/eye.png"
import book from "../assets/icons/book.png"
import tarot from "../assets/icons/tarot.png"



const styles = StyleSheet.create({
  topOffset: {
    marginTop: '10%'
  }
})

const Tab = createMaterialTopTabNavigator();

export function MortimerNav() {
  return (
    <Tab.Navigator
      style={styles.topOffset}
       screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if(route.name === "Home")
          {
            return (<Image source={stars} style={{width : 30, height : 30, tintColor: color}}/>)
          }
          else if(route.name === "SpyCam")
          {
            return (<Image source={eye} style={{width : 30, height : 30, tintColor: color}}/>)
          }
          else {
            return (<Image source={book} style={{width : 30, height : 30, tintColor: color}}/>)

          }
        },
        tabBarIndicatorStyle: { backgroundColor: 'white' },
        tabBarActiveTintColor: '#ff9a00',
        tabBarInactiveTintColor: 'gray',
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: 'black' }
      })}
    >
      <Tab.Screen name="Home">{() => <Home/>}</Tab.Screen>
      <Tab.Screen name="SpyCam">{() => <SpyCam/>}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default MortimerNav;