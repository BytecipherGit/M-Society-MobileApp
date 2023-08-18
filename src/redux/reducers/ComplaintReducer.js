import {
  COMPLAINT_LIST_FAIL,
  COMPLAINT_LIST_REQUEST,
  COMPLAINT_LIST_SUCCESS,
} from '../Actions';

let initialState = {
  loader: false,
  data: {my: [], other: []},
  error: '',
};

export const ComplaintReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLAINT_LIST_REQUEST:
      return {...state, loader: true, data: {my: [], other: []}, error: ''};
    case COMPLAINT_LIST_SUCCESS:
      return {...state, loader: false, data: action.payload, error: ''};
    case COMPLAINT_LIST_FAIL:
      return {
        ...state,
        loader: false,
        data: {my: [], other: []},
        error: action.payload,
      };
    default:
      return state;
  }
};
