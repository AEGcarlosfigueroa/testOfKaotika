import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect } from 'react';
import { usePlayerStore } from "../gameStore";
import mapStyle from './../mapStyle.json'

function SpyCam() {

  const position = usePlayerStore(state => state.position);
  const setPosition = usePlayerStore(state => state.setPosition);

  const positionList = usePlayerStore(state => state.positionList);
  const playerList = usePlayerStore(state => state.playerList);

  const getAvatarImage = (email: string) => {
    for (let i = 0; i < playerList.length; i++) {
      const entry = playerList[i];
      if (entry.email === email) {
        return entry.avatar
      }
    }
    return " ";
  }

  const tryLowAccuracy = () => {
    Geolocation.getCurrentPosition(info => setPosition(info), undefined, { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 });
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setPosition(info), tryLowAccuracy, { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 });
  }, [positionList])

  const player = usePlayerStore(state => state.player);

  if (player !== null && position !== null) {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: position?.coords.latitude,
            longitude: position?.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {
            positionList.map((entry, i) => {
              const avatarImage = getAvatarImage(entry.email);
              if (avatarImage !== " ") {
                return (
                  <Marker key={i} image={{ uri: avatarImage }} coordinate={{ latitude: entry.latitude, longitude: entry.longitude }}>
                    <Image source={{ uri: avatarImage }} />
                  </Marker>
                )
              }

              return <></>

            })
          }
          {/* <Marker image={{uri: player.avatar}} coordinate={{latitude: position?.coords.latitude, longitude: position?.coords.longitude}}>
                     <Image source={{uri: player.avatar}}/>
                 </Marker> */}
        </MapView>
      </View>
    )
  }
  else {
    console.log("map not loaded");
    return (<></>)
  }

}
export default SpyCam;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});