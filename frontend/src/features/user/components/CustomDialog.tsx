import Button from '@mui/material/Button';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useTheme, useMediaQuery} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

import type { IPropsDialog } from '../types/components/dialog.type';
import Form from './Form';

export const CustomDialog: React.FC<IPropsDialog> = ({openModal, close, action ,nameButton, color, title,fullWidth}) =>
{
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
   return (
      <Dialog open={openModal} onClose={close} fullWidth={fullWidth} fullScreen={fullScreen}
      maxWidth="sm"
      sx= {{
          maxHeight: '100vh',
          overflowY: 'auto',
      }}>
        <DialogTitle>{ title } </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
               nameButton === 'Guardar' &&( <Form />)
            }
          </DialogContentText>
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