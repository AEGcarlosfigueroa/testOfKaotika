import * as React from 'react';
import IstvanNav from './istvanNav';
// import villanoNav from './villanoNav';
import MortimerNav from './mortimerNav';
import AcolitoNav from './acolitoNav';
import {playerContext} from '../context';
import LabNav from './labNav';
// import mapNav from './mapNav'

function Navigator ()
{
  const context = React.useContext(playerContext)

  const {player} = context


  if(!context)
  {
    throw new Error ("Navigator must be inside the provider")
  }
  if(!player)
  {
    return null;
  }
  
  switch (player.profile.role)
  {
    case 'ISTVAN':
      return <IstvanNav/>

    case 'ACOLITO':
      if(player.isInside)
      {
        return <LabNav/>
      }

      else
      {
        return  <AcolitoNav/>
      }

    case 'MORTIMER': 
        return <MortimerNav/>

    default:
      return null;

  }
}

export default Navigator;
