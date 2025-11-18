import React from 'react'

export const playerContext = React.createContext()

export const mapContext = React.createContext()

export const isInTowerContext = React.createContext();

export const playerListContext = React.createContext();

export const scrollStateContext = React.createContext();

export const scrollStateList = {
    uncollected: 0,
    collected: 1,
    destroyed: 2
}