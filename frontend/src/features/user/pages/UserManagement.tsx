import { Container,Button,Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import DataTable from '../components/DataTable';
import Titles from '../components/Titles';
import { CustomDialog } from '../components/CustomDialog';
import { useState } from 'react';

/** Componente principal de la gestión de usuarios **/
function UserManagement() {
 
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
  const [fullWidth, setFullWidth] = useState(false);
  
  const openModalNewUser = () =>
  {
    setOpenModalAdd(true);
    setFullWidth(true);
  }
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

      <DataTable/> 

      { openModalAdd && (
          <CustomDialog
            openModal={openModalAdd}
            close={ () => setOpenModalAdd(false)}
            title='Registrar usuario'
            color ='primary'
            nameButton = 'Guardar'
            fullWidth={fullWidth}
            action={ () =>{}
            
            }
          />
        )
      }
    </Container>
  );
}

export default UserManagement;