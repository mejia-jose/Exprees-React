import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DataTable from '../features/user/pages/UserManagement';
import '../App.css';
import '../index.css';

/** Permite manejar las rutas de la aplicación **/
function AppRouter() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
     <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<DataTable />} />
          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </div> 
  );
}
export default AppRouter;