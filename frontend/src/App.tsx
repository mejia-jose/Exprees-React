import { LocalizationProvider } from '@mui/x-date-pickers'
import './App.css'
import AppRouter from './routes/Router'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

function App() {
  return(
    <LocalizationProvider dateAdapter={AdapterMoment}>
       <AppRouter/>
    </LocalizationProvider>
  )
}

export default App
