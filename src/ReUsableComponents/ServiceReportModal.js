import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from './AppButton';
import {COLORS, shadow} from '../assets/theme';
import {
  API_URL,
  GetData,
  PostData,
  SnackError,
  SuccessAlert,
} from '../assets/services';

const ServiceReportModal = ({
  reportModal,
  setReportModal,
  servicePorviderId,
  onSuccess = () => null,
}) => {
  const [reportTxt, setreportText] = useState('');
  const [comment, setComment] = useState('');
  const [loader, setLoader] = useState(false);
  const [reportJson, setReportJson] = useState({
    data: [],
    loader: false,
    error: '',
  });
  const [commentError, setCommentError] = useState(false);

  useEffect(() => {
    getReportList();
  }, []);

  useEffect(() => {
    if (reportModal) {
      setCommentError(false);
    }
  }, [reportModal]);

  const getReportList = async () => {
    setReportJson({data: [], loader: true, error: ''});
    try {
      const Result = await GetData({
        url: API_URL + 'society/masterData',
      });
      if (Result.response) {
        setReportJson({
          data: [],
          loader: false,
          error: Result.response.data.message,
        });
      } else {
        setReportJson({
          data: Result.data.data.reportTitles,
          loader: false,
          error: '',
        });
      }
    } catch (e) {
      setReportJson({
        data: [],
        loader: false,
        error: 'Something Went Wrong, Please Try Again Later.',
      });
    }
  };

  const postReport = async () => {
    try {
      const Result = await PostData({
        url: API_URL + 'serviceProvider/report',
        body: {
          serviceProviderId: servicePorviderId,
          title: reportTxt,
          comment: comment,
        },
      });
      if (Result.response) {
        SnackError(Result.response.data.message);
      } else {
        clearAll();
        onSuccess();
        SuccessAlert('Your Report Submitted.');
      }
    } catch (e) {
      SnackError('Something went wrong, please try again later.');
    }
  };

  const clearAll = () => {
    setLoader(false);
    setreportText('');
    setComment('');
    setCommentError(false);
    setReportModal(false);
  };

  return (
    <ReactNativeModal
      isVisible={reportModal}
      swipeDirection={['down']} // Define the swipe directions you want to allow
      onSwipeComplete={clearAll}
      onBackdropPress={clearAll}
      onBackButtonPress={clearAll}
      propagateSwipe
      style={style.modalStyle}>
      <View style={style.modalCnt}>
        <View style={style.modalLine} />
        <KeyboardAvoidingView>
          <Text style={style.reportServiceTxt}>{'Report Service'}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{flexGrow: 0.3}}>
            {reportJson.data.map((ser, serviceIndex) => {
              return (
                <TouchableOpacity
                  style={style.optionsButton}
                  onPress={() => {
                    setreportText(ser.name);
                  }}
                  activeOpacity={1}
                  key={serviceIndex}>
                  <Ionicons
                    name={
                      reportTxt === ser.name
                        ? 'radio-button-on'
                        : 'radio-button-off-sharp'
                    }
                    size={20}
                    color="black"
                  />
                  <Text style={style.optionsTxt}>{ser.name}</Text>
                </TouchableOpacity>
              );
            })}
            <TextInput
              style={[
                style.commentInput,
                {borderColor: commentError ? 'red' : 'black'},
              ]}
              placeholder={
                commentError ? 'Please provide us more detail here.' : 'Comment'
              }
              multiline={true}
              placeholderTextColor={commentError ? 'red' : COLORS.descFont}
              value={comment}
              onChangeText={e => {
                setComment(e),
                  e.length > 0 ? setCommentError(false) : setCommentError(true);
              }}
              // editable={reportTxt === 'Other'}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <AppButton
          buttonStyle={{
            width: '90%',
            alignSelf: 'center',
          }}
          buttonTitle={'Report Service'}
          btnLoader={loader}
          onPress={() => {
            if (!reportTxt)
              return SnackError('Please Select Report Type First.');
            if (reportTxt) {
              if (!comment) {
                return setCommentError(true);
              }
            }
            if (!loader) {
              setLoader(true);
              postReport();
            }
          }}
        />
      </View>
    </ReactNativeModal>
  );
};

export default ServiceReportModal;

const style = StyleSheet.create({
  modalStyle: {
    margin: 0,
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCnt: {
    flex: 0.8,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalLine: {
    height: 5,
    width: '17%',
    backgroundColor: COLORS.titleFont,
    marginTop: '4%',
    alignSelf: 'center',
    borderRadius: 1000,
  },
  reportServiceTxt: {
    fontFamily: 'Axiforma-Bold',
    alignSelf: 'center',
    margin: 10,
    marginTop: 20,
    fontSize: 15,
  },
  optionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  optionsTxt: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 13,
    color: COLORS.titleFont,
    marginLeft: 3,
  },
  commentInput: {
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginVertical: '5%',
    fontFamily: 'Axiforma-Medium',
    color: COLORS.titleFont,
    fontSize: 16,
    flex: 1,
  },
});
