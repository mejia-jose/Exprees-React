import { IMapResponse } from "./interfaces/response.interface";
export class MapResponse
{
    static ResultJson<T>(info: IMapResponse<T>)
    {
        const { type, messages, error, data } = info;
        return {
            success: type,
            messages: messages, 
            detail: { 
                error: error ?? null,
                data : data ?? [] 
            }
        };
    }
}