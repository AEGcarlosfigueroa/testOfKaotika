// IstvanNavigator.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { MainTabNav } from './myTabs';

const styles = StyleSheet.create({
  topOffset: {
    marginTop: '10%'
  }  //   <Tab.Navigator
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
})

export function IstvanNav() {
  return (

    <MainTabNav/>

  )
}

export default IstvanNav;
