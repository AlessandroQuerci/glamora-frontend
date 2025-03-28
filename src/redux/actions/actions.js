import { LOGIN_SUCCESS, LOGOUT, UPDATE_USER, SAVE_SHOP, RESTORE_AUTH } from "./actionTypes";

export const saveShop = (shopResponse) => ({
  type: SAVE_SHOP,
  payload: {
    id: shopResponse.id,
    name: shopResponse.name,
    address: shopResponse.address,
    description: shopResponse.description,
    openingTime: shopResponse.openingTime,
    closingTime: shopResponse.closingTime,
    imageUrl: shopResponse.imageUrl,
    ownerId: shopResponse.ownerId,
  },
});

export const restoreAuth = (authData) => ({
  type: RESTORE_AUTH,
  payload: {
    token: authData.token,
    user: {
      id: authData.user.id,
      name: authData.user.name,
      surname: authData.user.surname,
      email: authData.user.email,
      imageUrl: authData.user.imageUrl,
      role: authData.user.role,
    },
  },
});

export const loginSuccess = (authResponse) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token: authResponse.token,
    user: {
      id: authResponse.user.id,
      name: authResponse.user.name,
      surname: authResponse.user.surname,
      email: authResponse.user.email,
      imageUrl: authResponse.user.imageUrl,
      role: authResponse.user.role,
    },
  },
});

export const logout = () => {
  localStorage.removeItem("reduxState");
  return { type: LOGOUT };
};

export const updateUser = (userResponse) => ({
  type: UPDATE_USER,
  payload: {
    user: {
      id: userResponse.id,
      name: userResponse.name,
      surname: userResponse.surname,
      email: userResponse.email,
      imageUrl: userResponse.imageUrl,
      role: userResponse.role,
    },
  },
});
