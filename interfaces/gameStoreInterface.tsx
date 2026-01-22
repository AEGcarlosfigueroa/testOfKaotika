import { Player, ArtifactsDB, ArtifactDistances } from './PlayerInterface';
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

    artifactsDistances: ArtifactDistances[]; // array of numbers
    setArtifactsDistances: (artifactsDistances: ArtifactDistances[]) => void; // function to update the array

    obituaryState: number | null;
    setObituaryState: (obituaryState: number | null) => void;

    canShowArtifacts: boolean;
    setCanShowArtifacts: (canShowArtifacts: boolean) => void;

    acolyteList: Player[],
    setAcolyteList: (acolyteList: Player[]) => void;

    isProcessingStatusApplication: boolean,
    setIsProcessingStatusApplication: (isProcessingStatusApplication: boolean) => void;

    allPlayersList: Player[],
    setAllPlayersList: (allPlayersList: Player[]) => void;

    angeloState: number | null,
    setAngeloState: (angeloState: number) => void

}




interface CoordinateEntry {
    email: string,
    latitude: number,
    longitude: number
}

