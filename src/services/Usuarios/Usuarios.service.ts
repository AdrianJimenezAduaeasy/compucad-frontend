import { User } from "../../pages/Private/Usuarios/UsuariosPage";
import { getToken } from "../../utilities";
import { getIpServer } from "../../utilities";
const baseUrl = getIpServer(); 
const list = baseUrl + '/user/get';

const token = getToken();

export const getUsers = async () => {
    try {
        const response = await fetch(list, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error en la autenticación:', error);
        throw error; // Lanzamos el error para que sea manejado en el componente
    }
};
export const updateUser = async (
    id: number,
    firstname: string,
    lastName: string,
    email: string,
    accountStatus: boolean,
    role: number,
    image: string
) => {
    try {
        const response = await fetch(baseUrl + '/user/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id, firstname, lastName, email, accountStatus, image, role }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const textResponse = await response.text(); // Obtener la respuesta como texto

        try {
            // Intentar parsear la respuesta a JSON
            const data = JSON.parse(textResponse);
            return data;
        } catch (error) {
            // Si no es JSON válido, retornar el texto como mensaje de error
            return { message: textResponse, success: false };
        }

    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanzar el error para que se maneje en el componente
    }
};
export const singup = async (user: User) => {
    try {
        const response = await fetch(baseUrl + '/user/singup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response;
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanzar el error para que se maneje en el componente
    }
};

export const forgotPassword = async (email: string, telefono: string) => {
    try {
        const response = await fetch(baseUrl + '/user/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'            },
            body: JSON.stringify({ email, telefono }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response;
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanzar el error para que se maneje en el componente
    }
};

export const getMyUser = async (tok: string) => {
    try {
        const response = await fetch(baseUrl + '/user/getMyUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanzar el error para que se maneje en el componente
    }
};

export const getUserByRole = async (role: string) => {
    try {
        const response = await fetch(baseUrl + '/user/getUsersByRole/'+ role, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}
