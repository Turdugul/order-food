import React, {useContext} from "react";
import { Header } from "./components/header/Header";
import { MealsSummary } from "./components/meals-summary/MealsSummary";
import { Meals } from "./components/meals/Meals";
import { Cart } from "./components/cart/Cart";
import { onCloseModal } from "./redux/actions/modal-actions";

import { useDispatch, useSelector } from "react-redux";


function App() {
  // const { isModalOpen, onClose } = useContext(ModalContext)
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.modal);

 
  return (
    <div>
      <Header />
      <MealsSummary />
      <Meals />
      {isModalOpen && <Cart onClose={()=>dispatch(onCloseModal())}/>}
    </div>
  );
}

export default App;
