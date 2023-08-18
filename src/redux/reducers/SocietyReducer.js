import {
  SOCIETY_DETAIL_FAIL,
  SOCIETY_DETAIL_REQUEST,
  SOCIETY_DETAIL_SUCCESS,
} from '../Actions';

let initialState = {
  loader: false,
  data: {},
  error: '',
};

export const SocietyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCIETY_DETAIL_REQUEST:
      return {...state, loader: true, data: {}, error: ''};
    case SOCIETY_DETAIL_SUCCESS:
      return {...state, loader: false, data: action.payload, error: ''};
    case SOCIETY_DETAIL_FAIL:
      return {...state, loader: false, data: {}, error: action.payload};
    default:
      return state;
  }
};
