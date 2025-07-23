import { Container,Button,Box, useMediaQuery, useTheme } from '@mui/material';
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
    setRefreshTable,
    requestFailed,
    formRef,
    userEdit
  } = useUserForms();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',flexWrap: 'wrap',gap: 2,mb: 2}}>
        <Box>
          <Titles text='Gestión de usuarios'/>
        </Box>
        
        <Box>
          <Button
          variant="contained"
          color="primary"
          fullWidth={isMobile}
          startIcon={<AddBoxIcon/> }
          sx={{ float: 'right', mb:2,minWidth:200,  backgroundColor: '#1976d2',borderRadius: '8px' }}
          onClick={ () => openModalType('add')}
        >
          Añadir nuevo usuario
        </Button>
        </Box>
      </Box>

      { alert && messages && <CustomAlerts type={alert?.type} text={alert?.text} /> }

      <Box sx={{ height: '600px', width: '100%', overflow: 'auto' }}>
         <DataTable refresh={refreshTable} setRefreshTable={setRefreshTable} onEditUser={(userEdit) => openModalType('edit', userEdit)}/> 
      </Box>

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
            userEdit= {userEdit}
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