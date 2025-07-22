import { useState, useEffect, useCallback } from "react";

import { getUsers} from '../services/get-user.service';
import { type IResponseDataUser } from "../types/user.interface";

export function useGetUsers()
{
    const [apiResponse, setApiResponse] = useState<IResponseDataUser | any>({});
    const [loanding, setLoanding] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

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