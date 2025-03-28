import { SAVE_SHOP } from "../actions/actionTypes";

const initialState = {
  id: "",
  name: "",
  address: "",
  description: "",
  openingTime: "",
  closingTime: "",
  imageUrl: "",
  ownerId: "",
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SHOP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
