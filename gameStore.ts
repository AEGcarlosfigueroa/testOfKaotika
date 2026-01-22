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
    setCanShowArtifacts: (canShowArtifacts) => set({ canShowArtifacts }),

    acolyteList: [],
    setAcolyteList: (acolyteList) => set({ acolyteList }),

    isProcessingStatusApplication: false,
    setIsProcessingStatusApplication: (isProcessingStatusApplication) => set({ isProcessingStatusApplication }),

    allPlayersList: [],
    setAllPlayersList: (allPlayersList) => set({ allPlayersList }),

    angeloState: null,
    setAngeloState: (angeloState) => set({ angeloState }),

    angeloCapturer: null,
    setAngeloCapturer: (angeloCapturer) => set({ angeloCapturer }),

    trialResult: { guilty: 0, innocent: 0 },
    setTrialResult: (trialResult) => set({ trialResult }),

    playersAuthorized: null,
    setPlayersAuthorized: (playersAuthorized) => set({playersAuthorized}),

    playersWhoHaveVoted: [],
    setPlayersWhoHaveVoted: (playersWhoHaveVoted) => set({ playersWhoHaveVoted })
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

export const deadlyEffects = {
    putridPlague: "0",
    epicWeakness: "1",
    medulaApocalypse: "2",
    ethaziumCurse: "3"
}

export const angeloStateList = {
    angeloCaptured: 0,
    angeloDelivered: 2,
    angeloFree: 3,
    angeloAwaitingTrial: 4,
    angeloInTrial: 5
}

export const states = {
    angeloState: angeloStateList.angeloFree,
    angeloCapturer: null as string | null,
}
