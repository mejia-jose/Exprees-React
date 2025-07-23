import axios from "axios";
import { ENDPOINTS_API, type IApiResponse } from "../../../config/api.config";

/** Permite consumir el endpoint que actualiza la información de un usuario **/
export async function updateDataUser(user: unknown):Promise<IApiResponse>
{
   try
   {
      const response = await axios.put(ENDPOINTS_API.USER.UPDATE, user);

        if (response.status === 200) {
            return {
                success: true,
                messages: response.data?.messages || 'Usuario actualizado correctamente.',
            };
        }

        return {
            success: false,
            messages: response.data?.messages || 'Error al actualizar el usuario. Intenta nuevamente.',
        };

   } catch (error: string | any)
   {
      let errorMessage = error?.response?.data?.messages || error.message || 'Error al actualizar el usuario. Intenta nuevamente.';
      return {success: false, messages: errorMessage };
   }
}