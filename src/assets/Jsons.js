import {View} from 'react-native';
import CardImage from '../assets/images/CardImage.svg';
import Complaints from '../assets/images/Compaints.svg';
import Contact from '../assets/images/Contact.svg';
import SocietyInfo from '../assets/images/SocietyInfo.svg';
import Document from '../assets/images/Document.svg';
import User from '../assets/images/ProfileIcon.svg';
import QuestionIcon from '../assets/images/QuestionIcon.svg';
import LockIcon from '../assets/images/LockIcon.svg';
import MoneyIcon from '../assets/images/MoneyIcon.svg';
import LogoutIcon from '../assets/images/LogoutIcon.svg';
import DocumentIcon from '../assets/images/DocumentIcon.svg';
import CalendotWithTheme from '../assets/images/CalendorWithTheme.svg';
import GuardProfileLocation from '../assets/images/guard/GuardProfileLocation.svg';
import GuardShiftIcon from '../assets/images/guard/GuardShiftIcon.svg';
import GuardProfileIcon from '../assets/images/guard/GuardProfileIcon.svg';
import TakePayment from '../assets/images/TakePayment.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from './theme';
import PhoneSvg from '../assets/images/PhoneSvg.svg';
import FaqIcon from '../assets/images/FaqIcon.svg';
import TermService from '../assets/images/TermServiceIcon.svg';

export const inputFields = [
  {
    id: 1,
    title: 'Phone Number',
    param: 'phoneNumber',
    keyboardType: 'number-pad',
    secureTextEntry: false,
    showEyeIcon: false,
    countryCode: '91',
    renderIcon: () => (
      <View
        style={{
          marginRight: 10,
        }}>
        <PhoneSvg />
      </View>
    ),
  },
  {
    id: 2,
    title: 'Password',
    param: 'password',
    keyboardType: 'default',
    secureTextEntry: true,
    countryCode: null,
    showEyeIcon: true,
    renderIcon: () => (
      <MaterialCommunityIcons
        name="lock-outline"
        style={{
          fontSize: 20,
          marginRight: 10,
          color: COLORS.descFont,
        }}
      />
    ),
  },
];

export let ChangePasswordFields = [
  {
    id: 1,
    title: 'Old Password',
    param: 'oldPassword',
    keyboardType: 'default',
    secureTextEntry: true,
  },
  {
    id: 2,
    title: 'New Password',
    param: 'newPassword',
    keyboardType: 'default',
    secureTextEntry: true,
  },
  {
    id: 3,
    title: 'Confirm Password',
    param: 'cPassword',
    keyboardType: 'default',
    secureTextEntry: true,
  },
];

export const ChangePassword = [
  {
    id: 1,
    title: 'New Password',
    param: 'password',
    keyboardType: 'default',
    secureTextEntry: true,
  },
  {
    id: 2,
    title: 'Confirm Password',
    param: 'rePassword',
    keyboardType: 'default',
    secureTextEntry: true,
  },
];

export const SignupFields = [
  {
    id: 1,
    title: 'Name',
    param: 'name',
    keyboardType: 'default',
    secureTextEntry: false,
  },
  {
    id: 2,
    title: 'Password',
    param: 'password',
    keyboardType: 'default',
    secureTextEntry: true,
  },
  {
    id: 3,
    title: 'Address',
    param: 'address',
    keyboardType: 'default',
    secureTextEntry: false,
  },
  {
    id: 4,
    title: 'Phone Number',
    param: 'phoneNumber',
    keyboardType: 'number-pad',
    secureTextEntry: false,
  },
  {
    id: 5,
    title: 'House Number',
    param: 'houseNumber',
    keyboardType: 'number-pad',
    secureTextEntry: false,
  },
  {
    id: 6,
    title: 'Unique Code',
    param: 'uniqueCode',
    keyboardType: 'default',
    secureTextEntry: false,
  },
  {
    id: 7,
    title: 'Occupation',
    param: 'occupation',
    keyboardType: 'default',
    secureTextEntry: false,
  },
  {
    id: 8,
    title: 'User Type',
    param: 'userType',
    keyboardType: 'dropDown',
    label: [
      {label: 'Owner', value: 'owner'},
      {label: 'Rental', value: 'rental'},
    ],
    secureTextEntry: false,
  },
  {
    id: 9,
    title: 'Owner Name',
    param: 'ownerName',
    keyboardType: 'default',
    secureTextEntry: false,
    type: 'owner',
  },
  {
    id: 10,
    title: 'Owner Email',
    param: 'ownerEmail',
    keyboardType: 'default',
    secureTextEntry: false,
    type: 'owner',
  },
  {
    id: 11,
    title: 'Owner Address',
    param: 'ownerAddress',
    keyboardType: 'default',
    secureTextEntry: false,
    type: 'owner',
  },
  {
    id: 12,
    title: 'Owner Phone',
    param: 'ownerPhone',
    keyboardType: 'default',
    secureTextEntry: false,
    type: 'owner',
  },
];

export const ForgotField = [
  {
    id: 1,
    title: 'Phone Number',
    param: 'phoneNumber',
    keyboardType: 'number-pad',
    secureTextEntry: false,
    countryCode: '91',
    renderIcon: () => (
      <View
        style={{
          marginRight: 10,
        }}>
        <PhoneSvg />
      </View>
    ),
  },
];

export let SocietyOptions = [
  {
    id: 1,
    title: 'NOTICE',
    navigationScreen: 'NoticeScreen', //ComplaintChatScreen //NoticeScreen
    image: <CardImage />,
  },
  {
    id: 2,
    title: 'COMPLAINT',
    navigationScreen: 'ComplaintScreen',
    image: <Complaints />,
  },
  {
    id: 3,
    title: 'SOCIETY INFO',
    navigationScreen: 'SocietyInfoScreen',
    image: <SocietyInfo />,
  },
  {
    id: 4,
    title: 'PHONE DIRECTORY',
    navigationScreen: 'ContactScreen',
    image: <Contact />,
  },
  {
    id: 5,
    title: 'DOCUMENT',
    navigationScreen: 'DocumentStack',
    image: <Document />,
  },
  {
    id: 8,
    title: 'HISTORY',
    navigationScreen: 'PaymentHistoryScreen',
    image: <Document />,
  },
  {
    id: 7,
    title: 'RESIDENT',
    navigationScreen: 'ResidentStack',
    image: <SocietyInfo />,
  },
  {
    id: 9,
    title: 'SERVICE PROVIDER',
    navigationScreen: 'ServiceCategories',
    param: {screenName: 'Service'},
    image: <Contact />,
  },
];

export const profileOptions = [
  {
    id: 1,
    title: 'Edit Profile',
    navigationScreen: 'EditProfileScreen',
    icon: <User />,
  },
  {
    id: 2,
    title: 'FAQ',
    navigationScreen: 'Webview',
    icon: <FaqIcon />,
    param: {screenName: 'FAQ'},
    urlParam: 'http://43.231.127.169:9004/faqs',
  },
  {
    id: 3,
    title: 'Change Password',
    navigationScreen: 'ChangePasswordScreen',
    icon: <LockIcon />,
  },
  // {
  //   id: 4,
  //   title: 'Take Payment',
  //   navigationScreen: 'TakePaymentScreen',
  //   icon: <MoneyIcon />,
  // },

  {
    id: 6,
    title: 'Society Guards',
    navigationScreen: 'GuardListScreen',
    icon: <User />,
  },
  {
    id: 7,
    title: 'Visitors',
    navigationScreen: 'VisitorsListScreen',
    icon: <User />,
  },
  // {
  //   id: 8,
  //   title: 'Maintainance Setting',
  //   navigationScreen: 'LoginOptionsScreen',
  //   icon: <TermService />,
  // },
  {
    id: 9,
    title: 'Terms & Conditions',
    navigationScreen: 'Webview',
    icon: <TermService />,
    param: {screenName: 'Terms & Conditions'},
    urlParam: 'http://43.231.127.169:9004/terms-conditions',
  },
  {
    id: 10,
    title: 'Support',
    navigationScreen: 'SupportScreen',
    icon: <TermService />,
    param: {screenName: 'Support'},
  },
  // {
  //   id: 5,
  //   title: 'Logout',
  //   navigationScreen: 'LoginOptionsScreen',
  //   icon: <LogoutIcon />,
  // },
];

export const GuardprofileOptions = [
  {
    id: 1,
    title: 'Your Details',
    navigationScreen: 'GuardEditProfileScreen',
    icon: <DocumentIcon />,
  },
  // {
  //   id: 5,
  //   title: 'Logout',
  //   navigationScreen: 'LoginOptionsScreen',
  //   icon: <LogoutIcon />,
  // },
];

export const editUserJson = [
  {
    id: 1,
    title: 'Name',
    param: 'name',
    keyboardType: 'default',
  },
  // {
  //   id: 2,
  //   title: 'Address',
  //   param: 'address',
  //   keyboardType: 'default',
  // },
  // {
  //   id: 3,
  //   title: 'House Number',
  //   param: 'houseNumber',
  //   keyboardType: 'number-pad',
  // },
  // {
  //   id: 4,
  //   title: 'Phone Number',
  //   param: 'phoneNumber',
  //   keyboardType: 'number-pad',
  // },
];

export const SocietyInfoArray = [
  {title: 'Society Name', value: 'name'},
  {
    title: 'Registration Nunmber',
    value: 'registrationNumber',
  },
  {title: 'Country', value: 'country'},
  {title: 'State', value: 'state'},
  {title: 'City', value: 'city'},
  {title: 'Zip / Pin Code', value: 'pin'},
  {
    title: 'Society Address',
    value: 'address',
  },
  {title: 'Unique ID', value: 'uniqueId'},
  {title: 'Date', value: 'createdDate'},
  {
    title: 'Subscription Plan',
    value: 'subscriptionType',
  },
];

export const loginType = [
  {
    id: 1,
    title: 'Residence',
    icon: require('../assets/images/ResidentUserImg.png'),
  },
  {
    id: 2,
    title: 'Security',
    icon: require('../assets/images/GuardUserIcon.png'),
  },
];

export const guardDetailOptions = [
  {
    id: 1,
    title: 'Joining Date',
    param: 'joiningDate',
    icon: <GuardProfileIcon />,
  },
  {
    id: 2,
    title: 'Address',
    param: 'address',
    icon: <GuardProfileLocation />,
  },
  {
    id: 3,
    title: 'Shift',
    param: 'shift',
    icon: <GuardShiftIcon />,
  },
  {
    id: 4,
    title: 'Date Of Birth',
    param: 'dob',
    icon: <CalendotWithTheme />,
  },
  {
    id: 5,
    title: 'ID Proof',
    param: 'idProof',
    icon: <CalendotWithTheme />,
  },
];
export const VisitorsFakeList = [
  {
    _id: 1,
    name: 'Dianne Russell',
    inTime: '2023-02-23T05:45:26.437Z',
    outTime: '2023-02-23T05:45:26.437Z',
    houseNumber: '301',
    block: 'B',
    profilePic:
      'https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.jpg?b=1&s=170667a&w=0&k=20&c=XPuGhP9YyCWquTGT-tUFk6TwI-HZfOr1jNkehKQ17g0=',
  },
  {
    _id: 2,
    name: 'Dianne Russell',
    inTime: '2023-02-23T05:45:26.437Z',
    outTime: '',
    houseNumber: '301',
    block: 'B',
    profilePic:
      'https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.jpg?b=1&s=170667a&w=0&k=20&c=XPuGhP9YyCWquTGT-tUFk6TwI-HZfOr1jNkehKQ17g0=',
  },
];

export const AddVisitorFields = [
  {
    id: 5,
    title: 'Attach Photo',
    keyboardType: 'image-Picker',
    param: 'image',
  },
  {
    id: 1,
    title: 'Phone Number',
    keyboardType: 'number-pad', //default
    param: 'phoneNumber',
    countryCode: 91,
  },
  {
    id: 2,
    title: 'Enter Name',
    keyboardType: 'default',
    param: 'name',
  },
  {
    id: 3,
    title: 'House Number',
    keyboardType: 'default',
    param: 'houseNumber',
  },
  {
    id: 4,
    title: 'Reason for Visit',
    keyboardType: 'default',
    param: 'reasone',
  },
];

export let AddResidenceUserJson = [
  {
    id: 1,
    title: 'Name',
    keyboardType: 'default',
    param: 'name',
    type: 'Input',
  },
  {
    id: 2,
    title: 'Email',
    keyboardType: 'email-address',
    param: 'email',
    type: 'Input',
  },
  {
    id: 3,
    title: 'Phone Number',
    keyboardType: 'number-pad',
    param: 'phoneNumber',
    type: 'phoneNumber',
  },
  {
    id: 4,
    title: 'House / Flat Number',
    keyboardType: 'number-pad',
    param: 'houseNumber',
    type: 'Input',
  },
  {
    id: 5,
    title: 'Profession',
    keyboardType: 'default',
    param: 'occupation',
    type: 'dropDown',
    value: [],
  },
  {
    id: 6,
    title: 'Role',
    keyboardType: 'default',
    param: 'designationId',
    type: 'dropDown',
    value: [],
  },
  {
    id: 7,
    title: 'Resident Type',
    keyboardType: 'default',
    param: 'userType',
    type: 'dropDown',
    value: [
      {label: 'Rental', value: 'rental'},
      {label: 'Owner', value: 'owner'},
    ],
  },
];

export const ColorsArray = [
  {
    id: 1,
    title: 'Primary Color',
    param: 'primaryColour',
  },
  {
    id: 2,
    title: 'Button HoverBack Color',
    param: 'buttonHoverBgColour',
  },
  {
    id: 3,
    title: 'Button HoverFront Color',
    param: 'buttonHoverfontColour',
  },
  {
    id: 4,
    title: 'Font Colour',
    param: 'fontColour',
  },
];

export const AddGuardJson = [
  {
    id: 1,
    title: 'Name',
    placeHolder: 'Enter guard name Here',
    param: 'name',
  },
  {
    id: 2,
    title: 'Address',
    placeHolder: 'Enter Address here.',
    param: 'address',
  },
  {
    id: 3,
    title: 'Phone Number',
    placeHolder: '0000000000',
    param: 'phoneNumber',
    keyboardType: 'phone-pad',
  },
  {
    id: 4,
    title: 'Profile Image',
    placeHolder: 'Click to add Guard profile image.',
    param: 'profileImage',
  },
  {
    id: 8,
    title: 'Id Proof',
    placeHolder: 'Click to add Guard Id profile.',
    param: 'idProof',
  },
  {
    id: 5,
    title: 'Date Of Birth',
    placeHolder: 'Click to select.',
    param: 'dob',
  },
  {
    id: 6,
    title: 'Shift',
    placeHolder: 'Select Guard Shift.',
    param: 'shift',
  },
  {
    id: 7,
    title: 'Joining Date',
    placeHolder: 'Select Guard Joining Date.',
    param: 'joiningDate',
  },
];

export const createNoticeJson = [
  {id: 1, title: 'Title', params: 'title'},
  {id: 2, title: 'Description', params: 'description'},
  {id: 3, title: 'Status', params: 'status'},
  {id: 4, title: 'Attach File', params: 'attachedFile'},
];
