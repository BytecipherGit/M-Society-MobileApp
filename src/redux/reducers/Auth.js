import {Alert} from 'react-native';
import {LOGIN_OPTION, SET_USER_TYPE, USER_DATA} from '../Actions';

let initialState = {
  loader: false,
  data: {},
  error: '',
  userDetail: {
    data: {},
  },
  type: false,
  loginOption: null,
  isAdmin: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      // console.log(' action.payload.data.', action.payload.data);
      return {
        ...state,
        loader: false,
        userDetail: action.payload,
        error: '',
        isAdmin:
          action.payload.data.isAdmin === 0 ||
          action.payload.data.isAdmin?.toString() === '0'
            ? false
            : true,
      };
    case SET_USER_TYPE:
      return {...state, type: action.payload};
    case LOGIN_OPTION:
      return {...state, loginOption: action.payload};
    case 'LOG_OUT':
      return {
        ...initialState, // Use spread operator to copy all properties from initialState
        userDetail: {
          data: {},
        },
      };
    default:
      return state;
  }
};
