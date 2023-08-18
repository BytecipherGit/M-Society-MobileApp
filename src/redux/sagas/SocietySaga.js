import {apply, call, put, takeLatest} from 'redux-saga/effects';
import {API_URL, GetData} from '../../assets/services';
import {
  SOCIETY_DETAIL_FAIL,
  SOCIETY_DETAIL_REQUEST,
  SOCIETY_DETAIL_SUCCESS,
} from '../Actions';

function* getSocietyDetail(action) {
  let url = API_URL + `society/${action.payload}`;
  try {
    let payload = {
      url: url,
    };
    const Data = yield call(GetData, payload);
    if (Data.data.success === true) {
      yield put({type: SOCIETY_DETAIL_SUCCESS, payload: Data?.data?.data});
    } else {
      yield put({type: SOCIETY_DETAIL_FAIL, payload: Data?.data?.message});
    }
  } catch (e) {
    yield put({
      type: SOCIETY_DETAIL_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* SocietySaga() {
  yield takeLatest(SOCIETY_DETAIL_REQUEST, getSocietyDetail);
}

export default SocietySaga;
