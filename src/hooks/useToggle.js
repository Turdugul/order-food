import { useEffect, useState } from "react";

export const useToggle = () => {
    
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => setIsOpen(true);
  const closeModalHandler = () => setIsOpen(false);

  useEffect(() => {
    return () => {
      closeModalHandler(); ///state unmount bolgondo state=> false bolot
    };
  }, []);

  return {
    isOpen,
    onOpenModal: openModalHandler,
    onCLoseModal: closeModalHandler,
  };
};
