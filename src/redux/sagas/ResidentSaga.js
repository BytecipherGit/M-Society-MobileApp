import {apply, call, put, takeLatest} from 'redux-saga/effects';
import {API_URL, GetData, PutData} from '../../assets/services';
import {
  EDIT_RESIDENT_USER_REQUEST,
  GET_RESIDENTSLIST_FAIL,
  GET_RESIDENTSLIST_REQUEST,
  GET_RESIDENTSLIST_SUCCESS,
} from '../Actions';

function* getResidentList(action) {
  let url = API_URL + 'user/app/all';
  try {
    let payload = {
      url: url,
    };

    const Data = yield call(GetData, payload);

    if (Data.data.success === true) {
      console.log('Statet data =>', Data?.data?.data);
      Data?.data?.data.length
        ? yield put({
            type: GET_RESIDENTSLIST_SUCCESS,
            payload: Data?.data?.data,
          })
        : yield put({
            type: GET_RESIDENTSLIST_FAIL,
            payload: 'No Resident Users found.',
          });
    } else {
      yield put({type: GET_RESIDENTSLIST_FAIL, payload: Data?.data?.message});
    }
  } catch (e) {
    yield put({
      type: GET_RESIDENTSLIST_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* EditResidentUser(action) {
  let url = API_URL + 'user/';
  try {
    let payload = {
      url: url,
      body: {
        id: action.payload.id,
        status: action.payload.status === 'active' ? 'inactive' : 'active',
      },
    };

    const Data = yield call(PutData, payload);

    if (Data.data.success === true) {
      yield put({type: GET_RESIDENTSLIST_SUCCESS, payload: Data?.data?.data});
    } else {
      yield put({type: GET_RESIDENTSLIST_FAIL, payload: Data?.data?.message});
    }
  } catch (e) {
    yield put({
      type: GET_RESIDENTSLIST_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* ResidentSaga() {
  yield takeLatest(GET_RESIDENTSLIST_REQUEST, getResidentList);
  yield takeLatest(EDIT_RESIDENT_USER_REQUEST, EditResidentUser);
}

export default ResidentSaga;
