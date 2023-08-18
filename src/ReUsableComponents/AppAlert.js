import {View, Text} from 'react-native';
import React from 'react';
import SuccessModal from './SuccessModal';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../assets/GlobalStates/RecoilGloabalState';

const AppAlert = () => {
  const [data, setData] = useRecoilState(GlobalAppAlert);
  return (
    <SuccessModal
      isVisible={data.visible}
      setIsVisible={() => setData({visible: false, message: ''})}
      type={''}
      onlyClosePopup
      iconType={data.iconType}
      desc={data.message}
    />
  );
};

export default AppAlert;
