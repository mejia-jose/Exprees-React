import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FormControlLabel, Stack, Box, TextField, Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid';

import type { FormProps, IUserFormPropierties} from '../types/components/form.type';
import { createUser } from '../services/create-user.service';
import { updateDataUser } from '../services/update-user.service';

const InitialStateForm : IUserFormPropierties =
{
  id: '',
  name: '',
  lastname: '',
  username: '',
  birthdate: null,
  hasPassport: false,
  age: 0,
}

const Form = React.forwardRef<HTMLFormElement,FormProps>(({type, onSuccess, onError, userEdit}, ref) => {

    /** Permite manejar el estado del formulario */
    const [formData, setFormData] = useState<IUserFormPropierties>(InitialStateForm);  

    /** Se setean los campos en el formulario cuando es edición **/
    useEffect(() =>
    {
        if(userEdit && userEdit.id && type === 'update')
        {
            const user = 
            {
                id: userEdit.id,
                name: userEdit.name,
                lastname: userEdit.lastname,
                username: userEdit.username,
                birthdate: moment(userEdit.birthday),
                hasPassport: userEdit.hasPassport,
                age: userEdit.age
            }
            setFormData(user)
        }else
        {
            setFormData(InitialStateForm)
        }
    }, [userEdit]);
    

    /**Permite consumir el servicio que envia la información del usuario a la api y registrarla **/
    const saveUser = async (event: React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        const newFormData = { ...formData, birthdate: formatDate(formData.birthdate) };
        const { id, ...payload } = newFormData;
        const result = await createUser(payload);
        
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

    /** Permite calcular la edad en base a la fecha de nacimiento **/
    const calculateAge = (birthdate: string) =>
    {
       const birth = new Date(birthdate);  
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birth.getFullYear();
        const monthDiff = currentDate.getMonth() - birth.getMonth();
        const dayDiff = currentDate.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    }

    /**Permite consumir el servicio que envia la información del usuario a la api y actualizarla **/
    const updateUser = async (event: React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        const updateFormData = { ...formData, birthdate: formatDate(formData.birthdate) };
        const update = await updateDataUser(updateFormData);
        
        if(update.success)
        {
            if (onSuccess && update?.messages) {
                onSuccess(update.messages);
            }
        }else
        {
            if (onError && update?.messages) {
                onError(update.messages);
            }
        }
    }

    return (
        <Box
            component="form"
            sx={{ width: '100%' }}
            noValidate
            autoComplete="off"
            ref={ref}
            onSubmit={ type === 'save' ? saveUser : updateUser }
        >
            <Grid container spacing={2}>

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
                    <DatePicker sx={{ width:'100%'}}
                        label="Fecha de nacimiento"
                        value={ formData.birthdate }
                        onChange={(newValue) => {
                            if (newValue) {
                                const birthdateFormat = moment(newValue).format('YYYY-MM-DD');
                                const age = calculateAge(birthdateFormat);
                                setFormData({ ...formData, birthdate: newValue, age });
                            }
                        }}
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
                    disabled
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                />
            </Grid>
        </Box>
    );
});

export default Form;