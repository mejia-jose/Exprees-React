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