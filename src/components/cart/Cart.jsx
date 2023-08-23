import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem";
import { styled } from "styled-components";
import TotalAmount from "./TotalAmount";
import { Button } from "../UI/Button";
import { fetchRequest } from "../../api/fetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { getCartMealsThunk, increaseCartMealsAmountThunk, decreaseCartMealsAmountThunk } from "../../redux/actions/cart-actions";
import { onCloseModal } from "../../redux/actions/modal-actions"; 

export const Cart = () => {
  const dispatch = useDispatch();
  const { addedMeals, isLoading, error, totalPrice} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartMealsThunk());
  }, [dispatch]);


  const increaseAmountHandler = async (id, amount) => {
   dispatch(increaseCartMealsAmountThunk(id,amount))
  };

  const decreaseAmountHandler = async (id, amount) => {
    dispatch(decreaseCartMealsAmountThunk (id,amount))
    
  };
 
 
  return (
    <Modal onClose={()=>dispatch(onCloseModal())}>
      <Content>
        {isLoading && <h4>...Isloading</h4>}
        {!isLoading && (
          <CartList>
            {addedMeals.map((meal) => (
              <CartItem
                title={meal.title}
                amount={meal.amount}
                price={meal.price}
                key={meal.id}
                id={meal._id}
                onIncreaseMealAmount={increaseAmountHandler}
                onDecreaseMealAmount={decreaseAmountHandler}
              />
            ))}
          </CartList>
        )}
        {error && <h4>{error.message}</h4>}

        <TotalAmount totalamount={totalPrice} />
        <ActionsContainer>
          <Button variant="outlined" onClick={()=>dispatch(onCloseModal())}>
            Close
          </Button>
          <Button onClick={() => console.log("ORDER")}>Order</Button>
        </ActionsContainer>
      </Content>
    </Modal>
  );
};

const ActionsContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-top: 24px;
`;

const Content = styled("div")`
  padding: 1.5rem 1rem;
`;
const CartList = styled("ul")`
  list-style: none;
  display: flex;
  flex-direction: column;
  max-height: 360px;
  overflow-y: scroll;
`;
