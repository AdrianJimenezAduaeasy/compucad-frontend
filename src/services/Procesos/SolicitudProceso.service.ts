import { solicitudProcesoCreate, solicitudProcesoUpdate } from "../../models/Procesos/SolicitudProceso.model";
import { getToken } from "../../utilities";
import { getIpServer } from "../../utilities";
const baseUrl = getIpServer(); 

const list = baseUrl + '/solicitudProceso/';


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

export const createSolicitudProceso = async (solicitudProceso: solicitudProcesoCreate) => {
    try {
      const response = await fetch(list + "create", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(solicitudProceso)
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

export const updateSolicitudProceso = async (solicitudProceso: solicitudProcesoUpdate, id: string) => {
    try {
      const response = await fetch(list + "update/"+ id, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(solicitudProceso),
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

export const getSolicitudProcesoById = async (id: string) => {
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


export const deleteSolicitudProceso = async (id: string) => {
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

export const aprobarSolicitudProceso = async (id: string) => {
    try {
      const response = await fetch(list + "aprobar/" + id, {
        method: 'PUT',
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

export const getSolcicitudesDisponibles = async () => {
    try {
      const response = await fetch(list + "disponibles", {
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