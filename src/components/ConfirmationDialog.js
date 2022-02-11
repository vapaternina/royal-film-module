import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog(props) {
  const { deleteConfirmation, open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>
        {"¿Eliminar película permanentemente?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          ¿Desea eliminar esta película? Tenga en cuenta que esta acción no se
          puede revertir.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={deleteConfirmation} autoFocus color='error'>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
