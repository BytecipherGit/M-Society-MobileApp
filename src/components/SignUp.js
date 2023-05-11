import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AuthThemeImage, COLORS, globalStyle, shadow} from '../assets/theme';
import {images} from '../assets/images/image';
import AuthCard from '../ReUsableComponents/AuthCard';
import AppTextInput from '../ReUsableComponents/AppTextInput';
import {inputFields, SignupFields} from '../assets/Jsons';
import {Dropdown} from 'react-native-element-dropdown';
import {API_URL, PostData} from '../assets/services';

const SignUp = ({navigation}) => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    let data = {};
    SignupFields.map((item, index) => {
      data = {...data, [item.param]: ''};
    });
    setData(data);
    setError(data);
  }, []);

  const Register = async () => {
    const payload = {
      url: API_URL + 'user/signup',
      body: data,
    };
    const Result = await PostData(payload);
  };
  return (
    <View style={globalStyle.cnt}>
      <AuthThemeImage />
      <AuthCard
        cardTitle={'Sign up'}
        buttonTitle={'SignUp Now'}
        onSubmitPress={() => Register()}
        renderSecondDesign={
          <>
            {SignupFields.map((item, index) => {
              if (item.type !== 'owner') {
                return (
                  <View style={styles.inputCnt} key={index}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View
                      style={[
                        styles.inputView,
                        error[item.param] && {borderColor: 'red'},
                      ]}>
                      {item.keyboardType === 'dropDown' ? (
                        <>
                          <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={item.label}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Type'}
                            searchPlaceholder="Search..."
                            value={data[item.param]}
                            onChange={i => {
                              setData({...data, [item.param]: i.value});
                            }}
                          />
                        </>
                      ) : (
                        <AppTextInput
                          item={item}
                          value={data[item.param]}
                          setValue={text => {
                            setData({...data, [item.param]: text});
                          }}
                        />
                      )}
                    </View>
                  </View>
                );
              }
            })}
            {data.userType === 'owner' &&
              SignupFields.map((item, index) => {
                if (item.type === 'owner') {
                  return (
                    <View style={styles.inputCnt} key={index}>
                      <Text style={styles.title}>{item.title}</Text>
                      <View
                        style={[
                          styles.inputView,
                          error[item.param] && {borderColor: 'red'},
                        ]}>
                        <AppTextInput
                          item={item}
                          value={data[item.param]}
                          setValue={text => {
                            setData({...data, [item.param]: text});
                          }}
                        />
                      </View>
                    </View>
                  );
                }
              })}

            <Text
              style={[
                styles.actionbtn,
                {alignSelf: 'center', margin: '4%', color: 'black'},
              ]}
              onPress={() => navigation.goBack()}>
              Already have an account{' '}
              <Text style={{fontWeight: '600', color: 'red'}}>Login here.</Text>
            </Text>
          </>
        }
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  inputCnt: {marginVertical: 14},
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.titleFont,
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: '3%',
    borderColor: COLORS.inputBorder,
  },
  actionbtn: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.bluetext,
  },
});
