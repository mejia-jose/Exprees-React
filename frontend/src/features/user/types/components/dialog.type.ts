import type { IUserPropierties } from "../services/user.interface";

export interface IPropsDialog
{
    openModal: boolean;
    type?: 'add' | 'edit' | null;
    close: () => void;
    action?: () => void;
    nameButton: string,
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    title: string;
    fullWidth?: boolean;
    formRef?: React.RefObject<HTMLFormElement | null>;
    onSuccess?: (msg: string) => void;
    onError?: (msg: string) => void;
    userEdit?: IUserPropierties | null;
}