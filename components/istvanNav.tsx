// IstvanNavigator.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/home';
import Settings from '../screens/settings';
import Scanner from '../screens/scanner';
import { StyleSheet, Image } from 'react-native';
import rune from "../assets/icons/rune.png"
import pluto from "../assets/icons/pluto.png"
import tarot from "../assets/icons/tarot.png"


const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  topOffset: {
    marginTop: '10%'
  }
})

export function IstvanNav() {
  return (
    <Tab.Navigator
      style={styles.topOffset}
      
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if(route.name === "Home")
          {
            return (<Image source={rune} style={{width : 30, height : 30}}/>)
          }
          else if(route.name === "Entrance")
          {
            return (<Image source={pluto} style={{width : 30, height : 30}}/>)
          }
          else {
            return (<Image source={tarot} style={{width : 30, height : 30}}/>)

          }
        },
        tabBarIndicatorStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 18, fontFamily: 'OptimusPrincepsSemiBold' },
        // tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#E2DFD2' },
          tabBarPressOpacity: 0.9, // Tab will fade to 50% opacity when pressed
      })}
    >
      <Tab.Screen name="Home">{() => <Home/>}</Tab.Screen>
      <Tab.Screen name="Entrance">{() => <Scanner/>}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default IstvanNav;
