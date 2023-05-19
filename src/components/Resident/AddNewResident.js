import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import {AddResidenceUserJson} from '../../assets/Jsons';
import PhoneInput from 'react-native-phone-number-input';
import {Dropdown} from 'react-native-element-dropdown';
import {
  API_URL,
  GetData,
  PostData,
  SnackError,
  SuccessAlert,
} from '../../assets/services';
import AppButton from '../../ReUsableComponents/AppButton';

const AddNewResident = ({navigation}) => {
  const [showData, setShowData] = useState(AddResidenceUserJson);
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const phoneInput = useRef(null);

  useEffect(() => {
    getProffesion();
    getDesignation();
  }, []);

  const getDesignation = async () => {
    try {
      const Result = await GetData({url: API_URL + 'designation/'});

      if (Result.data.success) {
        const index = AddResidenceUserJson.findIndex(
          item => item.title === 'Role',
        );
        let arr = [];
        Result.data.data.map((item, index) => {
          if (item.status === 'active') {
            arr.push({
              label: item.name,
              value: item._id,
            });
          }
        });
        AddResidenceUserJson[index].value = arr;
        setShowData([...AddResidenceUserJson]);
      }
    } catch (e) {}
  };

  const getProffesion = async () => {
    try {
      const Result = await GetData({url: API_URL + 'user/profession'});
      if (Result.data.success) {
        const index = AddResidenceUserJson.findIndex(
          item => item.title === 'Profession',
        );
        let arr = [];
        Result.data.data.map((item, index) => {
          if (item.status === 'active') {
            arr.push({
              label: item.name,
              value: item._id,
            });
          }
        });
        AddResidenceUserJson[index].value = arr;
        setShowData([...AddResidenceUserJson]);
      }
    } catch (e) {}
  };

  const createResident = async () => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (
      !data.email ||
      !data.houseNumber ||
      !data.name ||
      !data.phoneNumber ||
      !data.profession ||
      !data.residentType ||
      !data.role
    ) {
      return SnackError('Fill in the blanks.');
    }

    if (emailReg.test(data.email) === false) {
      return SnackError('Please Enter a valid email address');
    }

    if (data.phoneNumber.length !== 10) {
      return SnackError('Please Enter a valid phone number');
    }
    setLoader(true);

    try {
      const Result = await PostData({
        url: API_URL + 'admin/residentialUser/add',
        body: {
          ...data,
          ...{countryCode: countryCode},
        },
      });
      console.log(Result.data);
      setLoader(false);
      if (Result.data.success) {
        SuccessAlert('Your Data Was Created.');
        navigation.goBack();
      } else {
        SnackError(Result.data.message);
      }
    } catch (e) {
      SnackError('Something Went Wrong, please try again later.');
      setLoader(false);
    }
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Add Residence" />
      <FullCardBackground
        styles={styles.cnt}
        RenderUI={() => (
          <View style={{flex: 1}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              automaticallyAdjustKeyboardInsets={true}
              contentContainerStyle={{flexGrow: 0.3}}>
              {showData.map((item, index) => {
                return (
                  <View style={{marginTop: '5%'}} key={index}>
                    <TitleText text={item.title} />
                    {item.type === 'Input' && (
                      <TextInput
                        placeholder={item.title}
                        style={styles.textInput}
                        value={data[item.param]}
                        onChangeText={text =>
                          setData({...data, [item.param]: text})
                        }
                      />
                    )}
                    {item.type === 'phoneNumber' && (
                      <PhoneInput
                        ref={phoneInput}
                        layout="second"
                        inputStyle={{color: 'green'}}
                        containerStyle={styles.phoneContainerStyle}
                        buttonStyle={{}}
                        textContainerStyle={styles.phoneTextContainerStyle}
                        textInputStyle={{}}
                        codeTextStyle={{}}
                        dropdownStyle={{
                          height: 50,
                        }}
                        country={'IN'}
                        value={data[item.param]}
                        onChangeText={phone =>
                          setData({...data, [item.param]: phone})
                        }
                        onChangeCountry={cn =>
                          setCountryCode(`+${cn.callingCode[0]}`)
                        }
                      />
                    )}
                    {item.type === 'dropDown' && (
                      <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={item.value}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select item'}
                        searchPlaceholder="Search..."
                        value={data[item.param]}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={i => {
                          setData({...data, [item.param]: i.value});
                          // setIsFocus(false);
                        }}
                      />
                    )}
                  </View>
                );
              })}
              <View style={{height: 50}} />
            </ScrollView>
            <AppButton
              buttonStyle={{marginVertical: 10}}
              buttonTitle={'Create'}
              btnLoader={loader}
              onPress={createResident}
            />
          </View>
        )}
      />
    </View>
  );
};

export default AddNewResident;

const styles = StyleSheet.create({
  cnt: {backgroundColor: COLORS.themeBackground, padding: 16},
  textInput: {
    ...shadow,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: 'white',
    borderWidth: 0.2,
    marginTop: '2%',
    padding: 15,
    borderRadius: 5,
    borderColor: COLORS.inputBorder,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  phoneContainerStyle: {
    ...shadow,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: COLORS.inputBorder,
    marginLeft: '.5%',
    marginTop: '3%',
    width: '98%',
    backgroundColor: 'white',
  },
  phoneTextContainerStyle: {
    backgroundColor: 'white',
    borderLeftWidth: 0.5,
    borderColor: COLORS.inputBorder,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  dropdown: {
    ...shadow,
    height: 50,
    borderColor: COLORS.inputBorder,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 0.2,
    marginTop: '2%',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  placeholderStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.inputBorder,
  },
  selectedTextStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
