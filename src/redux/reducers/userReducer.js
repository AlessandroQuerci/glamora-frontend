import { LOGIN_SUCCESS, LOGOUT, UPDATE_USER, RESTORE_AUTH } from "../actions/actionTypes";

const initialState = {
  token: null,
  user: {
    id: null,
    name: "",
    surname: "",
    email: "",
    imageUrl: "",
    role: null,
  },
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case RESTORE_AUTH:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case LOGOUT:
      return initialState;
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;
