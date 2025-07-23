import type { Moment } from "moment";
import type { IUserPropierties } from "../services/user.interface";

export interface IUserFormPropierties
{
  id?: string;
  name: string;
  lastname: string;
  username: string;
  birthdate: Moment | null;
  hasPassport: boolean;
  age: number;
}

export type FormProps = {
  type: 'save' | 'update';
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
  userEdit?: IUserPropierties | null;
};
