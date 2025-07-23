import axios from "axios";
import { ENDPOINTS_API } from "../../../config/api.config";

/** Permite Eliminar un usuario **/
export async function deleteUserByID(id:string):Promise<boolean>
{
   try
   {
      const response = await axios.delete(`${ENDPOINTS_API.USER.DELETE}/${id}`)
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