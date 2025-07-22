import { useState, useEffect, useCallback } from "react";

import { getUsers} from '../services/get-user.service';
import { type IResponseDataUser } from "../types/services/user.interface";

/** Este hook permite hacer el llamado de la petición al backend para obtener el lsitado de usuarios */
export function useGetUsers()
{
  const [apiResponse, setApiResponse] = useState<IResponseDataUser | any>({});
  const [loanding, setLoanding] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  /** Se usa un callback con el fin de memorizar la funcion getUsers, y evitar que se vuelva a cargar en cada rendezido */
  const refetch = useCallback(() =>
  {
    setLoanding(true);
    getUsers().
    then((data) =>{
        setApiResponse(data);
    }).
    catch(setError).
    finally(() => setLoanding(false));
  }, []);

  useEffect(() =>
  {
    refetch();
  }, [refetch]);

  const { detail } = apiResponse;
  const users = detail?.data || [];
  return { users, loanding, error, refetch};
}