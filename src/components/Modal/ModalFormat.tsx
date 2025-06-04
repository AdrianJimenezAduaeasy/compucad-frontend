import { Alert, Button, Modal, Snackbar, Typography } from '@mui/material';
import React, { useRef } from 'react';

// Definir una interfaz genérica para la referencia expuesta por cualquier formulario
export interface FormRef<T> {
  getFormValues: () => T; // Método para obtener los valores del formulario
}

interface ModalFormatProps<T> {
  status: boolean; 
  tittle: string; 
  onClose: () => void; 
  object: any; 
  content: React.ReactElement<{ ref: React.RefObject<FormRef<T>>; [key: string]: any }>; 
  method: (formValues: T) => void;
}

const ModalFormat = <T,>({ status, tittle, onClose, object, content, method }: ModalFormatProps<T>) => {
  const formRef = useRef<FormRef<T>>(null); 
  const [actionFlag, setActionFlag] = React.useState(false);
  const [errorFlag, setErrorFlag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const actionSave = async (): Promise<void> => {
    if (formRef.current) {
      setLoading(true);
      const formValues = {id: object.id, ...formRef.current.getFormValues() };
      //console.log(formValues);
      const res: any = await method(formValues);
      //console.log(res);
      if (res === 200) {
        setLoading(false);
        setActionFlag(true);
        onClose();
      }else {
        setErrorFlag(true);
        setLoading(false);
      }
      
    }
  };

  return (
    <>
    <Modal
      open={status}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg flex flex-col"
        style={{
          width: '95%', // Ancho por defecto para móviles
          maxWidth: '700px',
          minHeight: '95vh', // Ancho máximo para pantallas grandes
          maxHeight: '95vh', // Altura máxima
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Encabezado fijo */}
        <div 
          className="rounded-tl-md rounded-tr-md bg-gray-600 p-4"
          style={{
            flexShrink: 0 
          }}
        >
          <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 'bold' }}>
            {tittle}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'white' }}>
            Registro: {object.id ? object.id : 'Nuevo'}
          </Typography>
        </div>

        {/* Contenido con scroll */}
        <div 
          className="flex-1 p-4"
          style={{
            overflowY: 'auto', // Scroll vertical cuando sea necesario
            flex: '1 1 auto', // Ocupa el espacio disponible
          }}
        >
          {React.cloneElement(content, { ref: formRef, actividad: object })}
        </div>

        {/* Pie de página fijo */}
        <div 
          className="flex justify-end gap-4 p-2 border-t-2"
          style={{
            flexShrink: 0 
          }}
        >
          <Button variant="contained" color="error" onClick={onClose} disabled={loading}>
            Cerrar
          </Button>
          <Button variant="contained" color="success" onClick={actionSave} disabled={loading}>
            Guardar
          </Button>
        </div>
      </div>
    </Modal>
          <Snackbar
            open={actionFlag}
            autoHideDuration={6000}
            onClose={() => setActionFlag(false)}
          >
            <Alert severity="success" variant="filled" onClose={() => setActionFlag(false)}>
              Accion completada.
            </Alert>
          </Snackbar>
          <Snackbar
            open={errorFlag}
            autoHideDuration={6000}
            onClose={() => setErrorFlag(false)}
          >
            <Alert severity="error" variant="filled" onClose={() => setErrorFlag(false)}>
              Error al completar la acción.
            </Alert>
          </Snackbar>
    </>
  );
};

export default ModalFormat;