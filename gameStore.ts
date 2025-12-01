import { create } from 'zustand'
import { PlayerStore } from './interfaces/gameStoreInterface'
import { Player } from './interfaces/interfaces'

export const usePlayerStore = create<PlayerStore>((set)=> ({

    player : null,
    setPlayer: (player) => set({ player }),

    mapView: null,
    setMap: (mapView) => set({mapView}),

    isInTower: false,
    setIsInTower: (isInTower) => set({isInTower}),

    playerList: [],
    setPlayerList: (playerList) => set({playerList}),

    scrollState: null,
    setScrollState: (scrollState) => set({scrollState}),

    position: null,
    setPosition: (position) => set({position}),

    artifactsDB: null,
    setArtifacts: (artifactsDB) =>set({artifactsDB}),


    positionList: [],
    setPositionList: (positionList) => set({positionList})
}))
