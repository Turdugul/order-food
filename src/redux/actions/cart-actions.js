import { fetchRequest } from "../../api/fetchRequest";

export const getCartMealsSuccess = (meals) => ({
  type: "CART_MEALS_SUCCESS",
  payload: meals,
});

export const getCartMealsPending = () => ({
  type: "CART_MEALS_PENDING",
});


export const getCartMealsFailed = (error) => ({
  type: "CART_MEALS_FAILED",
  payload: error,
});

export const getCartMealsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getCartMealsPending());
      const data = await fetchRequest(`basket`);
      dispatch(getCartMealsSuccess(data.data.items));
    } catch (error) {
      dispatch(getCartMealsFailed(error));
    }
  };
};
export const increaseCartMealsAmountThunk = (id, amount) => {
  return async (dispatch) => {
    try {
      fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount + 1 },
      }).then(() => {
        dispatch(getCartMealsThunk());
      });
    } catch (error) {
      getCartMealsFailed(error);
    }
  };
};

export const decreaseCartMealsAmountThunk = (id, amount) => {
  return async (dispatch) => {
    try {
      if (amount === 1) {
        fetchRequest(`/basketItem/${id}/delete`, {
          method: "DELETE",
        })
      } else {
      fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount - 1 },
      }).then(() => {
        dispatch(getCartMealsThunk());
      });
    }
    } catch (error) {
      getCartMealsFailed(error);
    }
  };
};