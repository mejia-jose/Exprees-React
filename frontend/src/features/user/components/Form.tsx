import React, { useState } from 'react';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FormControlLabel, Stack, Box, TextField, Checkbox } from '@mui/material';

import type { FormProps, IUseStateForm } from '../types/components/form.type';
import { createUser } from '../services/create-user.service';

const Form = React.forwardRef<HTMLFormElement,FormProps>(({type, onSuccess, onError}, ref) => {

    /** Permite manejar el estado del formulario */
    const [formData, setFormData] = useState<IUseStateForm>({
        name: '',
        lastname: '',
        username: '',
        birthdate: null,
        hasPassport: false,
        age: 0
    });  

    /**Permite consumir el servicio que envia la información del usuario a la api y registrarla **/
    const saveUser = async (event: React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        const newFormData = { ...formData, birthdate: formatDate(formData.birthdate) };
        const result = await createUser(newFormData);
        
        if(result.success)
        {
            if (onSuccess && result?.messages) {
                onSuccess(result.messages);
            }
        }else
        {
            if (onError && result?.messages) {
                onError(result.messages);
            }
        }
    }

    const formatDate = (date:moment.Moment | null) =>
    {
       return moment(date).format('YYYY-MM-DD');
    }

    const updateUser = () =>
    {

    }
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' } }}
            noValidate
            autoComplete="off"
            ref={ref}
            onSubmit={ type === 'save' ? saveUser : updateUser }
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
});

export default Form;