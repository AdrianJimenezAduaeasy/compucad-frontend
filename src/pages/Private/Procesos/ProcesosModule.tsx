
import { PrivateRoutes } from '../../../models';

import MainPageModule from '../Module/MainPageModule';
import { useState } from 'react';
import Procesos from './Procesos';
import SolicitudProcesos from './SolicitudProcesos';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


interface FlotillasPageProps {
  focusedSubModule?: string;
}

function ProcesosModule(focusedSubModule: FlotillasPageProps) {

  const [submoduleSelected] = useState<string>(focusedSubModule.focusedSubModule || "Procesos");


  return (
    <div>
        <MainPageModule  title="Procesos" subModules={[{name:"Procesos", icon:<AssignmentTurnedInIcon/>, url:PrivateRoutes.PROCESOSPROSESOS, component:<Procesos/>}, {name:"Solicitudes Procesos", icon:<AssignmentIcon/>,url:PrivateRoutes.PROCESOSSOLICITUDESPROCESO, component:<SolicitudProcesos/>}]} focusedSubModule={submoduleSelected} />
    </div>
  );
}

export default ProcesosModule;
