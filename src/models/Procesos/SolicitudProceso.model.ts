import { StoredFile } from "../GoogleCloud/StoredFile";
import { UserDTO } from "../user.model";

export interface solicitudProcesoCreate {
    descripcion: string;
    tipoArea: string;
    fechaEstimacion: string;
    retroalimentacion: string;
    documents: number[];
} 

export interface solicitudProcesoUpdate {
    id?: string;
    descripcion: string;
    tipoArea: string;
    fechaEstimacion: string;
    retroalimentacion: string;
    documents: number[];
    estadoSolicitud: string;
}

export interface solicitudProcesoGet {
    id: string;
    descripcion: string;
    tipoArea: string;
    fechaEstimacion: string;
    estadoSolicitud: string;
    folio: string;
    aprobado: boolean;
    fechaAprovacion: string;
    retroalimentacion: string;
    documents: StoredFile[];
    createDate: string;
    lastUpdateDate: string;
    userCreate: UserDTO;
    userUpdate: UserDTO;
    asigned: UserDTO;
}