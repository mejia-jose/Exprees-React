import { DataGrid, GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useGetUsers } from '../hooks/useGetUser';
import Loanding from '../components/Loanding';
import { useEffect, useState } from 'react';
import { CustomDialog } from './CustomDialog';
import { deleteUserByID } from '../services/delete-user.service';
import CustomAlerts from './CustomAlerts';
import { Box } from '@mui/material';
import type { DataTableProps } from '../types/components/datatable.type';

moment.locale('es');

const DataTable: React.FC<DataTableProps> = ({ refresh,onEditUser }) => {

  /**Se definen las columnas de la tabla **/
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', flex:1, minWidth: 150,},
    { field: 'lastname', headerName: 'Apellidos', flex:1, minWidth: 150 },
    { field: 'username', headerName: 'Nombre de usuario', flex:1, minWidth: 150 },
    { field: 'birthday', headerName: 'Fecha de nacimiento', flex:1, minWidth: 150, type:'string',
      valueGetter: (value) => moment(value).format('LL'),
    },
    { field: 'hasPassport', headerName: '¿Tiene pasaporte?', flex:1, minWidth: 150, type:'boolean' },
    { field: 'age', headerName: 'Edad',type: 'number',flex:1, minWidth: 40,align:'center' },
    { field: 'registeredAt',headerName: 'Registrado en',flex:1, minWidth: 150, type:'dateTime',
      valueGetter: (value) => new Date(value),
    },
    { field: 'actions', headerName: 'Acciones', flex:1, minWidth: 100, type: 'actions',align:'center',
      getActions: (params) =>
      [
        <GridActionsCellItem
          icon={ <EditIcon/>}
          label='Edit'
          color="primary"
          onClick={ () => onEditUser(params.row) }
        />,
        <GridActionsCellItem
          icon={ <DeleteIcon/>}
          label='Delete'
          color="inherit"
          onClick={ () => openModalConfirmDelete(params.row.id) }
        />
      ]
    }
  ];

  /** Estado del modal de eliminar usuario **/
  const [openModalDelete, setOpenModalDetete] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<string>('');

  /** Maneja el estado de las alertas **/
  const [alert, setAlert] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  /** Hook para el listado de usuarios **/
  const {users, loanding, refetch} = useGetUsers();
  const {pageNumber,pageElements, records } = users;
  const paginationModel = { page: pageNumber, pageSize: pageElements };

  /** Permite abrir el modal de eliminar usuario **/
  const openModalConfirmDelete = (id: string) =>
  {
    setOpenModalDetete(true);
    setIdUser(id);
  };

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh]);

  /** Permite realizar el llamado al método que realiza la peticioon del eliminar usuario al backend **/
  const deleteUser = async (idUser: string) =>
  {
    const result = await deleteUserByID(idUser);
    if(result) 
    {
      setAlert({ type: "success", text: "El usuario se ha eliminado correctamente" });
      refetch();
    } else {
      setAlert({ type: "error", text: "No se pudo eliminar el usuario" });
    }

    setTimeout(() => {setAlert(null)}, 5000);
  }

  if(loanding)
  {
    return <Loanding/>;
  }

  return (
    <Paper sx={{ height: 'auto',  overflowX: 'auto' }}>
     <Box sx={{ minWidth: 600 }}>
      { alert && <CustomAlerts type={alert?.type} text={alert?.text} /> }

      <DataGrid
        rows={records}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5,10.25]}
        /* checkboxSelection */
        sx={{ border: 0 }}
      />

      { openModalDelete && (
          <CustomDialog
            openModal={openModalDelete}
            close={ () => setOpenModalDetete(false)}
            title='¿Estás seguro de eliminar este usuario?'
            color ='error'
            nameButton = 'Eliminar'
            action={ () =>{
              if(idUser){ deleteUser(idUser); }
                setOpenModalDetete(false);
              }
            }
          />
        )
      }
      </Box>
    </Paper>
  );
}
export default DataTable;