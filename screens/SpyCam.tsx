import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useEffect, useState, useReducer, useContext } from "react";
import { playerContext } from "../context";
import socketIO from "../socketIO";
import PlayerView from "../props/playerView";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { GenericButton } from "../props/genericButton";

const styles = StyleSheet.create({
    image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%'
  }
});

function SpyCam() {
  const context = useContext(playerContext)
  const {player}= context

  // --- Handle socket connection ---
  const [socketId, setSocketId] = useState('');
  const [data, setData] = useState([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleNewData = (newData: any) => {
    setData(newData);
    console.log(newData);
    forceUpdate
  }

  // FAKE DATA FOR TESTING PURPOSES
  // const fakeData = [
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER1",
  //     isInside: true
  //   },
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER2",
  //     isInside: true
  //   },
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER3",
  //     isInside: true
  //   },
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER4",
  //     isInside: true
  //   },
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER5",
  //     isInside: false
  //   },
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER6",
  //     isInside: true
  //   },
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER4",
  //     isInside: true
  //   },
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER5",
  //     isInside: false
  //   },
  //   {
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocJyb_mQCSSyhEz9kL_UeS560nXbllgOdDJpmKVt4gsgsnHiAw=s96-c",
  //     nickname: "TEST PLAYER6",
  //     isInside: true
  //   }
  // ]

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

    socket.on('update', handleNewData);
  })

  if(player.profile.role !== 'MORTIMER')
  {
    return (
      <>
      <Image source={require('../assets/evilEye.jpg')} style={[styles.image, {width: '100%', height: '100%'}]}/>
      <GenericButton/>

      </>

      
    )
  }
  else
  {
     return (
      <>
      <Image source={require("./../assets/tasks.png")} style={styles.image}/>
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView overScrollMode="always" style={{height: '100%'}}>
            {data.map( (elem, i) =>  PlayerView(elem, i))}
          </ScrollView>  
        </SafeAreaView>
      </SafeAreaProvider>
      </>
  );
  }
   
}
export default SpyCam