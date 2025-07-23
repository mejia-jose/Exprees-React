interface IDetailResponse
{
  data: IPaginationData;
  error: string | null | any;
}

interface IPaginationData
{
  total: number;
  pageNumber: number;
  pageElements: number;
  records: IUserPropierties[];
}

export interface IUserPropierties
{
  id: string;
  name: string;
  lastName: string;
  username: string;
  birthday: string;
  hasPassport: boolean;
  age: number;
  registeredAt: string;
}

export interface IResponseDataUser 
{
  success: boolean;
  messages: string;
  detail: IDetailResponse;
}