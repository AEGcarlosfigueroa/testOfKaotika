// IstvanNavigator.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/home';
import Settings from '../screens/settings';
import Scanner from '../screens/scanner';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topOffset: {
    marginTop: '10%'
  }
})

const Tab = createMaterialTopTabNavigator();

export function IstvanNav() {
  return (
    <Tab.Navigator
      style={styles.topOffset}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => (
          <Ionicons
            name={
              route.name === 'Home'
                ? 'home'
                : route.name === 'Entrance'
                ? 'log-in'
                : 'settings-sharp'
            }
            size={24}
            color={color}
          />
        ),
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
        tabBarActiveTintColor: 'yellow',
        tabBarInactiveTintColor: 'gray',
        tabBarShowIcon: true,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: 'black' }
      })}
    >
      <Tab.Screen name="Home">{() => <Home/>}</Tab.Screen>
      <Tab.Screen name="Entrance">{() => <Scanner/>}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default IstvanNav;
