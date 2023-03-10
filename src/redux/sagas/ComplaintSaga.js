import {apply, call, put, takeLatest} from 'redux-saga/effects';
import {API_URL, GetData} from '../../assets/services';
import {
  COMPLAINT_LIST_FAIL,
  COMPLAINT_LIST_REQUEST,
  COMPLAINT_LIST_SUCCESS,
} from '../Actions';

function* getComplaintList(action) {
  try {
    const payload = {
      url: API_URL + 'complaint/resident/all',
    };

    const Data = yield call(GetData, payload);
    if (Data.data.success === true) {
      yield put({type: COMPLAINT_LIST_SUCCESS, payload: Data?.data?.data});
    } else {
      yield put({type: COMPLAINT_LIST_FAIL, payload: Data?.data?.message});
    }
  } catch (e) {
    yield put({
      type: COMPLAINT_LIST_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* ComplaintSaga() {
  yield takeLatest(COMPLAINT_LIST_REQUEST, getComplaintList);
}

export default ComplaintSaga;
