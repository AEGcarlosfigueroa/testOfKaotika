// acolitoNav.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/home';
import Entrance from '../screens/Entrance';
import Settings from '../screens/settings';

const Tab = createMaterialTopTabNavigator();

export function acolitoNav({ player }: { player: any }) {
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
      <Tab.Screen name="Home">{() => <Home player={player} />}</Tab.Screen>
      <Tab.Screen name="Entrance">{() => <Entrance player={player} />}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings player={player} />}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default acolitoNav;