import {spawn} from 'redux-saga/effects';
import ComplaintSaga from './sagas/ComplaintSaga';
import GuardSaga from './sagas/GuardSaga';
import NoticeSaga from './sagas/NoticeSaga';
import PaymentSaga from './sagas/PaymentSaga';
import ResidentSaga from './sagas/ResidentSaga';
import SocietySaga from './sagas/SocietySaga';

function* RootSaga() {
  yield spawn(NoticeSaga);
  yield spawn(ComplaintSaga);
  yield spawn(SocietySaga);
  yield spawn(PaymentSaga);
  yield spawn(GuardSaga);
  yield spawn(ResidentSaga);
}

export default RootSaga;
