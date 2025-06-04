import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import SelectField from "../../../../components/Form/SelectField";
import InputField, { InputFieldTextArea } from "../../../../components/Form/InputField";
import FileField from "../../../../components/Form/FileField";
import { formatDate } from "../../../../utilities";
import { solicitudProcesoCreate, solicitudProcesoUpdate } from "../../../../models/Procesos/SolicitudProceso.model";
import { getSolicitudProcesoById } from "../../../../services/Procesos/SolicitudProceso.service";


interface solicitudProcesoProps {
  solicitudProceso?: any; 
}

export interface solicitudProcesosRef {
  getFormValues: () => solicitudProcesoCreate;
}

const UpdateSolicitudProceso = forwardRef<solicitudProcesosRef, solicitudProcesoProps>(
  ({ solicitudProceso = {} }, ref) => {
    const [tipoArea, setTipoArea] = useState<string>("PROCESOS");
    const [documentos, setDocumentos] = useState<any[]>(solicitudProceso.documents.map((document: any) => document.id)  || []);
    const [documentosFile] = useState<any[]>(solicitudProceso.documents || []);
    const [descripcion, setDescripcion] = useState<string>(" ");
    const [retroalimentacion, setRetroalimentacion] =useState<string>(" ");
    const [fecha, setFecha] = useState(formatDate(new Date(solicitudProceso?.loadDateTime || new Date()))); 
    const [Aprobacion, setAprobacion] = useState<boolean>( false);
    const [estadoSolicitud, setEstadoSolicitud] = useState<string>(solicitudProceso.estadoSolicitud || "PENDIENTE");

    const opcionesEstado = [
      { value: "PENDIENTE", label: "PENDIENTE" },
      { value: "PENDIENTE_EVALUACION", label: "PENDIENTE_EVALUACION" },
      ...(Aprobacion === true
        ? [{ value: "FINALIZADA", label: "FINALIZADA" }]
        : []),
      { value: "RECHAZADA", label: "RECHAZADA" }
    ];

    const setValue = (solicitudProcesoData: any) =>  {
        setTipoArea(solicitudProcesoData.tipoArea);
        setDescripcion(solicitudProcesoData.descripcion);
        setRetroalimentacion(solicitudProcesoData.retroalimentacion);
        setFecha(formatDate(new Date(solicitudProcesoData.fechaEstimacion)));
        setEstadoSolicitud(solicitudProcesoData.estadoSolicitud);
        setAprobacion(solicitudProcesoData.aprobacion);
        
    }

            useEffect(() => {
                const fetchData = async () => {
                    try {
                        const [solicitudData] = await Promise.all([
                            getSolicitudProcesoById(solicitudProceso.id),
                        ]);
                        setValue(solicitudData);
    
                    } catch (err) {
                        console.error("Error fetching data:", err);
                    }
                };
                fetchData();
            }, []);

        useImperativeHandle(ref, () => ({
           getFormValues:  (): solicitudProcesoUpdate => {
            return  {
              id: solicitudProceso.id,
              tipoArea,
              fechaEstimacion: new Date(fecha).toISOString(),
              documents: documentos,
              descripcion,
              retroalimentacion,
              estadoSolicitud,
            }
          }
        }));
    return ( 
      <div className="p-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        </div>
        <form  className="space-y-6 text-black dark:text-white">
          <div className="grid grid-cols-2 gap-3  sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
            <SelectField
                id="area"
                label="Area"
                value={tipoArea}
                setValue={setTipoArea}
                options={[
                  { value: "PROCESOS", label: "PROCESOS" },
                  { value: "DESARROLLO", label: "DESARROLLO" },
                  { value: "ADMINISTRACION", label: "ADMINISTRACION" },
                  { value: "COMPRAS", label: "COMPRAS" },
                  { value: "RH", label: "RH" }
                ]}
                required
            />
            <SelectField
                id="estadoSolicitud"
                label="Estado de la Solicitud"
                value={estadoSolicitud}
                setValue={setEstadoSolicitud}
                options={opcionesEstado}
                required
            />

            
            <InputField
              id="fecha"
              label="Fecha Estimada"
              type="date"
              value={fecha}
              setValue={setFecha}
            />

            <FileField
                id="documentos"
                label="Documentos"
                value={documentos}
                setValue={setDocumentos}
                fileIconsOld={documentosFile}
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
            <InputFieldTextArea
                id="retroalimentacion"
                label="Retroalimentacion"
                type="text"
                value={retroalimentacion}
                setValue={setRetroalimentacion}
                required
                min={0}
                maxLength={500}
            />
          </div>
        </form>
      </div>
    );
  }
);

export default UpdateSolicitudProceso;