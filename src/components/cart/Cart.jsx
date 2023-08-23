import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem";
import { styled } from "styled-components";
import TotalAmount from "./TotalAmount";
import { Button } from "../UI/Button";
import { fetchRequest } from "../../api/fetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { getCartMealsThunk, increaseCartMealsAmountThunk } from "../../redux/actions/cart-actions";
import { onCloseModal } from "../../redux/actions/modal-actions"; 

export const Cart = () => {
  const dispatch = useDispatch();
  const { addedMeals, isLoading, error, totalPrice} = useSelector((state) => state.cart);

 
  // const { onCloseModal } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getCartMealsThunk());
  }, [dispatch]);


  const increaseAmountHandler = async (id, amount) => {
   dispatch(increaseCartMealsAmountThunk(id,amount))
  };

  const decreaseAmountHandler = async (id, amount) => {
    if (amount === 1) {
      fetchRequest(`/basketItem/${id}/delete`, {
        method: "DELETE",
      });
    } else {
      fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount - 1 },
      });
    }
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
