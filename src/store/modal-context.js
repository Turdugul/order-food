import React from "react";
import { useToggle } from "../hooks/useToggle";


export const ModalContext = React.createContext({
  isModalOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export const ModalProvider = ({ children }) => {
  // const [isOpen, setIsOpen] = useState(false)

  // const openModalHandler = () => setIsOpen(true)
  // const closeModalHandler = () => setIsOpen(false)

  const { isOpen, onCLoseModal, onOpenModal } = useToggle();
  return (
    <ModalContext.Provider
      value={{
        isModalOpen: isOpen,
        onClose: onCLoseModal,
        onOpen: onOpenModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
