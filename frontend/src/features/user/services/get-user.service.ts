import axios from "axios";

import { type IResponseDataUser } from "../types/user.interface";

/** Permite obtener el listado de usuarios */
export async function getUsers():Promise<IResponseDataUser[]>
{
   try
   {
      const ENDPOINT = 'http://localhost:3000/api/users';
      const response = await axios.get<IResponseDataUser[]>(ENDPOINT);
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