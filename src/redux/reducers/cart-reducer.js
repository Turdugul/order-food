const initialState = {
  addedMeals: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  if (action.type === "CART_MEALS_PENDING") {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }
  if (action.type === "CART_MEALS_SUCCESS") {
    return {
      ...state,
      addedMeals: action.payload,
      isLoading: false,
      error: null,
      totalPrice: action.payload.reduce((acc, meal) => {
         return acc + meal.price * meal.amount
        }, 0)
    };
  }
  if (action.type === "CART_MEALS_FAILED") {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }
  return state;
};
