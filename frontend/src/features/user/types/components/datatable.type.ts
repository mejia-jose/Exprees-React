import type { IUserPropierties } from "../services/user.interface";

export interface DataTableProps
{
  refresh: boolean;
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  onEditUser: (user: IUserPropierties) => void;
}