import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const YesNoDialog = (props) => {
  const { title, onYes, onNo, onClose, enable } = props;

  const [Open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog
      onClose={onClose}
      open={Open}
      onClose={onClose}
      disableEscapeKeyDown={!enable ? true : false}
      disableBackdropClick={!enable ? true : false}
    >
      <DialogTitle>{title ? title : ""}</DialogTitle>
      <DialogContent />
      <DialogActions>
        <Button variant="contained" onClick={onYes} color="primary" autoFocus>
          <b>Không</b>
        </Button>
        <Button variant="contained" onClick={onNo} color="primary">
          <b>Có</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default YesNoDialog;
