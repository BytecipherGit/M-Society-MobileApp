import {View, Text, SafeAreaView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {COLORS, shadow} from '../../assets/theme';

import FastImage from 'react-native-fast-image';
import {RNCamera} from 'react-native-camera';
import AppButton from '../../ReUsableComponents/AppButton';

const GuardPresentModel = ({isVisible, setIsVisible}) => {
  const [loader, setLoader] = useState(false);
  const [scanStatus, setScanStatus] = useState('Inprogress');
  const [status, setStatus] = useState({
    status: '', //[inprogress,error]
    msg: 'Please Wait...',
  });

  const onClose = () => {
    setIsVisible(false);
  };

  const onSuccess = e => {
    // Handle the scanned QR code data here
    console.log(e.data);
    setLoader(true);
    setStatus({...status, status: 'inProgress', msg: 'Please Wait...'});
    setTimeout(() => {
      setStatus({...status, status: 'approved', msg: ''});
    }, 2000);
    setTimeout(() => {
      setLoader(false);
      onClose();
    }, 4700);
    // You can navigate or process the data as needed
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{
        margin: 0,
        flex: 1,
        justifyContent: 'flex-end',
      }}>
      {/* <View
        style={{
          height: '90%',
          backgroundColor: 'white',
          borderRadius: 10,
          alignItems: 'center',
          padding: 10,
        }}>
        <Text
          style={{
            color: COLORS.titleFont,
            marginTop: '2%',
            fontFamily: 'Inter-SemiBold',
          }}>
          Scan Your QR Code
        </Text>
        {
          loader ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <FastImage
                source={
                  status.status === 'inProgress'
                    ? {
                        uri: 'https://media.tenor.com/cgoYGj4rhcUAAAAM/qr-code-codigo-qr.gif',
                      }
                    : require('../../assets/images/qrDone.gif')
                }
                style={{height: 150, width: 500}}
                resizeMode={FastImage.resizeMode.contain} // Adjust this based on your layout requirements
              />
              <Text
                style={{
                  color: 'green',
                  alignSelf: 'center',
                  fontFamily: 'Inter-Medium',
                }}>
                {status.msg}
              </Text>
            </View>
          ) : ( */}
      <RNCamera
        style={{flex: 1, width: '100%'}}
        captureAudio={false}
        onBarCodeRead={qr => {
          console.log('====================================');
          console.log(qr);
          console.log('====================================');
          setScanStatus('Scanned');
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.6)',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 20,
                alignSelf: 'center',
                marginTop: '2%',
                color: 'white',
                borderBottomWidth: 1,
                borderColor: 'white',
              }}>
              Scan QR-Code
            </Text>
            <Text
              style={{
                marginBottom: '2%',
                marginLeft: '2%',
                fontFamily: 'Inter-SemiBold',
                fontSize: 15,
                color: COLORS.white,
              }}>
              Scan Status:{' '}
              <Text
                style={{
                  color:
                    scanStatus === 'Inprogress'
                      ? 'yellow'
                      : scanStatus === 'Invalid'
                      ? 'red'
                      : 'lightgreen',
                }}>
                {' '}
                {scanStatus}{' '}
              </Text>
            </Text>
          </View>
          <View
            style={{
              height: Dimensions.get('window').height / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 0.65,
                width: '70%',
                borderWidth: 3,
                borderColor: 'white',
                borderRadius: 10,
              }}></View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.6)',
              justifyContent: 'center',
            }}>
            <AppButton
              buttonStyle={{
                width: '80%',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: 'white',
                ...shadow,
              }}
              buttonTitle={'Check-in'}
            />
          </View>
        </SafeAreaView>
      </RNCamera>
    </ReactNativeModal>
  );
};

export default GuardPresentModel;
