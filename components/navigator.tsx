import * as React from 'react';
import { useEffect, useState, useReducer } from 'react';
import IstvanNav from './istvanNav';
import Villano from './villanoNav';
import MortimerNav from './mortimerNav';
import AcolitoNav from './acolitoNav';
import Laboratory from '../screens/laboratory';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, ToastAndroid } from 'react-native';
import socketIO from '../socketIO';
import Tower from '../screens/Tower';
import pNotify from '../pushNotification';
import { serverURL } from '../App';
import ScrollAlert from '../screens/ScrollAlert';
import { usePlayerStore, scrollStateList, obituaryStateList } from '../gameStore';
import { useIsFocused } from '@react-navigation/native';
import { getAuth } from '@react-native-firebase/auth';
import AcolyteArtifactAlert from '../screens/AcolyteArtifactAlert';
import MortimerArtifactAlert from '../screens/MortimerArtifactAlert';

function Navigator() {

  const player = usePlayerStore(state => state.player)

  const setPlayer = usePlayerStore(state => state.setPlayer)

  const playerList = usePlayerStore(state => state.playerList);

  const setPlayerList = usePlayerStore(state => state.setPlayerList);

  const isInTower = usePlayerStore(state => state.isInTower)

  const setIsInTower = usePlayerStore(state => state.setIsInTower)

  const scrollState = usePlayerStore(state => state.scrollState)

  const setScrollState = usePlayerStore(state => state.setScrollState)

  const positionList = usePlayerStore(state => state.positionList)

  const setPositionList = usePlayerStore(state => state.setPositionList);

  const artifacts = usePlayerStore(state => state.artifactsDB);

  const setArtifacts = usePlayerStore(state => state.setArtifacts);

  const obituaryState = usePlayerStore(state => state.obituaryState);

  const setObituaryState = usePlayerStore(state => state.setObituaryState);

  const canShowArtifacts = usePlayerStore(state => state.canShowArtifacts);

  const setCanShowArtifacts = usePlayerStore(state => state.setCanShowArtifacts);

  const acolyteList = usePlayerStore(state => state.acolyteList);

  const setAcolyteList = usePlayerStore(state => state.setAcolyteList);

  const isFocused = useIsFocused();

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleNewData = (newData: any) => {
    setPlayerList(newData);
    console.log(newData);
    if (player) {
      pNotify(serverURL, player.email)
    }
    forceUpdate
  }

  const [socketId, setSocketId] = useState<String>('');
  const navigation = useNavigation();

  useEffect(() => {
    const restartSocketService = async() => {
      const idToken = await getAuth().currentUser?.getIdToken(false);
      const socket = socketIO.getSocket();
      if(isFocused && idToken && !socket)
      {
        socketIO.connectSocket(idToken, serverURL);
        const newSocket = socketIO.getSocket();

        if(newSocket)
        {
          setSocketId(newSocket.id || '');
        }
      }
      else if(!isFocused)
      {
        if(socket)
        {
          socket.disconnect();
          setSocketId('');
        }
      }
    }
    restartSocketService();
  }, [isFocused])

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
      else {
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

    const handleLocationUpdated = (message: any) => {
      setPositionList(message);
      console.log("New coords received");
    }

    const handleArtifactUpdate = (message: any) => {
      setArtifacts(message);
    }

    const handleStateUpdate = (message: any) => {
      setObituaryState(message.obituaryState);
      setScrollState(message.scrollState);
      setCanShowArtifacts(message.canShowArtifacts);

      console.log("can show artifact: " + canShowArtifacts);
    }

    const handleNewAcolyteList = (message: any) => {
      setAcolyteList(message);
    }

    socket.on('isInTowerEntranceRequest', sendIsInTower);
    socket.on('authorization', handleEntryGranted);
    socket.on('update', handleNewData);
    socket.on('scrollCollectedEvent', handleScrollCollected);
    socket.on('scrollDestroyedEvent', handleScrollDestroyed);
    socket.on("locationUpdated", handleLocationUpdated);
    socket.on("updateArtifacts", handleArtifactUpdate);
    socket.on("stateUpdate", handleStateUpdate);
    socket.on("updateAcolyte", handleNewAcolyteList)
    return () => {
      socket.off('authorization', handleEntryGranted);
      socket.off('isInTowerEntranceRequest', sendIsInTower);
      socket.off('update', handleNewData);
      socket.off('scrollCollectedEvent', handleScrollCollected);
      socket.off('scrollDestroyedEvent', handleScrollDestroyed);
      socket.off("locationUpdated", handleLocationUpdated);
      socket.off("updateArtifacts", handleArtifactUpdate);
      socket.off("stateUpdate", handleStateUpdate);
      socket.off("updateAcolyte", handleNewAcolyteList);
    }
  }, [navigation, isInTower, scrollState, positionList, playerList, artifacts, obituaryState, canShowArtifacts, acolyteList]);


  BackHandler.addEventListener('hardwareBackPress', () => {

    if (!player?.isInTower) {
      setIsInTower(false);
    }

    const socket = socketIO.getSocket();

    if (socket && player?.isInHallOfSages) {
      socket.emit("hallOfSages", "exit");
    }

    if (socket && player) {
      socket.emit("removeCoordinates", player.email);
    }

    return false;
  });
  if (!player) {
    return null;
  }

  switch (player.profile.role) {
    case 'ISTVAN':
      return <IstvanNav />

    case 'ACOLITO':
      if(obituaryState === obituaryStateList.evaluating) {
        return <AcolyteArtifactAlert/>
      }
      else if (player.isInside) {
        return <Laboratory />
      }
      else if (player.isInTower) {
        return <Tower />
      }
      else {
        return <AcolitoNav />
      }
    case 'MORTIMER':
      if(obituaryState === obituaryStateList.evaluating) {
        return <MortimerArtifactAlert/>
      }
      else if (scrollState === scrollStateList.collected) {
        return <ScrollAlert />
      }
      else {
        return <MortimerNav />
      }
    case 'VILLANO':
      return <Villano />

    default:
      return null;
  }
}
export default Navigator;
