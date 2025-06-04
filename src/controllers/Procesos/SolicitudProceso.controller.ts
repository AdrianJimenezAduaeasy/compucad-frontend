import { solicitudProcesoCreate, solicitudProcesoUpdate } from "../../models/Procesos/SolicitudProceso.model";
import { aprobarSolicitudProceso, createSolicitudProceso, deleteSolicitudProceso, updateSolicitudProceso } from "../../services/Procesos/SolicitudProceso.service";

export async function fetchPostCreateSolicitudProceso(formvalues: any): Promise<any> {
    try {
        const solicitudProcesoData: solicitudProcesoCreate = {
            tipoArea: formvalues.tipoArea,
            descripcion: formvalues.descripcion,
            fechaEstimacion: formvalues.fechaEstimacion,
            retroalimentacion: formvalues.retroalimentacion,
            documents: formvalues.documents
        }
        const data: any = await createSolicitudProceso(solicitudProcesoData);
        return data;
    } catch (error) {
        console.error('Error al crear la Solicitud:', error);
        throw error; 
    }
}

export async function fetchPostUpdateSolicitudProceso(formvalues: any): Promise<any> {
    try {
        const solicitudProcesoData: solicitudProcesoUpdate = {

            tipoArea: formvalues.tipoArea,
            descripcion: formvalues.descripcion,
            fechaEstimacion: formvalues.fechaEstimacion,
            retroalimentacion: formvalues.retroalimentacion,
            documents: formvalues.documents,
            estadoSolicitud: formvalues.estadoSolicitud
        }
        const data: any = await updateSolicitudProceso(solicitudProcesoData, formvalues.id);
        return data;
    } catch (error) {
        console.error('Error al crear la Solicitud:', error);
        throw error;
    }
}

export async function fetchPostDeleteSolicitudProceso(id: string): Promise<any> {
    try {
        const data: any = await deleteSolicitudProceso(id);
        return data;
    } catch (error) {
        console.error('Error al crear la Solicitud:', error);
        throw error;
    }
}

export async function fetchPostAprobarSolicitudProceso(id: string): Promise<any> {
    try {
        const data: any = await aprobarSolicitudProceso(id);
        return data;
    } catch (error) {
        console.error('Error al crear la Solicitud:', error);
        throw error;
    }
}
