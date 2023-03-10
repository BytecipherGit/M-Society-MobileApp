import {LOGIN_OPTION, SET_USER_TYPE, USER_DATA} from '../Actions';

let initialState = {
  loader: false,
  data: {},
  error: '',
  userDetail: {},
  type: false,
  loginOption: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {...state, loader: false, userDetail: action.payload, error: ''};
    case SET_USER_TYPE:
      return {...state, type: action.payload};
    case LOGIN_OPTION:
      return {...state, loginOption: action.payload};
    default:
      return state;
  }
};
