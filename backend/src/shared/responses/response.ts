export class MapResponse
{
    static ResultJson(type:boolean, messages: string, error?: string)
    {
        return {
            success: type,
            messages: messages, 
            detail: { error: error ?? null }
        };
    }
}