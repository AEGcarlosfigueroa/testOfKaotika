import { Image, ScrollView, View, StyleSheet, StatusBar, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useState, useContext } from "react";
import { playerContext, playerListContext } from "../context";
import PlayerView from "../props/playerView";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { GenericButton } from "../props/genericButton";
import TowerPlayerView from "../props/towerPlayerView";
import { Player } from "../interfaces/interfaces";
import { useWindowDimensions } from "react-native";
import labImage from './../assets/tasks.png'
import towerImage from './../assets/settings.png'



function SpyCam() {

   const {height, width, scale, fontScale} = useWindowDimensions();

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
    fontSize: 25,
    textAlign: 'center',
    },
   title: {
      fontSize: 30*fontScale,
      marginBottom: '5%',
      marginTop: '25%',
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5%',
      textAlign: 'center'
      // elevation: 2
    }, 
    title2: {
      fontSize: 40*fontScale,
      marginBottom: '5%',
      marginTop: '15%',
      color: '#E2DFD2',
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 2, height: 4 },
      textShadowRadius: 4,
      fontFamily: 'OptimusPrincepsSemiBold',
      boxShadow: '5px 5px 5px 5px black',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5%',
      textAlign: 'center',
      position: 'absolute',
      alignSelf: 'center'
      // elevation: 2
    },
});
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
      <Text style={styles.title}>SPYCAM</Text>
      </>

      
    )
  }
  else
  {
     return (
      <>
      <GenericButton/>
      <Text style={styles.title2}>{isShowingTowerList ? 'TOWER ACCESS' : 'LAB ACCESS LOG'}</Text>
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
      <Image source={isShowingTowerList ? towerImage : labImage} style={styles.image}/>
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView overScrollMode="auto" style={{height: '75%', marginTop: '30%'}}>
            {playerList.map( (elem: typeof Player, i: Number) =>  {
              if(!isShowingTowerList)
              {
                return PlayerView(elem, i)
              }
              else
              {
                return TowerPlayerView(elem, i);
              }
            })}
            {/* <View style={{height: 0.6*height, position: 'relative'}}></View> */}
          </ScrollView>  
        </SafeAreaView>
      </SafeAreaProvider>
      </>
  );
  }
   
}
export default SpyCam