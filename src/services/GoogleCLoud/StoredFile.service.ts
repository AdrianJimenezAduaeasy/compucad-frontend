import { getToken } from "../../utilities";
import { getIpServer } from "../../utilities";
const baseUrl = getIpServer(); 

const list = baseUrl + '/StoredFile/';


const headers = {
  'Authorization': `Bearer ${getToken()}`
};

export const uploadFiles = async (files: File[]) => {
    try {
      const response = await fetch(list + "uploadFiles", {
        method: 'POST',
        headers: headers,
        body: (() => {
          const formData = new FormData();
          files.forEach(file => formData.append('file', file));
          return formData;
        })(),
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
  };

export const deleteFile = async (id: number) => {
    try {
      const response = await fetch(list + "deleteFile/" + id, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
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