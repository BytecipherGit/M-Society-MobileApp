import {
  NOTICE_LIST_FAIL,
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_SUCCESS,
} from '../Actions';

let initialState = {
  loader: false,
  data: [],
  error: '',
};

export const NoticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTICE_LIST_REQUEST:
      return {...state, loader: true, data: [], error: ''};
    case NOTICE_LIST_SUCCESS:
      return {...state, loader: false, data: action.payload, error: ''};
    case NOTICE_LIST_FAIL:
      return {...state, loader: false, data: [], error: action.payload};
    default:
      return state;
  }
};
