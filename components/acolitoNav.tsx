// acolitoNav.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import Home from '../screens/home';
import Entrance from '../screens/Entrance';
import Settings from '../screens/settings';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topOffset: {
    marginTop: '10%'
  }
})

const Tab = createMaterialTopTabNavigator();

export function AcolitoNav({ player }: { player: any }) {
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
        tabBarIndicatorStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#000000ff',
        tabBarShowIcon: true,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home">{() => <Home player={player} />}</Tab.Screen>
      <Tab.Screen name="Entrance">{() => <Entrance player={player} />}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings player={player} />}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default AcolitoNav;