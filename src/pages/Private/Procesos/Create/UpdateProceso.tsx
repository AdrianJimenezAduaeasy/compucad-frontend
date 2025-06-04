import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import SelectField from "../../../../components/Form/SelectField";
import InputField, { InputFieldTextArea } from "../../../../components/Form/InputField";
import FileField from "../../../../components/Form/FileField";
import { solicitudProcesoGet } from "../../../../models/Procesos/SolicitudProceso.model";
import { ProcesoUpdate } from "../../../../models/Procesos/Proceso.model";
import { getSolcicitudesDisponibles } from "../../../../services/Procesos/SolicitudProceso.service";
import { getProcesoById } from "../../../../services/Procesos/Procesos.service";


interface ProcesoProps {
    proceso?: any;
}

export interface ProcesosRef {
    getFormValues: () => ProcesoUpdate;
}

const UpdateProceso = forwardRef<ProcesosRef, ProcesoProps>(
    ({ proceso = {} }, ref) => {
        const [documentos, setDocumentos] = useState<any[]>(proceso.documents.map((document: any) => document.id) || []);
        const [documentosFiles] = useState<any[]>(proceso.documents || []);
        const [descripcion, setDescripcion] = useState<string>(proceso.descripcion || " ");
        const [nombre, setNombre] = useState<string>(proceso.nombre || "");
        const [solicitudProceso, setSolicitudProceso] = useState<string>(proceso.solicitudProceso.id)
        const [solicitudes, setSolicitudes] = useState<solicitudProcesoGet[]>([]);
        console.log(proceso)


        const setValues = (procesoData: any) => {
            setDescripcion(procesoData.descripcion || " ");
            setNombre(procesoData.nombre || "");
            setSolicitudProceso(procesoData.solicitudProceso.id)
        }

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const [solicitudesData, procesoData] = await Promise.all([
                        getSolcicitudesDisponibles(),
                        getProcesoById(proceso.id)
                    ]);
                    setSolicitudes(solicitudesData);
                    setValues(procesoData);
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            };
            fetchData();
        }, []);

        useImperativeHandle(ref, () => ({
            getFormValues: (): ProcesoUpdate => {
                return {
                    id: proceso.id,
                    nombre,
                    descripcion,
                    documents: documentos,
                    solicitudProceso
                }
            }
        }));
        return (
            <div className="p-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                </div>
                <form className="space-y-6 text-black dark:text-white">
                    <div className="grid grid-cols-2 gap-3  sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
                        <InputField
                            id="nombre"
                            label="Nombre"
                            type="text"
                            value={nombre}
                            setValue={setNombre}
                            required
                            min={1}
                            maxLength={100}
                        />
                        <SelectField
                            id="solicitudProceso"
                            label="Solicitud Proceso"
                            value={solicitudProceso}
                            setValue={setSolicitudProceso}
                            options={[
                                ...solicitudes.map((solicitud) => ({
                                    value: solicitud.id,
                                    label: `${solicitud.folio} - ${solicitud.tipoArea}`,
                                })),
                                ...(proceso.solicitudProceso
                                    ? [{
                                        value: proceso.solicitudProceso.id,
                                        label: `${proceso.solicitudProceso.folio} - ${proceso.solicitudProceso.tipoArea}`
                                    }]
                                    : [])
                            ]}
                            required
                        />
                        <FileField
                            id="documentos"
                            label="Documentos"
                            value={documentos}
                            setValue={setDocumentos}
                            fileIconsOld={documentosFiles}
                        />
                        <InputFieldTextArea
                            id="descripcion"
                            label="Descripcion"
                            type="text"
                            value={descripcion}
                            setValue={setDescripcion}
                            required
                            min={0}
                            maxLength={1000}
                        />
                    </div>
                </form>
            </div>
        );
    }
);

export default UpdateProceso;