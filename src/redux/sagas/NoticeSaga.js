import {apply, call, put, takeLatest} from 'redux-saga/effects';
import {API_URL, DeleteData, GetData} from '../../assets/services';
import {
  NOTICE_DELETE_FAIL,
  NOTICE_DELETE_REQUEST,
  NOTICE_DELETE_SUCCESS,
  NOTICE_LIST_FAIL,
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_REQUEST_SILENT,
  NOTICE_LIST_SUCCESS,
} from '../Actions';

function* getNoticeList(action) {
  let url = API_URL + 'notice/all';
  try {
    let payload = {
      url: url,
    };

    const Data = yield call(GetData, payload);

    if (Data.data.success === true) {
      Data?.data?.data.length > 0
        ? yield put({type: NOTICE_LIST_SUCCESS, payload: Data?.data?.data})
        : yield put({type: NOTICE_LIST_FAIL, payload: 'No Notice found'});
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
  yield takeLatest(NOTICE_LIST_REQUEST_SILENT, getNoticeList);
}

export default NoticeSaga;
