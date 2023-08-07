import React, {useState, useEffect} from "react";
import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem";
import { styled } from "styled-components";
import TotalAmount from "./TotalAmount";
import { Button } from "../UI/Button";


const fetchCartMeals = async () => {
  try {
    const response = await fetch(
      `http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/basket`,
      {
        headers: {
          UserID: "Gul",
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const Cart = ({ onClose }) => {
  // const { addedMeals, totalAmount } = useContext(CartContext);

  const [cartMeals, setCartMeals] = useState([]);

  useEffect(() => {
    fetchCartMeals().then((data) => setCartMeals(data.items));
  }, []);

  const increaseAmountHandler = async (id, amount) => {
    try {
      const response = await fetch(
        `http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/basketItem/${id}/update`,
        {
          method: "PUT",
          headers: {
            UserID: "Gul",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount + 1 }),
        }
      );
      const result = await response.json();
      console.log(result, "+");
      fetchCartMeals().then((data) => setCartMeals(data.items));
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseAmountHandler = async (id, amount) => {
    if (amount === 1) {
      //delete
      try {
        await fetch(
          `http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/basketItem/${id}/delete`,
          {
            method: "DELETE",
            headers: {
              UserID: "Gul",
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      fetchCartMeals().then((data) => setCartMeals(data.items));
    } else {
      //update
      try {
        const response = await fetch(
          `http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/basketItem/${id}/update`,
          {
            method: "PUT",
            headers: {
              UserID: "Gul",
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ amount: amount - 1 }),
          }
        );
        const result = await response.json();
        console.log(result, "-");
        fetchCartMeals().then((data) => setCartMeals(data.items));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const totalAmount = cartMeals.reduce((acc, meal) => {
    return acc + meal.price * meal.amount;
  }, 0);
  console.log(totalAmount);

  return (
    <Modal onClose={onClose}>
      <Content>
        <CartList>
          {cartMeals.map((meal) => (
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
        <TotalAmount totalamount={totalAmount} />
        <ActionsContainer>
          <Button variant="outlined" onClick={onClose}>
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
 