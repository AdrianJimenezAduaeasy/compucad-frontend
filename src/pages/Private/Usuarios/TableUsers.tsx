import React, { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Button, Box, Chip, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
//import UpdateUser from './Register/UpdateUser';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: string;
  accountStatus: boolean;
  image?: string | null; // Asegúrate de tener el campo image si lo manejas
}

interface TableUsersProps {
  users: User[];
}

const TableUsers: React.FC<TableUsersProps> = ({ users } ) => {
  //const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const handleEditClick = (user: User) => {
  //  setSelectedUser(user);
    console.log(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  //  setSelectedUser(null);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'image',
      headerName: 'Imagen',
      width: 80,
      renderCell: (params) => (
        <img
          src={params.row.image ? `data:image/jpeg;base64,${params.row.image}` : `/img/userIcon.png`}
          alt="Usuario"
          style={{ width: 50, height: 50, borderRadius: '50%' }}
        />
      ),
    },
    { field: 'firstname', headerName: 'Nombres', flex: 1 },
    { field: 'lastname', headerName: 'Apellidos', flex: 1 },
    { field: 'email', headerName: 'Correo', flex: 2 },
    { field: 'phoneNumber', headerName: 'Teléfono', flex: 1 },
    {      field: 'role',
      headerName: 'Rol',
      width: 120,
      valueFormatter: (params: any) => `${params.name}`,
    },
    {
      field: 'accountStatus',
      headerName: 'Estatus',
      width: 90,
      renderCell: (params) =>
        params.row.accountStatus ? (
          <Chip label="Activo" color="success" variant="outlined" />
        ) : (
          <Chip label="Inactivo" color="error" variant="outlined" />
        ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEditClick(params.row)}
          >
          <EditIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box className="mx-8">

      <Box sx={{ width: '100%', paddingTop:1, paddingBottom:1}}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          className="bg-white"
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1976d2',
              color: 'black',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'normal',
            },
          }}
        />
      </Box>
      {/* Modal para editar el usuario */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 , borderRadius: 5}}>
          {/*selectedUser && <UpdateUser address={''} createDate={''} changePassword={false} {...selectedUser} image={selectedUser.image ?? null} />*/}
        </Box>
      </Modal>
    </Box>
  );
};

export default TableUsers;
