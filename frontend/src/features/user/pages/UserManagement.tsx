import { Container,Button,Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import DataTable from '../components/DataTable';
import Titles from '../components/Titles';
import { CustomDialog } from '../components/CustomDialog';
import { useRef, useState } from 'react';
import CustomAlerts from '../components/CustomAlerts';

/** Componente principal de la gestión de usuarios **/
function UserManagement() {
 
  /** Manejo de estados del modal */
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
  const [fullWidth, setFullWidth] = useState<boolean>(false);

  /** Manejo de estados para los mensajes **/
  const [messages, setMessages] = useState<string>('');
  

  const [refreshTable, setRefreshTable] = useState(false);

  /** Maneja el estado de las alertas **/
  const [alert, setAlert] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  /** Permite abrir el modal **/
  const openModalNewUser = () =>
  {
    setOpenModalAdd(true);
    setFullWidth(true);
  }

  const requestSuccess = (msg: string) =>
  {
    setOpenModalAdd(false);
    setAlert({ type: "success", text: "El usuario ha sido creado correctamente" });
    setMessages(msg);
    setRefreshTable(prev => !prev);
    setTimeout(() => {setAlert(null)}, 5000);
  }

  const requestFailed = (msg: string) =>
  {
    setOpenModalAdd(false);
    setAlert({ type: "success", text: msg });
    setMessages(msg);
    setRefreshTable(false);
    setTimeout(() => {setAlert(null)}, 5000);
  }

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Titles text='Gestión de usuarios'/>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBoxIcon/> }
          sx={{ float: 'right', mb:2,minWidth:200 }}
          onClick={ openModalNewUser}
        >
          Añadir nuevo usuario
        </Button>
      </Box>

      { alert && messages && <CustomAlerts type={alert?.type} text={alert?.text} /> }

      <DataTable refresh={refreshTable}/> 

      { openModalAdd && (
          <CustomDialog
            openModal={openModalAdd}
            close={ () => setOpenModalAdd(false)}
            title='Registrar usuario'
            color ='primary'
            nameButton = 'Guardar'
            fullWidth={fullWidth}
            formRef={formRef}
            onSuccess={requestSuccess} 
            onError={requestFailed}
            action={ () =>{
              if (formRef.current) {
                formRef.current.requestSubmit(); 
              }
            }
            }
          />
        )
      }
    </Container>
  );
}

export default UserManagement;