import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

const DeleteDialog = ({ open, name, handleClose, handleDelete }) => {
  return (
    <Dialog
      data-testid="dialogDelete"
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Delete {name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to delete this {name}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete} data-testid="btnDelete">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DeleteDialog);
