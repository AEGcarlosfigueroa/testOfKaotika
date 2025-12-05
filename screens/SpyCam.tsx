import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { StyleSheet, View, Image, ActivityIndicator, useWindowDimensions, StatusBar } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect } from 'react';
import { usePlayerStore } from "../gameStore";
import mapStyle from './../mapStyle.json';
import artifactImage0 from './../assets/artifacts/artifact0.png'
import artifactImage1 from './../assets/artifacts/artifact1.png'
import artifactImage2 from './../assets/artifacts/artifact2.png'
import artifactImage3 from './../assets/artifacts/artifact3.png'

const artifactImages = [
    artifactImage0,
    artifactImage1,
    artifactImage2,
    artifactImage3
  ]

function SpyCam() {

  const position = usePlayerStore(state => state.position);
  const setPosition = usePlayerStore(state => state.setPosition);

  const positionList = usePlayerStore(state => state.positionList);
  const playerList = usePlayerStore(state => state.playerList);

  const artifactsDB = usePlayerStore(state => state.artifactsDB);

  const { height } = useWindowDimensions();

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

  let artifactCollectedBar = <></>

  if(player?.profile.role === 'MORTIMER')
  {
    artifactCollectedBar = (
      <View style={styles.inventory}>
        {artifactsDB.map((elem, i: number) => {
          if(elem.isCollected)
          {
            return(
              <Image key={i} source={artifactImages[parseInt(elem.artifactID)]} style={styles.image}/>
            )
          }
        })}
      </View>
    );
  }

  if (player !== null && position !== null) {
    return (
      <>
      {artifactCollectedBar}
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
          {artifactsDB.map((artifact, i) => {
            if (!artifact.isCollected && player.profile.role === 'MORTIMER') {
              return (
                <React.Fragment key={i}>
                  <Marker
                    coordinate={{
                      latitude: artifact.latitude,
                      longitude: artifact.longitude,
                    }}
                    title={artifact.artifactName}
                  >
                    <Image
                      source={artifactImages[parseInt(artifact.artifactID)]}
                      style={{ width: 0.05*height, height: 0.05*height }}
                      resizeMode="contain"
                    />
                  </Marker>
                </React.Fragment>
              );
            }


            return <></>
          })}
        </MapView>
      </View>
      </>
    )
  }
  else {
    console.log("map not loaded");
    return (
        <View style={styles.fullScreen}>
          <ActivityIndicator size="large" style={styles.spinner} />
        </View>
    );
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
  fullScreen: {
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,1)'
  },
  spinner: {
    marginTop: '99%'
  },
  inventory: {
    height: '10%',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)', 
    zIndex: 20
  },
  image: {
    height: '75%',
    width: '15%',
    marginTop: '1%',
    resizeMode: 'contain'
  },
});