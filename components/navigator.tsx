import * as React from 'react';
import IstvanNav from './istvanNav';
// import villanoNav from './villanoNav';
// import mortimerNav from './mortimerNav';
import AcolitoNav from './acolitoNav';

function Navigator ({ player })
{
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
