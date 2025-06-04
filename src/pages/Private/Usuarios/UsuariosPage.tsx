import { useEffect, useState } from 'react';
import TableUsers from './TableUsers';
import CardStadistics from '../../../components/CardStadistics/CardStadistics';
import { getUsers } from '../../../services/Usuarios/Usuarios.service';
import { Fab } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { PrivateRoutes } from '../../../models';
import { useNavigate } from 'react-router-dom';


export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  image: string | null;
  accountStatus: boolean;
  phoneNumber: string;
  address: string;
  password: string;
  role: {
    id: number;
    name: string;
    description: string;
  };
  createDate: string;
  changePassword: boolean;
}

function UsuariosPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: any[] = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const nav = () => {
    navigate(`/private/${PrivateRoutes.REGISTER}`, { replace: true });
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin  h-8 w-8 border-4 border-primary rounded-full border-t-transparent" role="status">
          </div>
        </div>
      ) : (
        <>
        <div className="flex m-auto">
        <h1 className="text-3xl font-bold mb-1 ml-8 text-black dark:text-white">Usuarios</h1>
        <Fab
        variant="circular"
        color="primary"
        sx={{
          height: '40px',
          width: '40px',
          marginLeft: '10px',
        }}
        className="bg-primary text-white hover:bg-primary-dark"
        onClick={nav}
      >
        <GridAddIcon />
      </Fab>
          </div>
        <div className='grid grid-cols-2 gap-4 mx-4'>
        <CardStadistics
         title='Roles' chartData={[
          {name:'Administradores',value:users.filter(user => user.role?.name === 'Administrator').length},
          {name:'Usuarios',value:users.filter(user => user.role?.name === 'User').length},
          {name:'Supervisor',value:users.filter(user => user.role?.name === 'Guest').length}
         ]}
          />
          <CardStadistics
          title="Estatus"
          chartData={[
            { name: 'Activos', value:users.filter(user => user.accountStatus).length },
            { name: 'Inactivos', value:users.filter(user => !user.accountStatus).length },
          ]}/>
      </div>
        <TableUsers users={users} />
        
        </>
      )}
    </div>
  );
}

export default UsuariosPage;
