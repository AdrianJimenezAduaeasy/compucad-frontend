import { ProcesoCreate } from "../../models/Procesos/Proceso.model";
import { createProceso, deleteProceso, updateProceso } from "../../services/Procesos/Procesos.service";

export async function fetchPostCreateProceso(formvalues: any): Promise<any> {
    try {
        const ProcesoCreateData: ProcesoCreate = {
            nombre: formvalues.nombre,
            descripcion: formvalues.descripcion,
            documents: formvalues.documents,
            solicitudProceso: formvalues.solicitudProceso,
        }
        const data: any = await createProceso(ProcesoCreateData);
        return data;
    } catch (error) {
        console.error('Error al crear la Solicitud:', error);
        throw error; 
    }
}

export async function fetchPostUpdateProceso(formvalues: any): Promise<any> {
    try {
        const ProcesoUpdateData: ProcesoCreate = {
            nombre: formvalues.nombre,
            descripcion: formvalues.descripcion,
            documents: formvalues.documents,
            solicitudProceso: formvalues.solicitudProceso,
        }
        const data: any = await updateProceso(ProcesoUpdateData, formvalues.id);
        return data;
    } catch (error) {
        console.error('Error al crear la Solicitud:', error);
        throw error;
    }
}

export async function fetchPostDeleteProceso(id: string): Promise<any> {
    try {
        const data: any = await deleteProceso(id);
        return data;
    } catch (error) {
        console.error('Error al crear la Solicitud:', error);
        throw error;
    }
}