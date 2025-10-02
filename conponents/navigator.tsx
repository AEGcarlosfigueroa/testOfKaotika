import * as React from 'react';
import Settings from '../screens/settings';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from '@react-native-vector-icons/ionicons'
import Home from '../screens/home';
import Tasks from '../screens/tasks';

const Tab = createMaterialTopTabNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator style={{marginTop: '10%'}}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                      let iconName;
                      if(route.name === "Home") iconName= 'home'
                      else if(route.name === 'Settings') iconName = 'settings-sharp'
                      else if(route.name === 'Tasks') iconName = 'map-sharp'
                      return <Ionicons name={iconName} size={26} color={color} />
                    },
                    tabBarActiveTintColor: 'yellow',
                    tabBarInactiveTintColor: '#9F9F9F',
                    tabBarShowIcon: true,
                    tabBarShowLabel: false,
                    swipeEnabled: true,
                    tabBarIndicatorContainerStyle: {backgroundColor: 'black'}
                    })}
            >
                <Tab.Screen name='Home' component={Home}/>
                <Tab.Screen name='Settings' component={Settings}/>
                <Tab.Screen name='Tasks' component={Tasks}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigator