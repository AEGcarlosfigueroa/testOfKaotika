// IstvanNavigator.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/home';
import Settings from '../screens/settings';
import Scanner from '../screens/scanner';

const Tab = createMaterialTopTabNavigator();

export function IstvanNav() {
  return (
    <Tab.Navigator
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
        tabBarIndicatorStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#000000ff',
        tabBarShowIcon: false,
        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen name="Home">{() => <Home/>}</Tab.Screen>
      <Tab.Screen name="Entrance">{() => <Scanner/>}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default IstvanNav;
