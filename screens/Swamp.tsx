import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { usePlayerStore } from "../gameStore";
import mapStyle from './../mapStyle.json'
import { serverURL } from '../App';

export default function Swamp()
{
    const player = usePlayerStore(state => state.player);

    const position = usePlayerStore(state => state.position);
    const setPosition = usePlayerStore(state => state.setPosition);

    const artifacts = usePlayerStore(state => state.player)

    const setArtifacts = usePlayerStore(state => state.setArtifacts)

    const tryLowAccuracy = () => {
        Geolocation.getCurrentPosition(info => setPosition(info), undefined, { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 });
    }

    useEffect(() => {
    const fetchArtifactsDB = async () => {
      try {
        const response = await fetch(`${serverURL}/api/artifacts/all`);
        const data = await response.json();
        setArtifacts(data);
        console.log("all artifacts acquired:", data);
      } catch (error) {
        console.log("Error fetching artifacts:", error);
      }
    };
    fetchArtifactsDB();
    }, []);

    useEffect(() => {
        Geolocation.getCurrentPosition(info => setPosition(info), tryLowAccuracy, { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 });
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            Geolocation.watchPosition(info => setPosition(info));
        }, 200)
        console.log("position updated!");
        return () => clearInterval(interval);
    }, []);

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
    if(player !== null && position !== null)
    {
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
                 <Marker image={{uri: player.avatar}} coordinate={{latitude: position?.coords.latitude, longitude: position?.coords.longitude}}>
                     <Image source={{uri: player.avatar}}/>
                 </Marker>
              </MapView>
            </View>
             )
    }
    else
    {
        console.log("map not loaded");
        return (<></>)
    }
    
}