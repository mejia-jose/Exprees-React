import { DataGrid, GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import Paper from '@mui/material/Paper';
import moment from 'moment';
// @ts-ignore
import 'moment/locale/es';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { useGetUsers } from '../hooks/useGetUser';
import Loanding from '../../share/Layout/Loanding';
import { useEffect, useState } from 'react';
import { CustomDialog } from './CustomDialog';
import { deleteUserByID } from '../services/delete-user.service';
import CustomAlerts from './CustomAlerts';
import { Box } from '@mui/material';
import type { DataTableProps } from '../types/components/datatable.type';
import type { IPropsAlert } from '../types/components/alert.type';

moment.locale('es');

const DataTable: React.FC<DataTableProps> = ({ refresh,onEditUser,setRefreshTable }) => {

  /**Se definen las columnas de la tabla **/
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', flex:1, minWidth: 150, headerClassName: 'custom-header'},
    { field: 'lastname', headerName: 'Apellidos', flex:1, minWidth: 150, headerClassName: 'custom-header'},
    { field: 'username', headerName: 'Nombre de usuario', flex:1, minWidth: 150, headerClassName: 'custom-header' },
    { field: 'birthday', headerName: 'Fecha de nacimiento', flex:1, minWidth: 150, type:'string', headerClassName: 'custom-header',
      valueGetter: (value) => moment(value).format('LL'),
    },
    { field: 'hasPassport', headerName: '¿Tiene pasaporte?', flex:1, minWidth: 150, type:'boolean',headerClassName: 'custom-header',
      renderCell: (params) => {
        const value = params.value;
        return value ? (
          <CheckCircleIcon sx={{ color: 'green' }} />
        ) : (
          <CancelIcon sx={{ color: 'red' }} />
        );
      }
     },
    { field: 'age', headerName: 'Edad',type: 'number',flex:1, minWidth: 40,align:'center', headerClassName: 'custom-header',
      valueGetter : (value) => value + ' años'
     },
    { field: 'registeredAt',headerName: 'Registrado el',flex:1, minWidth: 150, type:'dateTime',headerClassName: 'custom-header',
      valueGetter: (value) => new Date(value),
    },
    { field: 'actions', headerName: 'Acciones', flex:1, minWidth: 120, type: 'actions',align:'center',headerClassName: 'custom-header',
      getActions: (params) =>
      [
        <GridActionsCellItem
          icon={ <EditIcon sx={{ color: 'blue' }}/> }
          label='Edit'
          color="primary"
          onClick={ () => onEditUser(params.row) }
        />,
        <GridActionsCellItem
          icon={ <DeleteIcon sx={{ color: 'red' }}/>}
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
  const [alert, setAlert] = useState<IPropsAlert | null>(null);

  /** Hook para el listado de usuarios **/
  const {users, loanding, refetch} = useGetUsers();
  const { records } = users;
  const paginationModel = { page: 0, pageSize: 7 };

  /** Permite abrir el modal de eliminar usuario **/
  const openModalConfirmDelete = (id: string) =>
  {
    setOpenModalDetete(true);
    setIdUser(id);
  };

  useEffect(() => {
    if (refresh) {
      refetch();
      setRefreshTable(false);
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
    <Paper sx={{ height: '600px', overflow: 'auto' }}>
     <Box>
      { alert && <CustomAlerts type={alert?.type} text={alert?.text} /> }

      <DataGrid
        rows={records}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5,10.25]}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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