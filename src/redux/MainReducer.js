import {combineReducers} from 'redux';
import {AuthReducer} from './reducers/Auth';
import {NoticeReducer} from './reducers/NoticeReducer';
import {ComplaintReducer} from './reducers/ComplaintReducer';
import {SocietyReducer} from './reducers/SocietyReducer';
import {PaymentReducer} from './reducers/PaymentReducer';
import {GuardReducer} from './reducers/GuardReducer';
export const allReducer = combineReducers({
  AuthReducer,
  NoticeReducer,
  ComplaintReducer,
  SocietyReducer,
  PaymentReducer,
  GuardReducer,
});
