import axios from "axios";

/** Permite consumir el endpoint que registra un usuario **/
export async function createUser(user: unknown):Promise<{success:boolean, messages: string}>
{
   try
   {
      const ENDPOINT = `http://localhost:3000/api/user/`;
      const response = await axios.post(ENDPOINT, user);

      if(response.status === 201)
      {
         return {success: true, messages: response.data.messages};
      }

      const message = response.data.messages ?? 'Ha ocurrido un error al momento de registrar el usuario. Por favor intentenlo nuevamente.';
      return {success: false, messages: message};

   } catch (error: string | any)
   {
      let errorMessageOe = '';
      const res =error.response.data;
      if(res)
      {
         errorMessageOe = res.messages;
      }

      const errorMessage = errorMessageOe || 'Ha ocurrido un error al momento de registrar el usuario. Por favor intentenlo nuevamente.';
      return {success: false, messages: errorMessage };
   }
}