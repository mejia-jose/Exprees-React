import Header from '../Layout/Header';
//import Footer from '../layouts/Footer';

import { Box, Typography, Button, Container } from '@mui/material';

/** Página para mostrar en caso de contenido no encontrado a nivel de URLS **/
const NotFound = () => {

  return (
    <Box>
      <Header text='Bienvenido(a)'/>

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h1" color="error" fontWeight="bold">
            404
          </Typography>

          <Typography variant="h5" fontWeight="600" mt={2}>
            Página no encontrada
          </Typography>

          <Typography variant="body1" color="text.secondary" mt={1}>
            Lo sentimos, la página que estás buscando no existe.
          </Typography>

          <Button
            href="/"
            variant="contained"
            sx={{ mt: 3, backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#1e40af' } }}
            //startIcon={<IconComponent size={18} />}
          >
            Volver al inicio
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default NotFound;
