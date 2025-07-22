import axios from "axios";

/** Permite Eliminar un usuario **/
export async function deleteUserByID(id:string):Promise<boolean>
{
   try
   {
      const ENDPOINT = `http://localhost:3000/api/user/${id}`;
      const response = await axios.delete(ENDPOINT)
      return response.status === 200;
   } catch (error:any)
   {
      if(axios.isAxiosError(error))
      {
         console.log(error.message);
      }
      return false;
   }
}