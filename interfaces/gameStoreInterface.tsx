import { Player } from './interfaces';


export interface PlayerStore {

    player: typeof Player;

    setPlayer: (player: typeof Player) => void;

    mapView: Boolean | null;
    setMap: (mapView: Boolean | null) => void;

    isInTower: Boolean | null;
    setIsInTower: (isInTower: Boolean | null) => void;

    playerList: [];
    setPlayerList: (playerList: []) => void;

    scrollState: null;
    setScrollState: (scrollState: null) => void;

}

export interface mapViewStorage {
}


// export const usePlayerStore = create<PlayerStore | null>((set)=> ({
//     player: null,
//     setPlayer: (player) => set({ player }),

//     mapView: null,
//     setMap: (mapView) => set({mapView}),

//     isInTower: false,
//     setIsInTower: (isInTower) => set({isInTower}),

//     playerList: [],
//     setPlayerList: (playerList) => set({playerList}),

//     scrollState: null,
//     setScrollState: (scrollState) => set({scrollState})
