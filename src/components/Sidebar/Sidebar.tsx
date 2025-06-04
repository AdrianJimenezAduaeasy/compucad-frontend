import { useState } from 'react';
import Logout from '../Logout/Logout';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';

// MUI Components
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<any>({});
  const userState = useSelector((store: AppStore) => store.user);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleSubMenu = (button: string) => {
    setOpenSubMenus((prev: any) => ({ ...prev, [button]: !prev[button] }));
  };

  const routes = [
    {
      button: "Menu",
      route: "/private/Dashboard",
      icon: <GridViewIcon />,
      subItems: [] 
    },
    ...(userState.role === 'Administrador' ? [{
      button: "Procesos",
      route: "/private/procesos",
      icon: <AssignmentTurnedInIcon />,
      subItems: [
        { button: "ver Solicitudes", route: "/private/procesos/solicitudes-proceso", icon: <GridViewIcon /> },
        { button: "Ver Procesos", route: "/private/procesos/procesos", icon: <GridViewIcon /> }
      ]
     }] : []),
  ];

  return (
    <Box sx={{ display: 'flex', maxHeight: '100vh', overflow: 'hidden' }}>
      {/* AppBar Superior */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${isSidebarOpen ? 250 : 64}px)` },
          height: 54,
          ml: { sm: `${isSidebarOpen ? 250 : 64}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          {false &&
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        }

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1}}>
            COMPUCAD
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src="../../../public/img/Logo.jpg" />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        variant="permanent"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': { 
            width: isSidebarOpen ? 250 : 64, 
            transition: 'width 0.2s ease',
            overflowX: 'hidden',
            bgcolor: 'background.paper'
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            justifyContent: isSidebarOpen ? 'flex-start' : 'center' // Centrar cuando está cerrada
          }}>

            {isSidebarOpen && (

              <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Typography variant="h6">Hola, {userState.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {userState.role}
                </Typography>
              </Box>
            )}
            <IconButton 
              onClick={toggleSidebar}
              sx={{
                transform: isSidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.7s ease',
                marginLeft: isSidebarOpen ? 0 : 'auto'
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
          </Box>

          {/* Lista de rutas */}
          <List>
            {routes.map((item, index) => (
              <div key={index}>
                <ListItem disablePadding>
                  <ListItemButton 
                    sx={{
                      justifyContent: isSidebarOpen ? 'initial' : 'center', // Centrar íconos cuando está cerrada
                      px: 2.5,
                      minHeight: 48,
                    }}
                    onClick={() => {
                      if (isSidebarOpen && item.subItems.length > 0) {
                        toggleSubMenu(item.button);
                      } else {
                        navigate(item.route);
                      }
                    }}
                  >
                    <ListItemIcon 
                      sx={{
                        minWidth: 0,
                        mr: isSidebarOpen ? 3 : 'auto', // Ajustar margen cuando está cerrada
                        justifyContent: 'center'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <>
                        <ListItemText primary={item.button} />
                        {item.subItems.length > 0 && (
                          <>{openSubMenus[item.button] ? <ExpandLess /> : <ExpandMore />}</>
                        )}
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
                
                {isSidebarOpen && item.subItems.length > 0 && (
                  <Collapse in={openSubMenus[item.button]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          sx={{ pl: 4 }}
                          onClick={() => navigate(subItem.route)}
                        >
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                          <ListItemText primary={subItem.button} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </List>

          {/* Footer */}
          <Box sx={{ mt: 'auto', textAlign: 'center'}}>
            <Logout compact={!isSidebarOpen} />
          </Box>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box
  component="main"
  sx={{
    flex: 1,
    p: 3,
    marginTop: '50px', // Ajuste para el AppBar

    marginLeft: {
      xs: `${isSidebarOpen ? 250 : 0}px`,
      sm: `${isSidebarOpen ? 250 : 0}px`,
      md: `${isSidebarOpen ? 250 : 0}px`,
      lg: `${isSidebarOpen ? 250 : 0}px`,
      xl: `${isSidebarOpen ? 200 : 0}px`,
    },
    transition: (isSidebarOpen
      ? 'margin-left 0.2s ease, width 0.2s ease'
      : 'margin-left 0.2s ease'),
  }}
>
  {/* Tu contenido aquí */}
</Box>
    </Box>
  );
}