import axios from "axios";
import { ENDPOINTS_API, type IApiResponse } from "../../../config/api.config";

/** Permite consumir el endpoint que registra un usuario **/
export async function createUser(user: unknown):Promise<IApiResponse>
{
   try
   {
      const response = await axios.post(ENDPOINTS_API.USER.CREATE, user);

      if (response.status === 201) {
         return {
               success: true,
               messages: response.data?.messages || 'Usuario registrado correctamente.',
         };
      }

        return {
            success: false,
            messages: response.data?.messages || 'Ha ocurrido un error al momento de registrar el usuario. Por favor intentenlo nuevamente.',
        };

   } catch (error: string | any)
   {
      let errorMessage = error?.response?.data?.messages || error.message || 'Ha ocurrido un error al momento de registrar el usuario. Por favor intentenlo nuevamente.';
      return {success: false, messages: errorMessage };
   }
}