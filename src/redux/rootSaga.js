import {spawn} from 'redux-saga/effects';
import ComplaintSaga from './sagas/ComplaintSaga';
import NoticeSaga from './sagas/NoticeSaga';
import PaymentSaga from './sagas/PaymentSaga';
import SocietySaga from './sagas/SocietySaga';

function* RootSaga() {
  yield spawn(NoticeSaga);
  yield spawn(ComplaintSaga);
  yield spawn(SocietySaga);
  yield spawn(PaymentSaga);
}

export default RootSaga;
