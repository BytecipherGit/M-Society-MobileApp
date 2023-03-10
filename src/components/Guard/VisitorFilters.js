import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {COLORS} from '../../assets/theme';
import Caledor from '../../assets/images/CalendorWithTheme.svg';
import DatePicker from 'react-native-date-picker';

const VisitorFilters = () => {
  return (
    <View style={styles.filterCnt}>
      {['From:', 'To:'].map((item, index) => (
        <View key={index} style={{width: '49%'}}>
          <DescriptionText
            text={item}
            style={{
              color: COLORS.inputtext,
            }}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.datePickerButton}>
            <DescriptionText
              text={'DD/MM/YYYY'}
              style={styles.datePickerButtonTitle}
            />
            <Caledor height={20} />
          </TouchableOpacity>
        </View>
      ))}
      <DatePicker
        modal
        open={true}
        mode="date"
        date={new Date()}
        onConfirm={date => {
          console.log(date);
        }}
        onCancel={() => {
          null;
        }}
      />
    </View>
  );
};

export default VisitorFilters;

const styles = StyleSheet.create({
  filterCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%',
    marginBottom: '2.5%',
  },
  datePickerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: COLORS.inputBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 1000,
    marginTop: '5%',
  },
  datePickerButtonTitle: {
    marginVertical: '7%',
    fontSize: 10,
    color: '#6B737F',
  },
});
