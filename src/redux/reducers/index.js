import { combineReducers } from "redux";
import { cartReducer } from "./cart-reducer";
import { modalReducer } from "./modal-reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,


})