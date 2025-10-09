import * as React from 'react';
import IstvanNav from './istvanNav';
// import villanoNav from './villanoNav';
// import mortimerNav from './mortimerNav';
// import acolitoNav from './acolitoNav';

function Navigator ({ player })
{
  switch (player.profile.role)
  {
    case 'ISTVAN':
      return <IstvanNav player={player} />

    default:
      return null;

  }
}



// const Tab = createMaterialTopTabNavigator();

// // Plain object mapping screen names to components
// const screenComponents = {
//   Home: Home,
//   Tasks: Tasks,
//   Entrance: Entrance,
//   SpyCam: SpyCam,
//   Settings: Settings,
// };

// // Plain object mapping roles to their screens
// const roleScreens = {
//   ISTVAN: ['Home', 'Entrance', 'Settings'],
//   VILLANO: ['Home', 'Settings'],
//   MORTIMER: ['Home', 'SpyCam', 'Settings'],
//   ACOLITO: ['Home', 'Tasks', 'Entrance', 'Settings'],
// };

// function Navigator({ player }) {
//   // Get the screens for this player's role
//   const screensToRender = roleScreens[player.profile.role] || ['Home', 'Tasks', 'Settings'];

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         style={{ marginTop: '10%' }}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color }) => {
//             let iconName = 'help';
//             if (route.name === 'Home') iconName = 'home';
//             else if (route.name === 'Settings') iconName = 'settings-sharp';
//             else if (route.name === 'Tasks') iconName = 'map-sharp';
//             else if (route.name === 'Entrance') iconName = 'log-in';
//             else if (route.name === 'SpyCam') iconName = 'camera';
//             return <Ionicons name={iconName} size={26} color={color} />;
//           },
//           tabBarIndicatorStyle: { backgroundColor: 'yellow' },
//           tabBarActiveTintColor: 'yellow',
//           tabBarInactiveTintColor: '#9F9F9F',
//           tabBarShowIcon: true,
//           tabBarShowLabel: false,
//           swipeEnabled: true,
//           tabBarIndicatorContainerStyle: { backgroundColor: 'black' },
//         })}
//       >
//         {screensToRender.map((screenName) => {
//           const ScreenComponent = screenComponents[screenName];
//           return (
//             <Tab.Screen key={screenName} name={screenName}>
//               {() => <ScreenComponent player={player} />}
//             </Tab.Screen>
//           );
//         })}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

export default Navigator;
