// acolitoNav.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import Home from '../screens/home';
import Entrance from '../screens/Entrance';
import Settings from '../screens/settings';
import { StyleSheet } from 'react-native';
import SpyCam from '../screens/SpyCam';

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
      <Tab.Screen name="SpyCam">{() => <SpyCam/>}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default MortimerNav;