import React, {useContext} from "react";
import { Header } from "./components/header/Header";
import { MealsSummary } from "./components/meals-summary/MealsSummary";
import { Meals } from "./components/meals/Meals";
import { Cart } from "./components/cart/Cart";
import { ModalContext } from './store/modal-context'

function App() {
  const { isModalOpen, onClose } = useContext(ModalContext)
  return (
    <div>
      <Header />
      <MealsSummary />
      <Meals />
      {isModalOpen && <Cart onClose={onClose} />}
    </div>
  );
}
//rest api done
export default App;
