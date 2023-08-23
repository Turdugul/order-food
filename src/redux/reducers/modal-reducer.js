const initialState = {
    isModalOpen: false,
}

export const modalReducer = (state=initialState, action)=>{
    if (action.type === "OPEN_MODAL") {
        return {
          ...state,
          isModalOpen: true,
        };
      }
      if (action.type === "CLOSE_MODAL") {
        return {
          ...state,
          isModalOpen: false,
        };
      }
    return state
}
