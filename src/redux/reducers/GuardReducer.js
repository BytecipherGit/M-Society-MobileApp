import {
  GET_VISITORS_LIST_FAIL,
  GET_VISITORS_LIST_REQUEST,
  GET_VISITORS_LIST_SUCCESS,
  UPDATE_VISITORS_LIST,
} from '../Actions';

let initialState = {
  loader: false,
  data: [],
  error: '',
};

export const GuardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VISITORS_LIST_REQUEST:
      return {...state, loader: true, data: [], error: ''};
    case GET_VISITORS_LIST_SUCCESS:
    case UPDATE_VISITORS_LIST:
      return {...state, loader: false, data: action.payload, error: ''};
    case GET_VISITORS_LIST_FAIL:
      return {...state, loader: false, data: [], error: action.payload};
    default:
      return state;
  }
};
