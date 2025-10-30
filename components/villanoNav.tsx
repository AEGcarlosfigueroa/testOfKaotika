import { useContext } from "react";
import { View } from "react-native";
import { playerContext } from "../context";

const context = useContext(playerContext)
const {player} = context

function Villano ()
{
    if (player.profile.role === "ACOLITO")
    {
        <View></View>
    }
}