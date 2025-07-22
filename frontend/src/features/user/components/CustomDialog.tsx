import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface IPropsDialog
{
    openModal: boolean;
    close: () => void;
    confirmDelete: () => void;
    nameButton: string,
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    title: string;
    //icon: string
}

export const CustomDialog: React.FC<IPropsDialog> = ({openModal, close, confirmDelete ,nameButton, color, title}) =>
{
   return (
      <Dialog open={openModal} onClose={close}>
        <DialogTitle>{ title } </DialogTitle>
        <DialogActions>
            <Button onClick={close}>Cancelar</Button>
            <Button onClick={confirmDelete} color={color} variant="contained">
               { nameButton }
            </Button>
        </DialogActions>
    </Dialog>
   )
}