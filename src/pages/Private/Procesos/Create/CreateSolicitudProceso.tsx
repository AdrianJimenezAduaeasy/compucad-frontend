import { useState, forwardRef, useImperativeHandle } from "react";
import SelectField from "../../../../components/Form/SelectField";
import InputField, { InputFieldTextArea } from "../../../../components/Form/InputField";
import FileField from "../../../../components/Form/FileField";
import { formatDate } from "../../../../utilities";
import { solicitudProcesoCreate } from "../../../../models/Procesos/SolicitudProceso.model";


interface solicitudProcesoProps {
  solicitudProceso?: any; 
}

export interface solicitudProcesosRef {
  getFormValues: () => solicitudProcesoCreate;
}

const CreateSolicitudProceso = forwardRef<solicitudProcesosRef, solicitudProcesoProps>(
  ({ solicitudProceso = {} }, ref) => {
    const [tipoArea, setTipoArea] = useState<string>("PROCESOS");
    const [documentos, setDocumentos] = useState<any[]>([]);
    const [descripcion, setDescripcion] = useState<string>("");
    const [retroalimentacion, setRetroalimentacion] =useState<string>("");
    const [fecha, setFecha] = useState(formatDate(new Date(solicitudProceso?.loadDateTime || new Date()))); 

        useImperativeHandle(ref, () => ({
           getFormValues:  (): solicitudProcesoCreate => {
            return  {
              tipoArea,
              fechaEstimacion: new Date(fecha).toISOString(),
              documents: documentos,
              descripcion,
              retroalimentacion,
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

export default CreateSolicitudProceso;