// acolitoNav.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/home';
import Map from '../screens/Map'
import Entrance from '../screens/Entrance';
import EvilLair from '../screens/evilLair';
import SpyCam from '../screens/SpyCam';
import { StyleSheet } from 'react-native';
import { mapContext } from '../context';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export function AcolitoNav() {

    const contextMap = React.useContext(mapContext)
  
    const {mapView, setMap} = contextMap;

  return (

    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Map" component={Map}/>
      <Stack.Screen name="Entrance" component={Entrance}/>
      <Stack.Screen name="Lair" component={EvilLair}/>
      <Stack.Screen name='SpyCam' component={SpyCam}/>
    </Stack.Navigator>
  )
}

export default AcolitoNav;
