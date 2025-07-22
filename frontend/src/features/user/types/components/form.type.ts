import type { Moment } from "moment";

export interface IUseStateForm
{
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
};
