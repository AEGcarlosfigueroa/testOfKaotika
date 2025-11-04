// IstvanNavigator.tsx
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/home';
import Map from '../screens/Map'
import Scanner from '../screens/scanner';
import TowerEntrance from '../screens/TowerEntrance';
import SpyCam from '../screens/SpyCam';

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  topOffset: {
    marginTop: '10%'
  }
})

export function IstvanNav() {
  return (
  //   <Tab.Navigator
  //     style={styles.topOffset}
  //     screenOptions={({ route }) => ({
  //       tabBarIcon: ({ color }) => {
  //         if(route.name === "Home")
  //         {
  //           return (<Image source={rune} style={{width : 30, height : 30}}/>)
  //         }
  //         else if(route.name === "Entrance")
  //         {
  //           return (<Image source={pluto} style={{width : 30, height : 30}}/>)
  //         }
  //         else {
  //           return (<Image source={tarot} style={{width : 30, height : 30}}/>)

  //         }
  //       },
  //       tabBarIndicatorStyle: { backgroundColor: 'black' },
  //       tabBarActiveTintColor: 'black',
  //       tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
  //       tabBarShowIcon: true,
  //       tabBarShowLabel: true,
  //       tabBarLabelStyle: { fontSize: 18, fontFamily: 'OptimusPrincepsSemiBold' },
  //       // tabBarItemStyle: { width: 100 },
  //       tabBarStyle: { backgroundColor: '#E2DFD2' },
  //         tabBarPressOpacity: 0.9, // Tab will fade to 50% opacity when pressed
  //     })}
  //   >
  //     <Tab.Screen name="Home">{() => <Home/>}</Tab.Screen>
  //     <Tab.Screen name="Entrance">{() => <Scanner/>}</Tab.Screen>
  //     <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
  //   </Tab.Navigator>
  // );
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Entrance" component={Scanner} />
      <Stack.Screen name="Lair" component={TowerEntrance}/>
      <Stack.Screen name='SpyCam' component={SpyCam}/>
    </Stack.Navigator>
  )
}

export default IstvanNav;
