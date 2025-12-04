import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { usePlayerStore } from "../gameStore";
import mapStyle from './../mapStyle.json'
import socketIO from '../socketIO';
import { Text } from 'react-native-gesture-handler';
import treasure from '../assets/icons/treasure.png';
import { ArtifactDistances } from '../interfaces/PlayerInterface'

export default function Swamp() {
  const player = usePlayerStore(state => state.player);

  const position = usePlayerStore(state => state.position);

  const setPosition = usePlayerStore(state => state.setPosition);

  const artifactsDB = usePlayerStore(state => state.artifactsDB)

  const artifactsDistances = usePlayerStore(state => state.artifactsDistances)

  const setArtifactsDistances = usePlayerStore(state => state.setArtifactsDistances)

  const [playerInRange, setPlayerInRange] = useState<Boolean>(false);

  const [closestArtifact, setClosestArtifact] = useState<ArtifactDistances | null>(null)

  const uploadCoordinates = () => {
    const socket = socketIO.getSocket();

    if (!socket || !position) {
      return;
    }

    console.log("sending message...");

    const messageToUpload = { playerEmail: player?.email, latitude: position?.coords.latitude, longitude: position?.coords.longitude };
    socket.emit("sendCoordinates", messageToUpload);

    console.log("Message sent");

  }

  const confirmArtifactCollected = (artifactID: String) => {
    const socket = socketIO.getSocket();

    console.log("sending message....")

    socket?.emit("ArtifactCollected", artifactID)

    console.log("Message Sent")
  }

  const tryLowAccuracy = () => {
    Geolocation.getCurrentPosition(info => setPosition(info), undefined, { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 });
  }

  function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {

    const R = 6371000; // Earth's radius in meters
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }
  useEffect(() => {
    Geolocation.getCurrentPosition(info => setPosition(info), tryLowAccuracy, { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 });
    uploadCoordinates();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(info => {
        setPosition(info);
        uploadCoordinates();

        if (artifactsDB?.length > 0) {
          const artifactsdistances: ArtifactDistances[] = artifactsDB.map(artifact => ({
            id: artifact.artifactID,
            distance: getDistanceInMeters(
              info.coords.latitude,
              info.coords.longitude,
              artifact.latitude,
              artifact.longitude
            )
          }));
          setArtifactsDistances(artifactsdistances);
          console.log("new distances", artifactsdistances);

        }
      }, tryLowAccuracy, { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 });
    }, 2000);

    return () => clearInterval(interval);
  }, [position, artifactsDB]);


  const playerArtifactsRangeHandler = () => {
    if (artifactsDistances.length === 0) {
      setPlayerInRange(false);
      setClosestArtifact(null);
      return;
    }

    const artifactsInRange = artifactsDistances.filter(a => a.distance <= 10);

    if (artifactsInRange.length === 0) {
      setPlayerInRange(false);
      setClosestArtifact(null);
      return;
    }

    setPlayerInRange(true);

    const closest = artifactsInRange.reduce((prev, curr) =>
      curr.distance < prev.distance ? curr : prev
    );

    setClosestArtifact(closest);
  };


  useEffect(() => {

    playerArtifactsRangeHandler()

  }, [artifactsDistances])

  if (player !== null && position !== null) {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }}
          >
            <Image
              source={{ uri: player.avatar }}
              style={{ width: 50, height: 50 }}
            />
          </Marker>
          {artifactsDB.map((artifact, i) => (
            <React.Fragment key={i}>
              <Marker
                coordinate={{
                  latitude: artifact.latitude,
                  longitude: artifact.longitude,
                }}
                title={artifact.artifactName}
              >
                <Image
                  source={treasure}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </Marker>
              <Circle
                center={{
                  latitude: artifact.latitude,
                  longitude: artifact.longitude,
                }}
                radius={10} // meters
                strokeColor="rgba(0, 150, 255, 0.9)"
                strokeWidth={2}
                fillColor="rgba(0, 150, 255, 0.2)"
              />
            </React.Fragment>
          ))}
        </MapView>

        {playerInRange && closestArtifact && <TouchableOpacity style={styles.buttonContainer} onPress={() => confirmArtifactCollected(closestArtifact.id)}>
          <Text style={styles.buttonText}>Collect Artifact</Text>
        </TouchableOpacity>}
      </View>
    );
  }
  else {
    console.log("map not loaded");
    return (<></>)
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '10%',
    left: '12.5%',
    width: '75%',
    height: '10%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  buttonText: {
    fontSize: 32,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});