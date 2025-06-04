import { BrowserRouter, Navigate, Route, useLocation } from 'react-router-dom'
import './App.css'
import { PrivateRoutes, PublicRoutes } from './models'
import { AuthGuard } from './guards'
import { Suspense, lazy  } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { RoutesWithNotFound } from './utilities'
import Sidebar from './components/Sidebar/Sidebar'
import ForgotPassword from './pages/Private/Usuarios/ForgotPassword'
import { Box, ThemeProvider } from '@mui/material'
import { theme } from '../ThemeSX'; // Importa el tema que creaste


const Login = lazy(() => import('./pages/Login/Login.tsx'));
const Private = lazy(() => import('./pages/Private/Private'));


function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Suspense fallback={<>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin  h-8 w-8 border-4 border-primary rounded-full border-t-transparent" role="status">
          </div>
        </div></>}>
      <Provider store={store} >
      <BrowserRouter>
      <ShowDashboard/>
      
      </BrowserRouter>
      </Provider>
      </Suspense>
    </div>
    </ThemeProvider>
  )
}

function ProtectedRoute() {
  return(
      <RoutesWithNotFound>
        <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE}/>} />
        <Route path={PublicRoutes.LOGIN} element={<Login/>}/> 
        <Route path={`${PublicRoutes.FORGOTPASSWORD}`} element={<ForgotPassword/>}/> 
        <Route element={<AuthGuard/>}>
           <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private/>}/>
        </Route>
      </RoutesWithNotFound>
  )
}

function ShowDashboard() {
  const location = useLocation();
  const isPrivateRoute = location.pathname.startsWith(`/${PrivateRoutes.PRIVATE}`);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Renderiza la Sidebar solo en rutas privadas */}
      {isPrivateRoute && <Sidebar />}

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          marginTop: `calc(0px + ${isPrivateRoute ? 38 : 0}px)`, // Ajuste condicional para el AppBar
          width: {
            xs: `calc(100% - ${isPrivateRoute ? 250 : 0}px)`,
            sm: `calc(100% - ${isPrivateRoute ? 250 : 0}px)`,
            md: `calc(100% - ${isPrivateRoute ? 250 : 0}px)`,
            lg: `calc(100% - ${isPrivateRoute ? 250 : 0}px)`,
            xl: `calc(100% - ${isPrivateRoute ? 250 : 0}px)`,
          },
          transition: (theme) =>
            theme.transitions.create(['margin-left', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <ProtectedRoute />
      </Box>
    </Box>
  );
}

export default App
