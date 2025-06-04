import { StoredFile } from "../GoogleCloud/StoredFile";
import { solicitudProcesoGet } from "./SolicitudProceso.model";

export interface ProcesoCreate {
    nombre: string;
    descripcion: string;
    documents: number[];
    solicitudProceso: string;
}

export interface ProcesoUpdate {
    id?: string;
    nombre: string;
    descripcion: string;
    documents: number[];
    solicitudProceso: string;
}

export interface ProcesoGet {
    id: string;
    nombre: string;
    descripcion: string;
    documents: StoredFile[];
    solicitudProceso: solicitudProcesoGet;
}