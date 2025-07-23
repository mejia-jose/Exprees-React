import { useCallback, useRef, useState } from "react";

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
  
  /** Permite abrir el modal **/
  const openModalType = useCallback((type: 'add' | 'edit') => 
  {
    setModalType(type);
    setOpenModal(true);
    setFullWidth(true);
  }, []);

  
  const requestSuccess = (msg: string) =>
  {
    setOpenModal(false);
    setAlert({ type: "success", text: "El usuario ha sido creado correctamente" });
    setMessages(msg);
    setRefreshTable(prev => !prev);
    setTimeout(() => {setAlert(null)}, 5000);
  }

  const requestFailed = (msg: string) =>
  {
    setOpenModal(false);
    setAlert({ type: "error", text: msg });
    setMessages(msg);
    setRefreshTable(false);
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
    openModalType,
    requestSuccess,
    requestFailed,
    formRef
  };
}