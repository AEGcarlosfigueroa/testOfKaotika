import { Player, ArtifactsDB } from './PlayerInterface';
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

    artifactsDB: ArtifactsDB[];
    setArtifacts: (artifactsDB: ArtifactsDB[]) => void;

    positionList: CoordinateEntry[];
    setPositionList: (positionList: CoordinateEntry[]) => void;

    playerNartifactsPos: number | null;
    setPlayerNartifactsPos: (playerNartifactsPos: number | null) => void;


}

interface CoordinateEntry {
    email: string,
    latitude: number,
    longitude: number
}

