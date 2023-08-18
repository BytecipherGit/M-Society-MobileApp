import {apply, call, put, takeLatest} from 'redux-saga/effects';
import {API_URL, GetData} from '../../assets/services';
import {
  GET_VISITORS_LIST_FAIL,
  GET_VISITORS_LIST_REQUEST,
  GET_VISITORS_LIST_SUCCESS,
} from '../Actions';

function* getVisitorsList(action) {
  let url = API_URL + 'visitor/guard/all';
  try {
    let payload = {
      url: url,
    };

    const Data = yield call(GetData, payload);
    if (Data.data.success === true) {
      yield put({type: GET_VISITORS_LIST_SUCCESS, payload: Data?.data?.data});
    } else {
      yield put({type: GET_VISITORS_LIST_FAIL, payload: Data?.data?.message});
    }
  } catch (e) {
    yield put({
      type: GET_VISITORS_LIST_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* GuardSaga() {
  yield takeLatest(GET_VISITORS_LIST_REQUEST, getVisitorsList);
}

export default GuardSaga;
