import * as React from 'react';
import { useEffect, useState, useReducer } from 'react';
import IstvanNav from './istvanNav';
// import villanoNav from './villanoNav';
import MortimerNav from './mortimerNav';
import AcolitoNav from './acolitoNav';
import { playerContext, isInTowerContext, playerListContext } from '../context';
import Laboratory from '../screens/laboratory';
import { useNavigation } from '@react-navigation/native';
import { Alert, BackHandler } from 'react-native';
import socketIO from '../socketIO';
import Tower from '../screens/Tower';
import pNotify from '../pushNotification';
import { serverURL } from '../App';


function Navigator ()
{
  const context = React.useContext(playerContext);

  const towerContext = React.useContext(isInTowerContext);

  const listContext = React.useContext(playerListContext);

  const {playerList, setPlayerList} = listContext;

  const {isInTower, setIsInTower} = towerContext;

  const {player, setPlayer} = context;

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
    const handleNewData = (newData: any) => {
      setPlayerList(newData);
      console.log(newData);
      pNotify(serverURL, player.email)
      forceUpdate
    }

  const [socketId, setSocketId] = useState('');
    const navigation = useNavigation();

    // --- Handle socket connection ---
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
      
            if (updatedPlayer.isInTower === true) {
      
              Alert.alert('Access Granted', 'You may enter the tower.');
            }
            else
            {
              Alert.alert('Access Granted', 'You may exit the tower.');
              setIsInTower(false);
            }
          };

          const sendIsInTower = () => {
            console.log(isInTower);
            socket.emit("inTower", isInTower);
          }
          
          socket.on('isInTowerEntranceRequest', sendIsInTower);
          socket.on('authorization', handleEntryGranted);
          socket.on('update', handleNewData);
          return () => {
            socket.off('authorization', handleEntryGranted);
            socket.off('isInTowerEntranceRequest', sendIsInTower);
            socket.off('update', handleNewData);
          }
        }, [navigation, isInTower]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    
    if(!player.isInTower)
    {
      setIsInTower(false);
    }
    
    return false;
  });
 


  if(!context)
  {
    throw new Error ("Navigator must be inside the provider")
  }
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
        return <MortimerNav/>

    default:
      return null;

  }
}

export default Navigator;
