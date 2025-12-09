import { create } from 'zustand'
import { PlayerStore } from './interfaces/gameStoreInterface'
import { Player } from './interfaces/PlayerInterface'

export const usePlayerStore = create<PlayerStore>((set) => ({

    player: null,
    setPlayer: (player) => set({ player }),

    mapView: null,
    setMap: (mapView) => set({ mapView }),

    isInTower: false,
    setIsInTower: (isInTower) => set({ isInTower }),

    playerList: [],
    setPlayerList: (playerList) => set({ playerList }),

    scrollState: null,
    setScrollState: (scrollState) => set({ scrollState }),

    position: null,
    setPosition: (position) => set({ position }),

    artifactsDB: [],
    setArtifacts: (artifactsDB) => set({ artifactsDB }),

    positionList: [],
    setPositionList: (positionList) => set({ positionList }),

    artifactsDistances: [],
    setArtifactsDistances: (artifactsDistances) => set({ artifactsDistances }),

    obituaryState: null,
    setObituaryState: (obituaryState) => set({ obituaryState }),

    canShowArtifacts: false,
    setCanShowArtifacts: (canShowArtifacts) => set({ canShowArtifacts })
}))

export const obituaryStateList = {
    locked: 0,
    evaluating: 1,
    unlocked: 2
}

export const scrollStateList = {
    uncollected: 0,
    collected: 1,
    destroyed: 2
}
