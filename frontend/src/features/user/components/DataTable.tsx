import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import moment from 'moment';

import { useGetUsers } from '../hooks/get-users.hooks';
import Loanding from '../components/Loanding';

moment.locale('es');

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'lastname', headerName: 'Last name', width: 130 },
  { field: 'username', headerName: 'User name', width: 150 },
  { field: 'birthday', headerName: 'Birthday', width: 130, type:'string',
    valueGetter: (value) => moment(value).format('LL'),
  },
  { field: 'hasPassport', headerName: 'Has Passport', width: 150, type:'boolean' },
  { field: 'age', headerName: 'Age',type: 'number',width: 40 },
  { field: 'registeredAt',headerName: 'Registered at',width: 180, type:'dateTime',
    valueGetter: (value) => new Date(value),
  },
  { field: 'actions', headerName: 'Actions', width: 80,}
];

export default function DataTable() {

  const {users, loanding} = useGetUsers();
  const { total, pageNumber,pageElements, records } = users;
  const paginationModel = { page: pageNumber, pageSize: pageElements };

  if(loanding)
  {
    return <Loanding/>;
  }

  return (
    <Paper sx={{ height: 480, width: '100%' }}>
      <DataGrid
        rows={records}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        /* checkboxSelection */
        sx={{ border: 0 }}
      />
    </Paper>
  );
}