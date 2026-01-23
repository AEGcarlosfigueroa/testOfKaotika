import React from "react";
import { angeloStateList, usePlayerStore } from "../gameStore";
import HallOfSages from "./HallOfSages";
import TrialWaitingRoom from "./TrialWaitingRoom";

export default function HallOfSagesDirectory()
{
    const angeloState = usePlayerStore(state => state.angeloState)

    if(angeloState === angeloStateList.angeloAwaitingTrial)
    {
        return <TrialWaitingRoom/>
    }
    else
    {
        return <HallOfSages/>
    }
}

