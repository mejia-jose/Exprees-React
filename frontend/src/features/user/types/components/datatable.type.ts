import type { IUserPropierties } from "../services/user.interface";

export interface DataTableProps
{
  refresh: boolean;
  onEditUser: (user: IUserPropierties) => void;
}