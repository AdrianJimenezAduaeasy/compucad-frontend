import React, { useState } from 'react';
import { User } from '../UsuariosPage';
import { TextField, Button, Typography, InputLabel, Select, MenuItem, FormControl, Box, Avatar, Snackbar, Alert } from '@mui/material';
import { updateUser } from '../../../../services/Usuarios/Usuarios.service';

function UpdateUser(user: User) {
    const [userData, setUserData] = useState<User>(user);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationSeverity, setNotificationSeverity] = useState<'success' | 'error'>('success');

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Usuario actualizado:', userData);

        updateUser(userData.id, userData.firstname, userData.lastname, userData.email, userData.accountStatus, userData.role.id, userData.image || '')
            .then((response) => {
                // Imprime la respuesta para verificar la estructura
                console.log('Respuesta de la API:', response);

                // Comprobamos si el mensaje indica éxito y ajustamos la notificación
                if (response && response.message.toLowerCase().includes('success')) {
                    setNotificationMessage(response.message);
                    setNotificationSeverity('success');
                } else {
                    setNotificationMessage(response.message || 'Error desconocido');
                    setNotificationSeverity('error');
                }
                setOpenSnackbar(true);
                window.location.reload();                
            })
            .catch((error) => {
                console.error('Error al actualizar el usuario:', error);
                setNotificationMessage('Error al actualizar el usuario');
                setNotificationSeverity('error');
                setOpenSnackbar(true);
            });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convertimos la imagen a base64 y la guardamos en el estado
                setUserData({ ...userData, image: reader.result?.toString().split(',')[1] || null });
                setImagePreview(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className='flex-row'>
            <Typography variant="h4" gutterBottom>
                Actualizar Usuario
            </Typography>
            <form onSubmit={handleUpdate} className='m-auto'>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userData.firstname}
                    sx={{ mt: 2, width: 360 }}
                    onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userData.lastname}
                    sx={{ mt: 2, width: 360, ml: 2 }}
                    onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                />
                <TextField
                    label="Correo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                
                <FormControl sx={{ mt: 2, width: 360 }} margin="normal">
                    <InputLabel id="status-label">Estado</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status-select"
                        value={userData.accountStatus}
                        label="Estado"
                        onChange={(e) => setUserData({ ...userData, accountStatus: e.target.value === "true" })}
                    >
                        <MenuItem value="true">Activo</MenuItem>
                        <MenuItem value="false">Inactivo</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2, width: 360, ml: 2 }} margin="normal">
                    <InputLabel id="role-label">Rol</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role-select"
                        value={userData.role.id}
                        label="Rol"
                        onChange={(e) => setUserData({ ...userData, role: {
                            id: Number(e.target.value),
                            name: '',
                            description: ''
                        } })}
                    >
                        <MenuItem value={3}>Administrador</MenuItem>
                        <MenuItem value={1}>Usuario</MenuItem>
                        <MenuItem value={2}>Invitado</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2, width: 360 }} margin="normal">
                    <input
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="image-input"
                    />
                    <label htmlFor="image-input">
                        <Button variant="outlined" component="span" fullWidth>
                            Subir Imagen
                        </Button>
                    </label>
                    {imagePreview && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <Avatar src={imagePreview} sx={{ width: 100, height: 100 }} />
                        </Box>
                    )}
                </FormControl>

                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                    Actualizar
                </Button>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={notificationSeverity} sx={{ width: '100%' }}>
                    {notificationMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default UpdateUser;
