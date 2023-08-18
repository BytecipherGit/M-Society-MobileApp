import {atom} from 'recoil';

export const GlobalAppAlert = atom({
  key: 'appAlert', // unique ID (with respect to other atoms/selectors)
  default: {
    visible: false,
    message: '',
    iconType: '',
  }, // default value (aka initial value)
});

export const DeviceFcmToken = atom({
  key: 'fcmTokenRecoil', // unique ID (with respect to other atoms/selectors)
  default: {
    token: '',
  }, // default value (aka initial value)
});

export const CheckVisitors = atom({
  key: 'checkVisitors', // unique ID (with respect to other atoms/selectors)
  default: {
    visitors: null,
  }, // default value (aka initial value)
});
