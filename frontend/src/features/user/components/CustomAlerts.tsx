import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import type { IPropsAlert } from '../types/components/alert.type';

const CustomAlerts: React.FC<IPropsAlert> = ({type, text}) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={type}>{ text }</Alert>
    </Stack>
  );
};

export default CustomAlerts;
