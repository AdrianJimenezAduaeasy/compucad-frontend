import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes } from "../../models"
import { RoutesWithNotFound } from "../../utilities";
import { lazy } from "react";
import ProcesosModule from "./Procesos/ProcesosModule";


const  Dashboard  = lazy(() => import('./Dashboard/Dashboard'))
const  UsuariosPage = lazy(() => import('./Usuarios/UsuariosPage'))
const  Register = lazy(() => import('./Usuarios/Register/Register'))


function Private() {
      return(
      <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD}/>}/>
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard/> }/>
      <Route path={PrivateRoutes.USUARIOS} element={<UsuariosPage/>}/>
      <Route path={PrivateRoutes.SINGUP} element={<Register/>}/>
      <Route path={PrivateRoutes.REGISTER} element={<Register/>}/>


      <Route path={PrivateRoutes.PROCESOS} element={<ProcesosModule/>}/>
      <Route path={PrivateRoutes.PROCESOSPROSESOS} element={<ProcesosModule focusedSubModule="Procesos"/>}/>
      <Route path={PrivateRoutes.PROCESOSSOLICITUDESPROCESO} element={<ProcesosModule focusedSubModule="Solicitudes Procesos"/>}/>
      </RoutesWithNotFound>
      );
}
export default Private