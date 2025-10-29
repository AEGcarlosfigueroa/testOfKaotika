// acolitoNav.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/home';
import Map from '../screens/Map'
import Entrance from '../screens/Entrance';
import { StyleSheet } from 'react-native';
import { mapContext } from '../context';
import { createStackNavigator } from '@react-navigation/stack'



const styles = StyleSheet.create({
  topOffset: {
    marginTop: '10%',

  }
})

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator()

export function AcolitoNav() {

    const contextMap = React.useContext(mapContext)
  
    const {mapView, setMap} = contextMap;

  return (
    // <Tab.Navigator
    //   style={styles.topOffset}
    //   screenOptions={({ route }) => ({
    //    tabBarIcon: ({ color }) => {
    //       if(route.name === "Home")
    //       {
    //         return (<Image source={rune} style={{width : 30, height : 30, tintColor: color}}/>)
    //       }
    //       else if(route.name === "Entrance")
    //       {
    //         return (<Image source={moon} style={{width : 30, height : 30, tintColor: color}}/>)
    //       }
    //       else {
    //         return (<Image source={tarot} style={{width : 30, height : 30, tintColor: color}}/>)

    //       }
    //     },
    //     tabBarIndicatorStyle: { backgroundColor: '#E2DFD2' },
    //     tabBarActiveTintColor: '#ffce00',
    //     tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.3)',
    //     tabBarShowIcon: false,
    //     tabBarShowLabel: false,
    //     tabBarStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' , display: 'none'},
    //     swipeEnabled: false
    //   })}
    // >
    //   <Tab.Screen name="Home">{() => !mapView ? <Home/> : <Map/>}</Tab.Screen>
    //   <Tab.Screen name="Entrance">{() => <Entrance/>}</Tab.Screen>
    //   <Tab.Screen name="Settings">{() => <Settings/>}</Tab.Screen>
    // </Tab.Navigator>
    
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Entrance" component={Entrance} />
    </Stack.Navigator>

  );
}

export default AcolitoNav;
