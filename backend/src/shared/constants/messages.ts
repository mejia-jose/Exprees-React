export const UserMessages =
{
   ERROR:
   {
     NOT_FOUND: 'Error, el usuario no se encuentra registrado.',
     ERROR_CREATE: 'Ha ocurrido un error y no ha sido posible guardar la información del usuario.',
     ERROR_OPERATION_SAVE: 'Error en la operación save: ',
     ERROR_OPERATION_LIST_USERS: 'Ha ocurrido un error y no fue posible obtener el listado de usuarios.',
     ERROR_GENERAL: 'Errores de validación, por favor debe ingresar información en campo uno de los campos.',
     ERROR_PAGINATION: 'Los parametrós de paginación deben ser mayores a 0.',
     ID_IS_REQUIRED: 'El ID del usuario no es válido, por favor proporcione un ID válido.',
     ERROR_UPDATE: 'Ha ocurrido un error y no ha sido posible actualizar la información del usuario.',
     ERROR_DELETE: 'Ha ocurrido un error y no ha sido posible eliminar la información del usuario.',
     ERROR_USERNAME_EXIST: 'El nombre de usuario ya se encuentra asociado a otra persona.',
     ERROR_AGE: 'La edad ingresada no coincide con la fecha de nacimiento.'
   },

   SUCCESS:
   {
     CREATE_OK: 'El usuario se ha creado correctamente.',
     USERS_FOUND: 'Listado de usuarios obtenido exitosamente.',
     NO_INFORMATION: 'No se encontraron usuarios registrados.',
     UPDATE_OK: 'La información del usuario fue actualizada correctamente.',
     DELETE_OK: 'El usuario fue eliminado correctamente.',
   }
}