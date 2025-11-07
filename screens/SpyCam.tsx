import { Image, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { playerContext, playerListContext } from "../context";
import socketIO from "../socketIO";
import PlayerView from "../props/playerView";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { GenericButton } from "../props/genericButton";
import TowerPlayerView from "../props/towerPlayerView";

const styles = StyleSheet.create({
    image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%'
  },
  button: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    right: '5%',
    width: '25%',
    height: '5%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15
  },
  buttonText: {
    fontFamily: 'OptimusPrincepsSemiBold',
    color: '#E2DFD2',
    fontSize: 18,
    textAlign: 'center',
    },
});

function SpyCam() {
  const context = useContext(playerContext)
  const {player}= context

  const listContext = useContext(playerListContext);

  const {playerList, setPlayerList} = listContext;

  const [isShowingTowerList, setIsShowingTowerList] = useState(false);

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
      <GenericButton/>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if(isShowingTowerList)
          {
            setIsShowingTowerList(false);
          }
          else
          {
            setIsShowingTowerList(true);
          }
        }}
      >
        <Text style={styles.buttonText}>Show {isShowingTowerList ? 'Lab List' : 'Tower List'}</Text>
      </TouchableOpacity>
      <Image source={require("./../assets/tasks.png")} style={styles.image}/>
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView overScrollMode="always" style={{height: '100%', marginTop: '8%'}}>
            {playerList.map( (elem, i) =>  {
              if(!isShowingTowerList)
              {
                return PlayerView(elem, i)
              }
              else
              {
                return TowerPlayerView(elem, i);
              }
            })}
          </ScrollView>  
        </SafeAreaView>
      </SafeAreaProvider>
      </>
  );
  }
   
}
export default SpyCam