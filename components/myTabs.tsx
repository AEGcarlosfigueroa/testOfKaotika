import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BlurView } from '@react-native-community/blur';
import Settings from '../screens/settings';
import Home from '../screens/home';
import Entrance from '../screens/Entrance';
import OldSchool from '../screens/OldSchool';
import SpyCam from '../screens/SpyCam';
import Map from '../screens/Map';
import TowerEntrance from '../screens/TowerEntrance';
import HallOfSages from '../screens/HallOfSages';
import Laboratory from '../screens/laboratory';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swamp from '../screens/Swamp';
import { useWindowDimensions } from 'react-native';
import { usePlayerStore } from '../gameStore';
import Scanner from '../screens/scanner';
import Obituary from '../screens/Obituary';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsScreen" component={Settings} />
    </Stack.Navigator>
  );
}
export function stackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
function mapNav() {
  const player = usePlayerStore(state => state.player);
  if(player?.profile.role === 'ACOLITO')
  {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Entrance" component={Entrance} />
        <Stack.Screen name="Tower" component={TowerEntrance} />
        <Stack.Screen name='Swamp' component={Swamp} />
        <Stack.Screen name="Laboratory" component={Laboratory} />
        <Stack.Screen name="OldSchool" component={OldSchool} />
        <Stack.Screen name="HallOfSages" component={HallOfSages} />
        <Stack.Screen name="Obituary" component={Obituary} />
      </Stack.Navigator>
    )
  }
  else if(player?.profile.role === 'ISTVAN')
  {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Entrance" component={Scanner} />
        <Stack.Screen name="Tower" component={TowerEntrance} />
        <Stack.Screen name='Swamp' component={SpyCam} />
        <Stack.Screen name="Laboratory" component={Laboratory} />
        <Stack.Screen name="OldSchool" component={OldSchool} />
        <Stack.Screen name="HallOfSages" component={HallOfSages} />
        <Stack.Screen name="Obituary" component={Obituary} />
      </Stack.Navigator>
    )
  }
  else
  {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Entrance" component={Entrance} />
        <Stack.Screen name="Tower" component={TowerEntrance} />
        <Stack.Screen name='Swamp' component={SpyCam} />
        <Stack.Screen name="Laboratory" component={Laboratory} />
        <Stack.Screen name="OldSchool" component={OldSchool} />
        <Stack.Screen name="HallOfSages" component={HallOfSages} />
        <Stack.Screen name="Obituary" component={Obituary} />
      </Stack.Navigator>
    )
  }
}
export function MainTabNav() {
  const { height, width, scale, fontScale } = useWindowDimensions();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {

          let iconName: string = '';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Map') iconName = 'map';
          else if (route.name === 'Settings') iconName = 'settings-sharp';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderBlockColor: 'black',
          borderTopWidth: 0.005 * height,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => (
          <BlurView
            blurType="dark"
            blurAmount={10}
            style={{ flex: 0 }}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={stackNav} />
      <Tab.Screen name="Map" component={mapNav} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
}
