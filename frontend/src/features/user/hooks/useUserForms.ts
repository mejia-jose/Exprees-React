import { useCallback, useRef, useState } from "react";
import type { IUserPropierties } from "../types/services/user.interface";

export const useUserForms = () =>
{
  /** Manejo de estados del modal */
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)

  /** Manejo de estados para los mensajes **/
  const [messages, setMessages] = useState<string>('');
  

  const [refreshTable, setRefreshTable] = useState(false);

  /** Maneja el estado de las alertas **/
  const [alert, setAlert] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [userEdit, setUserEdit] = useState<IUserPropierties | null>(null);
  
  /** Permite abrir el modal **/
  const openModalType = useCallback((type: 'add' | 'edit', user?:IUserPropierties) => 
  {
    setModalType(type);
    setOpenModal(true);
    setFullWidth(true);
    if (user) setUserEdit(user);
  }, []);

  /** Permite manejar el estado de las respuestas existosas de los endpoint, y notificar al componente padre para mostrar mensaje de exito */
  const requestSuccess = (msg: string) =>
  {
    setOpenModal(false);
    setAlert({ type: "success", text: msg });
    setMessages(msg);
    setRefreshTable(prev => !prev);
    setTimeout(() => {setAlert(null)}, 5000);
  }

  const requestFailed = (msg: string) =>
  {
    setOpenModal(false);
    setAlert({ type: "error", text: msg });
    setMessages(msg);
    setRefreshTable(prev => !prev);
    setTimeout(() => {setAlert(null)}, 5000);
  }

  const formRef = useRef<HTMLFormElement>(null);

  return {
    openModal,
    setOpenModal,
    modalType,
    fullWidth,
    messages,
    alert,
    refreshTable,
    setRefreshTable,
    openModalType,
    requestSuccess,
    requestFailed,
    formRef,
    userEdit,
  };
}