import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {COLORS} from '../../assets/theme';
import Caledor from '../../assets/images/CalendorWithTheme.svg';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const VisitorFilters = ({filters, setFilters}) => {
  const [modal, setModal] = useState(false);
  // const [status, setStatus] = useState({
  //   status: '',
  //   From: '',
  //   To: '',
  // });

  // console.log('status', status);
  // console.log('filters', filters);

  return (
    <View style={styles.filterCnt}>
      {['From', 'To'].map((item, index) => (
        <View key={index} style={{width: '49%'}}>
          <DescriptionText
            text={item + ':'}
            style={{
              color: COLORS.inputtext,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.datePickerButton}
            onPress={() => {
              setModal(true);
              // setStatus({...status, status: item});
              setFilters({...filters, status: item});
            }}>
            <DescriptionText
              text={
                filters[item]
                  ? moment(`${filters[item]}`).format('DD/MM/YYYY')
                  : 'DD/MM/YYYY'
              }
              style={styles.datePickerButtonTitle}
            />
            <Caledor height={20} />
          </TouchableOpacity>
        </View>
      ))}
      <DatePicker
        modal
        open={modal}
        mode="date"
        date={new Date()}
        onConfirm={date => {
          setModal(false);
          // setStatus({...status, [status.status]: date});
          setFilters({...filters, [filters.status]: date});
        }}
        onCancel={() => {
          setModal(false);
        }}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default VisitorFilters;

const styles = StyleSheet.create({
  filterCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '6%',
    marginBottom: '2.5%',
    width: '95%',
    alignSelf: 'center',
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
