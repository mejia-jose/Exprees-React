import { CircularProgress, Box } from '@mui/material';

const Loanding = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f3f4f6"
    >
      <CircularProgress color="primary" size={60} thickness={5} />
    </Box>
  );
};

export default Loanding;
