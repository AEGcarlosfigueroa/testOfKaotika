import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { usePlayerStore } from "../gameStore";
import mapStyle from './../mapStyle.json'

export default function Swamp()
{
    const [position, setPosition] = useState<GeolocationResponse | null>(null);
    

    const player = usePlayerStore(state => state.player);

    Geolocation.getCurrentPosition(info => setPosition(info));

    useEffect(() => {
        Geolocation.watchPosition(info => setPosition(info));
    })

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
        return (<></>)
    }
    
}