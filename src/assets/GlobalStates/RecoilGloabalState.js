import {atom} from 'recoil';

export const GlobalAppAlert = atom({
  key: 'appAlert', // unique ID (with respect to other atoms/selectors)
  default: {
    visible: false,
    message: '',
    iconType: '',
  }, // default value (aka initial value)
});
