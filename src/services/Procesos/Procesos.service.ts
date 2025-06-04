import { ProcesoCreate } from "../../models/Procesos/Proceso.model";
import { getToken } from "../../utilities";
import { getIpServer } from "../../utilities";
const baseUrl = getIpServer(); 

const list = baseUrl + '/procesos/';


const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
};

export const getAllDTO = async () => {
    try {
      const response = await fetch(list + "findAll", {
        method: 'GET',
        headers: headers
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };

export const createProceso = async (proceso: ProcesoCreate) => {
    try {
      const response = await fetch(list + "create", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(proceso)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }

export const updateProceso = async (proceso: ProcesoCreate, id: string) => {
    try {
      const response = await fetch(list + "update/"+ id, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(proceso),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }

export const getProcesoById = async (id: string) => {
    try {
      const response = await fetch(list + "findById/" + id, {
        method: 'GET',
        headers: headers
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }


export const deleteProceso = async (id: string) => {
    try {
      const response = await fetch(list + "delete/" + id, {
        method: 'DELETE',
        headers: headers
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }
