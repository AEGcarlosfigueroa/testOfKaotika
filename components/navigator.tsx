import * as React from 'react';
import { useEffect, useState, useReducer } from 'react';
import IstvanNav from './istvanNav';
// import villanoNav from './villanoNav';
import MortimerNav from './mortimerNav';
import AcolitoNav from './acolitoNav';
import { playerContext, isInTowerContext, playerListContext, scrollStateContext, scrollStateList } from '../context';
import Laboratory from '../screens/laboratory';
import { useNavigation } from '@react-navigation/native';
import { Alert, BackHandler, ToastAndroid } from 'react-native';
import socketIO from '../socketIO';
import Tower from '../screens/Tower';
import pNotify from '../pushNotification';
import { serverURL } from '../App';
import ScrollAlert from '../screens/ScrollAlert';
import { usePlayerStore } from '../gameStore'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function Navigator ()
{
  
  const Tab = createBottomTabNavigator();

  const player = usePlayerStore(state => state.player)

  const setPlayer = usePlayerStore(state => state.setPlayer)

  const playerList = usePlayerStore(state => state.playerList);

  const setPlayerList = usePlayerStore(state => state.setPlayerList);

  const isInTower = usePlayerStore(state => state.isInTower)

  const setIsInTower = usePlayerStore(state => state.setIsInTower)

  const scrollState = usePlayerStore(state => state.scrollState)

  const setScrollState = usePlayerStore(state => state.setScrollState)

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
    const handleNewData = (newData: any) => {
      setPlayerList(newData);
      console.log(newData);
      if(player)
      {
        pNotify(serverURL, player.email)
      }
      forceUpdate
    }

  const [socketId, setSocketId] = useState<String>('');
    const navigation = useNavigation();

    // --- Handle sockeimport scrollAlert from '../screens/ScrollAlert';t connection ---
      useEffect(() => {
        const socket = socketIO.getSocket();
        if (!socket) return;
    
        const handleConnect = () => setSocketId(socket.id || '');
    
        if (socket.connected) {
          handleConnect();
        } else {
          socket.on('connect', handleConnect);
        }
    
        return () => {
          socket.off('connect', handleConnect);
        };
      }, []);


      useEffect(() => {
          const socket = socketIO.getSocket();
          if (!socket) return;
      
          const handleEntryGranted = (updatedPlayer: any) => {
            setPlayer(updatedPlayer);
      
            if (updatedPlayer.isInTower !== true) {
              setIsInTower(false);
            }
            else
            {
              setIsInTower(true);
            }
          };

          const sendIsInTower = () => {
            console.log(isInTower);
            socket.emit("inTower", isInTower);
          }

          const handleScrollCollected = () => {
            setScrollState(scrollStateList.collected)
          }

          const handleScrollDestroyed = (message: string) => {
            setScrollState(scrollStateList.destroyed);
            ToastAndroid.show(message, 5000);
          }
          
          socket.on('isInTowerEntranceRequest', sendIsInTower);
          socket.on('authorization', handleEntryGranted);
          socket.on('update', handleNewData);
          socket.on('scrollCollectedEvent', handleScrollCollected);
          socket.on('scrollDestroyedEvent', handleScrollDestroyed);
          return () => {
            socket.off('authorization', handleEntryGranted);
            socket.off('isInTowerEntranceRequest', sendIsInTower);
            socket.off('update', handleNewData);
            socket.off('scrollCollectedEvent', handleScrollCollected);
            socket.off('scrollDestroyedEvent', handleScrollDestroyed);
          }
        }, [navigation, isInTower, scrollState]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    
    if(!player?.isInTower)
    {
      setIsInTower(false);
    }
    
    return false;
  });
 
  if(!player)
  {
    return null;
  }
  
  switch (player.profile.role)
  {
    case 'ISTVAN':
      return <IstvanNav/>
      

    case 'ACOLITO':
      if(player.isInside)
      {
        return <Laboratory/>
      }
      else if(player.isInTower)
      {
        return <Tower/>
      }
      else
      {
        return  <AcolitoNav/>
      }

    case 'MORTIMER': 
      if(scrollState === scrollStateList.collected)
      {
        return <ScrollAlert/>
      }
      else
      {
        return <MortimerNav/>
      }
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

    default:
      return null;

  }

}

export default Navigator;
