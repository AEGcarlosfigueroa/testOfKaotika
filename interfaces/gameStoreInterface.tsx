import { Player, ArtifactsDB } from './interfaces';
import { GeolocationResponse } from '@react-native-community/geolocation';

export interface PlayerStore {
    player: Player | null;
    setPlayer: (player: Player | null) => void;

    mapView: boolean | null;
    setMap: (mapView: boolean | null) => void;

    isInTower: boolean | null;
    setIsInTower: (isInTower: boolean | null) => void;

    playerList: Player[];
    setPlayerList: (playerList: Player[]) => void;

    scrollState: number | null;
    setScrollState: (scrollState: number | null) => void;

    position: GeolocationResponse | null;
    setPosition: (position: GeolocationResponse | null) => void;

    artifactsDB: ArtifactsDB | null;
    setArtifacts: (artifactsDB: ArtifactsDB | null) => void;

}

