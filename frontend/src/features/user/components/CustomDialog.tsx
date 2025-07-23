import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import type { IPropsDialog } from '../types/components/dialog.type';
import Form from './Form';

export const CustomDialog: React.FC<IPropsDialog> = (props) =>
{
   const {openModal, close, action ,nameButton, color, type, title, formRef, onSuccess, onError, userEdit} = props
   const typeAction = type === 'add' ? 'save' : 'update' ;

   return (
      <Dialog open={openModal} onClose={close} fullWidth maxWidth="sm">
        <DialogTitle>{ title } </DialogTitle>
        <DialogContent>
         {
            typeAction && nameButton !== "Eliminar" &&( 
               <Form 
                  ref={formRef} 
                  type={typeAction} 
                  onSuccess={onSuccess} 
                  onError={onError}
                  userEdit={userEdit}
               />
            )
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