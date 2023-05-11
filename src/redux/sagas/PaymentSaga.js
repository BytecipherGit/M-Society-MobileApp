import {apply, call, put, takeLatest} from 'redux-saga/effects';
import {API_URL, GetData, PostData} from '../../assets/services';
import {
  GET_MAINTANCE_USER_FAIL,
  GET_MAINTANCE_USER_REQUEST,
  GET_MAINTANCE_USER_SUCCESS,
  PAYMENT_DETAIL_FAIL,
  PAYMENT_DETAIL_REQUEST,
  PAYMENT_DETAIL_SUCCESS,
  PRE_PAYMENT_DETAIL_FAIL,
  PRE_PAYMENT_DETAIL_REQUEST,
  PRE_PAYMENT_DETAIL_SUCCESS,
} from '../Actions';

function* getMaintananceUser(action) {
  let url = API_URL + 'maintenance/user';
  try {
    let payload = {
      url: url,
    };

    const Data = yield call(GetData, payload);

    if (Data.data.success === true) {
      yield put({type: GET_MAINTANCE_USER_SUCCESS, payload: Data?.data?.data});
    } else {
      yield put({type: GET_MAINTANCE_USER_FAIL, payload: Data?.data?.message});
    }
  } catch (e) {
    yield put({
      type: GET_MAINTANCE_USER_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* getPaymentDetail(action) {
  let url = API_URL + `maintenance/userTakePaymentMonthList/${action.payload}`;
  // userTakePaymentMonthList
  try {
    let payload = {
      url: url,
    };

    const Data = yield call(GetData, payload);

    if (Data.data.success === true) {
      let arr = [];
      arr = Data?.data?.data;
      Data?.data?.data.map((item, index) => {
        item.month === 0 && (arr[index].textMonth = 'Jan');
        item.month === 1 && (arr[index].textMonth = 'Feb');
        item.month === 2 && (arr[index].textMonth = 'Mar');
        item.month === 3 && (arr[index].textMonth = 'Apr');
        item.month === 4 && (arr[index].textMonth = 'May');
        item.month === 5 && (arr[index].textMonth = 'Jun');
        item.month === 6 && (arr[index].textMonth = 'Jul');
        item.month === 7 && (arr[index].textMonth = 'Aug');
        item.month === 8 && (arr[index].textMonth = 'Sep');
        item.month === 9 && (arr[index].textMonth = 'Auc');
        item.month === 10 && (arr[index].textMonth = 'Nov');
        item.month === 11 && (arr[index].textMonth = 'Dec');
      });
      yield put({type: PAYMENT_DETAIL_SUCCESS, payload: [...arr]});
    } else {
      yield put({type: PAYMENT_DETAIL_FAIL, payload: Data?.data?.message});
    }
  } catch (e) {
    yield put({
      type: PAYMENT_DETAIL_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* getPrePaymentDetail(action) {
  let url = API_URL + `maintenance/previousMonth`;

  try {
    let payload = {
      url: url,
      body: action.payload,
    };

    const Data = yield call(PostData, payload);

    if (Data.data.success === true) {
      let arr = [];
      arr = Data?.data?.data;
      Data?.data?.data.map((item, index) => {
        item.month === 0 && (arr[index].textMonth = 'Jan');
        item.month === 1 && (arr[index].textMonth = 'Feb');
        item.month === 2 && (arr[index].textMonth = 'Mar');
        item.month === 3 && (arr[index].textMonth = 'Apr');
        item.month === 4 && (arr[index].textMonth = 'May');
        item.month === 5 && (arr[index].textMonth = 'Jun');
        item.month === 6 && (arr[index].textMonth = 'Jul');
        item.month === 7 && (arr[index].textMonth = 'Aug');
        item.month === 8 && (arr[index].textMonth = 'Sep');
        item.month === 9 && (arr[index].textMonth = 'Auc');
        item.month === 10 && (arr[index].textMonth = 'Nov');
        item.month === 11 && (arr[index].textMonth = 'Dec');
      });
      yield put({type: PRE_PAYMENT_DETAIL_SUCCESS, payload: [...arr]});
    } else {
      yield put({
        type: PRE_PAYMENT_DETAIL_FAIL,
        payload: Data.data.message,
      });
    }
  } catch (e) {
    yield put({
      type: PRE_PAYMENT_DETAIL_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* PaymentSaga() {
  yield takeLatest(GET_MAINTANCE_USER_REQUEST, getMaintananceUser);
  yield takeLatest(PAYMENT_DETAIL_REQUEST, getPaymentDetail);
  yield takeLatest(PRE_PAYMENT_DETAIL_REQUEST, getPrePaymentDetail);
}

export default PaymentSaga;
