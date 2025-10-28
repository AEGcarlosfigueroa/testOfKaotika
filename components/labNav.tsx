import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import {playerContext} from '../context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import Laboratory from '../screens/laboratory';
import Settings from '../screens/settings';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%',
  },
  topOffset: {
    marginTop: '10%'
  }
});

function LabNav() {

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
      <Tab.Screen name="Laboratory">{() => <Laboratory/>}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default LabNav;
