import {
  GET_MAINTANCE_USER_FAIL,
  GET_MAINTANCE_USER_REQUEST,
  GET_MAINTANCE_USER_SUCCESS,
  PAYMENT_DETAIL_FAIL,
  PAYMENT_DETAIL_REQUEST,
  PAYMENT_DETAIL_SUCCESS,
  PRE_PAYMENT_DETAIL_FAIL,
  PRE_PAYMENT_DETAIL_REQUEST,
  PRE_PAYMENT_DETAIL_SUCCESS,
  SET_USER_TYPE,
  USER_DATA,
} from '../Actions';

let initialState = {
  loader: false,
  data: [],
  error: '',
  payment: [],
  preLoader: false,
  prePayment: [],
  preError: '',
};

export const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAINTANCE_USER_REQUEST:
      return {...state, loader: true, data: [], error: ''};
    case GET_MAINTANCE_USER_SUCCESS:
      return {...state, loader: false, data: action.payload, error: ''};
    case GET_MAINTANCE_USER_FAIL:
      return {...state, loader: false, data: [], error: action.payload};
    case PAYMENT_DETAIL_REQUEST:
    case PRE_PAYMENT_DETAIL_REQUEST:
      return {...state, loader: true, payment: [], error: ''};
    case PAYMENT_DETAIL_SUCCESS:
    case PRE_PAYMENT_DETAIL_SUCCESS:
      return {...state, loader: false, payment: action.payload, error: ''};
    case PAYMENT_DETAIL_FAIL:
    case PRE_PAYMENT_DETAIL_FAIL:
      return {...state, loader: false, payment: [], error: action.payload};
    default:
      return state;
  }
};
