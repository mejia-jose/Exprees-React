import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {useTheme, useMediaQuery} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

import type { IPropsDialog } from '../types/components/dialog.type';
import Form from './Form';

export const CustomDialog: React.FC<IPropsDialog> = (props) =>
{
   const {openModal, close, action ,nameButton, color, type, title,fullWidth, formRef, onSuccess, onError} = props
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const typeAction = type === 'add' ? 'save' : 'update' ;

   return (
      <Dialog open={openModal} onClose={close} fullWidth={fullWidth} fullScreen={fullScreen}
      maxWidth="sm"
      sx= {{ maxHeight: '100vh', overflowY: 'auto'}}>
        <DialogTitle>{ title } </DialogTitle>
        <DialogContent>
           {
               typeAction && nameButton !== "Eliminar" &&( <Form ref={formRef} type={typeAction} onSuccess={onSuccess} onError={onError}/>)
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cancelar</Button>
            <Button onClick={action} color={color} variant="contained">
               { nameButton }
            </Button>
        </DialogActions>
    </Dialog>
   )
}