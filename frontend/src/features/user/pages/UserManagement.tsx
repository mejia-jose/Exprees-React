import { Container,Button,Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import DataTable from '../components/DataTable';
import Titles from '../components/Titles';

/** Componente principal de la gestión de usuarios **/
function UserManagement() {
 
  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Titles text='Gestión de usuarios'/>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBoxIcon/> }
          sx={{ float: 'right', mb:2,minWidth:200 }}
        >
          Añadir nuevo usuario
        </Button>
      </Box>

      <DataTable/> 
    </Container>
  );
}

export default UserManagement;