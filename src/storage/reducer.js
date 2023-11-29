import {
  CATEGORIES,
  LOGIN,
  SIGNOUT,
  UPDATECARTCOUNT,
  UPDATEPROFILE,
  UPDATEWISHIDS,
} from './constants';

const initialState = {
  isLoggedIn: false,
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  profileImage: '',
  categories: [],
  cartCount: 0,
  wishIds: [],
};
export const inKartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        mobileNumber: action.payload.mobileNumber,
        profileImage: action.payload.profileImage,
        userId: action.payload.userId,
        isLoggedIn: true,
      };
    case SIGNOUT:
      return {
        ...state,
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        profileImage: '',
        userId: '',
        isLoggedIn: false,
      };
    case UPDATEPROFILE:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        mobileNumber: action.payload.mobileNumber,
        profileImage: action.payload.profileImage,
      };
    case CATEGORIES:
      return {
        ...state,
        categories: [...action.payload.categories],
      };
    case UPDATECARTCOUNT:
      return {
        ...state,
        cartCount: action.payload.cartCount,
      };
    case UPDATEWISHIDS:
      return {
        ...state,
        wishIds: action.payload.wishIds,
      };
    default:
      return state;
  }
};
