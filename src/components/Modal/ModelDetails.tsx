import { Modal, Button, Box } from "@mui/material";

export default function ModelDetails({ open, onClose, destajo }: any) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: 0 , borderRadius: 5}}>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Detalles del Destajo</h2>
        {destajo ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">ID:</p>
              <p className="text-lg text-gray-900">{destajo.id}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Fecha:</p>
              <p className="text-lg text-gray-900">{destajo.fecha}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Cajas:</p>
              <p className="text-lg text-gray-900">{destajo.cajas}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Pago:</p>
              <p className="text-lg text-gray-900">{destajo.paga}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center">No hay información disponible para este destajo.</p>
        )}
        <div className="mt-6 text-center grid grid-cols-2 gap-4">
          <Button variant="outlined" color="error" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </Box>
    </Modal>
    
  );
}
