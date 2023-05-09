import {apply, call, put, takeLatest} from 'redux-saga/effects';
import {API_URL, GetData} from '../../assets/services';
import {
  NOTICE_LIST_FAIL,
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_SUCCESS,
} from '../Actions';

function* getNoticeList(action) {
  let url = API_URL + 'notice/all';
  try {
    let payload = {
      url: url,
    };

    const Data = yield call(GetData, payload);
    console.log(Data.data);
    if (Data.data.success === true) {
      yield put({type: NOTICE_LIST_SUCCESS, payload: Data?.data?.data});
    } else {
      yield put({type: NOTICE_LIST_FAIL, payload: Data?.data?.message});
    }
  } catch (e) {
    yield put({
      type: NOTICE_LIST_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* NoticeSaga() {
  yield takeLatest(NOTICE_LIST_REQUEST, getNoticeList);
}

export default NoticeSaga;
