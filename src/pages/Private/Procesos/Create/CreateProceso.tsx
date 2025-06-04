import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import SelectField from "../../../../components/Form/SelectField";
import InputField, { InputFieldTextArea } from "../../../../components/Form/InputField";
import FileField from "../../../../components/Form/FileField";
import { solicitudProcesoGet } from "../../../../models/Procesos/SolicitudProceso.model";
import { ProcesoCreate } from "../../../../models/Procesos/Proceso.model";
import { getSolcicitudesDisponibles } from "../../../../services/Procesos/SolicitudProceso.service";


interface ProcesoProps {
    proceso?: any;
}

export interface ProcesosRef {
    getFormValues: () => ProcesoCreate;
}

const CreateProceso = forwardRef<ProcesosRef, ProcesoProps>(
    ({ proceso = {} }, ref) => {
        const [documentos, setDocumentos] = useState<any[]>([]);
        const [descripcion, setDescripcion] = useState<string>("");
        const [nombre, setNombre] = useState<string>("");
        const [solicitudProceso, setSolicitudProceso] = useState<string>("")
        const [solicitudes, setSolicitudes] = useState<solicitudProcesoGet[]>([]);
        console.log(proceso)


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const [solicitudesData] = await Promise.all([
                        getSolcicitudesDisponibles(),
                    ]);
                    setSolicitudes(solicitudesData);
                    setSolicitudProceso(solicitudesData[0]?.id || 0)
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            };
            fetchData();
        }, []);

        useImperativeHandle(ref, () => ({
            getFormValues: (): ProcesoCreate => {
                return {
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
                            options={
                                Array.isArray(solicitudes)
                                  ? solicitudes.map((solicitud) => ({
                                      value: solicitud.id,
                                      label: `${solicitud.folio} - ${solicitud.tipoArea}`,
                                    }))
                                  : []
                              }
                            required
                        />



                        <FileField
                            id="documentos"
                            label="Documentos"
                            value={documentos}
                            setValue={setDocumentos}
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

export default CreateProceso;