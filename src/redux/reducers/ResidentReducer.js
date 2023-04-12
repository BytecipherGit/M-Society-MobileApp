import {
  GET_RESIDENTSLIST_FAIL,
  GET_RESIDENTSLIST_REQUEST,
  GET_RESIDENTSLIST_SUCCESS,
} from '../Actions';

let initialState = {
  loader: false,
  data: [],
  error: '',
};

export const ResidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESIDENTSLIST_REQUEST:
      return {...state, loader: true, data: [], error: ''};
    case GET_RESIDENTSLIST_SUCCESS:
      return {...state, loader: false, data: action.payload, error: ''};
    case GET_RESIDENTSLIST_FAIL:
      return {...state, loader: false, data: [], error: action.payload};
    case GET_RESIDENTSLIST_SUCCESS:
      let arr = [];
      arr = state.data;
      const index = state.data.findIndex(
        item => item._id === action.payload._id,
      );
      arr[index].status = item.status;
      return {...state, data: arr};
    default:
      return state;
  }
};
