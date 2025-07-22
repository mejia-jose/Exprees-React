export interface IPropsDialog
{
    openModal: boolean;
    close: () => void;
    action: () => void;
    nameButton: string,
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    title: string;
    fullWidth?: boolean;
}