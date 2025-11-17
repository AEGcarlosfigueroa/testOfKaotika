// acolitoNav.tsx
import React from 'react';
import Home from '../screens/home';
import Entrance from '../screens/Entrance';
import OldSchool from '../screens/OldSchool';
import SpyCam from '../screens/SpyCam';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../screens/Map';
import TowerEntrance from '../screens/TowerEntrance';
import HallOfSages from '../screens/HallOfSages';

const Stack = createStackNavigator();

export function MortimerNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Map" component={Map}/>
      <Stack.Screen name="Entrance" component={Entrance}/>
      <Stack.Screen name="Tower" component={TowerEntrance}/>
      <Stack.Screen name='SpyCam' component={SpyCam}/>
      <Stack.Screen name="OldSchool" component={OldSchool}/>
      <Stack.Screen name="HallOfSages" component={HallOfSages}/>
    </Stack.Navigator>
  );
}

export default MortimerNav;