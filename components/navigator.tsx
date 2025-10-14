import * as React from 'react';
import IstvanNav from './istvanNav';
// import villanoNav from './villanoNav';
// import mortimerNav from './mortimerNav';
import AcolitoNav from './acolitoNav';
import playerContext from '../context';

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
      return <IstvanNav player={player} />

    case 'ACOLITO':
    return  <AcolitoNav player={player} />

    default:
      return null;

  }
}

export default Navigator;
