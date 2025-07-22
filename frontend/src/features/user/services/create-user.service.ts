import axios from "axios";

/** Permite consumir el endpoint que registra un usuario **/
export async function createUser(user: unknown):Promise<{success:boolean, messages: string}>
{
   try
   {
      const ENDPOINT = `http://localhost:3000/api/user/`;
      const response = await axios.post(ENDPOINT, user);
      return response.data;

   } catch (error:any)
   {
      //console.log(error)
      if(axios.isAxiosError(error))
      {
         console.log(error.message);
      }
      return {success: false, messages: error};
   }
}