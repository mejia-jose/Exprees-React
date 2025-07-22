import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useRef, useState } from 'react';
import { FormControlLabel, Stack, Box, TextField, Checkbox } from '@mui/material';
import type { IUseStateForm } from '../types/components/form.type';

export default function Form() {

    const [formData, setFormData] = useState<IUseStateForm>({
        name: '',
        lastname: '',
        username: '',
        birthdate: null,
        hasPassport: false,
        age: 0
    });

    const formRef = useRef(null);
    
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' } }}
            noValidate
            autoComplete="off"
            ref={formRef}
        >
            <Stack spacing={2}>
                <TextField
                    fullWidth
                    label="Nombre"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                    fullWidth
                    label="Apellidos"
                    id="lastname"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                />
                <TextField
                    fullWidth
                    label="Nombre de usuario"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker sx={{ width:'97%', p:1}}
                        label="Fecha de nacimiento"
                        value={ formData.birthdate }
                        
                        onChange={(newValue) => setFormData({ ...formData, birthdate: newValue})}
                    />
                </LocalizationProvider>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.hasPassport}
                            onChange={(e) => setFormData({ ...formData, hasPassport: e.target.checked })}
                        />
                    }
                    label="¿Tiene pasaporte?"
                />
                <TextField
                    fullWidth
                    label="Edad"
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                />
            </Stack>
        </Box>
    );
}
