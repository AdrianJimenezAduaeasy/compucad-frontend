// SnackbarLocal.tsx
import { Alert, Snackbar } from '@mui/material'
import React from 'react'

type Props = {
  status: string;
  onClose: () => void;
};

function SnackbarLocal({ status, onClose }: Props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose(); // limpiar estado externo
  };

  if (status !== "success" && status !== "error") return null;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={status} variant="filled" onClose={handleClose}>
        {status === "success" ? "Acción completada." : "Error al completar la acción."}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarLocal;
