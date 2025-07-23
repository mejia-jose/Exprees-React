import { Container,Button,Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import DataTable from '../components/DataTable';
import Titles from '../components/Titles';
import { CustomDialog } from '../components/CustomDialog';
import CustomAlerts from '../components/CustomAlerts';
import { useUserForms } from '../hooks/useUserForms';

/** Componente principal de la gestión de usuarios **/
function UserManagement() {
 
  const { 
    openModal,
    modalType, 
    setOpenModal,
    fullWidth,
    messages,
    alert,
    refreshTable,
    openModalType,
    requestSuccess,
    requestFailed,
    formRef 
  } = useUserForms();

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Titles text='Gestión de usuarios'/>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBoxIcon/> }
          sx={{ float: 'right', mb:2,minWidth:200 }}
          onClick={ () => openModalType('add')}
        >
          Añadir nuevo usuario
        </Button>
      </Box>

      { alert && messages && <CustomAlerts type={alert?.type} text={alert?.text} /> }

      <DataTable refresh={refreshTable} onEditUser={() => openModalType('edit')}/> 

      { openModal && (
          <CustomDialog
            openModal={openModal}
            close={ () => setOpenModal(false)}
            title= { modalType === 'add' ? 'Registrar usuario' : 'Actualizar información'}
            color ='primary'
            type={modalType}
            nameButton = { modalType === 'add' ? 'Guardar' : 'Actualizar' }
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