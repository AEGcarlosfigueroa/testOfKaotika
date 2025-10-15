// IstvanNavigator.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/home';
import Settings from '../screens/settings';
import Scanner from '../screens/scanner';
import { StyleSheet } from 'react-native';


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
        tabBarIcon: ({ color }) => (
          <Ionicons
            name={
              route.name === 'Home'
                ? 'home'
                : route.name === 'Entrance'
                ? 'log-in'
                : 'settings-sharp'
            }
            size={18}
            color={color}
          />
        ),
        tabBarIndicatorStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#000000ff',
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 18, fontFamily: 'OptimusPrincepsSemiBold' },
        // tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#E2DFD2' },
          tabBarPressOpacity: 0.1, // Tab will fade to 50% opacity when pressed
      })}
    >
      <Tab.Screen name="Home">{() => <Home/>}</Tab.Screen>
      <Tab.Screen name="Entrance">{() => <Scanner/>}</Tab.Screen>
      <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default IstvanNav;
