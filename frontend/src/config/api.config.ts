const BASE_URL = 'http://localhost:3000/api/';

export const ENDPOINTS_API =
{
   USER:
   {
      ALL: BASE_URL + 'users',
      CREATE: BASE_URL + 'user',
      UPDATE: BASE_URL + 'user',
      DELETE: BASE_URL + 'user',
   }
}

export interface IApiResponse
{
   success: boolean;
   messages: string
}