import React, { useReducer } from "react";

export const ModalContext = React.createContext({
  // isModalOpen: false,
  // onClose: () => {},
  // onOpen: () => {},
});

const reducerFn = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return { action: true };
    case "CLOSE":
      return { action: false };
    default:
      return state;
  }
};

export const ModalProvider = ({ children }) => {
  // const [isOpen, setIsOpen] = useState(false)

  const [state, dispatch] = useReducer(reducerFn, false);
  // const openModalHandler = () => setIsOpen(true)
  // const closeModalHandler = () => setIsOpen(false)

  const openModalHandler = () => {
    dispatch({ type: "OPEN", payload: true });
  };
  const closeModalHandler = () => {
    dispatch({ type: "CLOSE", payload: false });
  };



  return (
    <ModalContext.Provider
      value={{
        isModalOpen: state,
        onClose: openModalHandler,
        onOpen: closeModalHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
