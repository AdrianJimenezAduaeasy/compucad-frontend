import { getIpServer } from "../utilities";
const baseUrl = getIpServer(); 
const login = baseUrl + '/user/login';

export const getUser = async (email: string, password: string): Promise<{ token: string;}> => {
    try {
        const response = await fetch(login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        return data; // Retorna el token directamente
    } catch (error) {
        console.error('Error en la autenticación:', error);
        throw error; // Lanzamos el error para que sea manejado en el componente
    }
};
