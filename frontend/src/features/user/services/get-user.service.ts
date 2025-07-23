import axios from "axios";

import { type IResponseDataUser } from "../types/services/user.interface";
import { ENDPOINTS_API } from "../../../config/api.config";

/** Permite obtener el listado de usuarios */
export async function getUsers():Promise<IResponseDataUser[]>
{
   try
   {
      const response = await axios.get<IResponseDataUser[]>(ENDPOINTS_API.USER.ALL);
      return response.data ?? [];
   } catch (error:any)
   {
      if(axios.isAxiosError(error))
      {
         console.log(error.message);
      }
      return [];
   }
}