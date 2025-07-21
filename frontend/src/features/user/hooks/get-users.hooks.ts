import { useState, useEffect } from "react";

import { getUsers} from '../services/get-user.service';
import { type IResponseDataUser } from "../types/user.interface";

export function useGetUsers()
{
    const [apiResponse, setApiResponse] = useState<IResponseDataUser | any>({});
    const [loanding, setLoanding] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() =>
    {
       getUsers().
       then(setApiResponse).
       catch(setError).
       finally(() => setLoanding(false));
    }, []);

    const { detail } = apiResponse;
    const users = detail?.data || [];
    return { users, loanding, error};
}