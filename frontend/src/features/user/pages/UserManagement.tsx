import { Container,Button,Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import DataTable from '../components/DataTable';
import Titles from '../components/Titles';

/** Componente principal de la gestión de usuarios **/
function UserManagement() {
 
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Titles text='Gestión de usuarios'/>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBoxIcon/> }
          sx={{ float: 'right', mb:2 }}
        >
          Añadir nuevo usuario
        </Button>
      </Box>

      <DataTable/> 
    </Container>

  );
}

export default UserManagement;