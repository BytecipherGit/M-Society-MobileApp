import CardImage from '../assets/images/CardImage.svg';
import Complaints from '../assets/images/Compaints.svg';
import Contact from '../assets/images/Contact.svg';
import SocietyInfo from '../assets/images/SocietyInfo.svg';
import Document from '../assets/images/Document.svg';
import User from '../assets/images/User.svg';
import QuestionIcon from '../assets/images/QuestionIcon.svg';
import LockIcon from '../assets/images/LockIcon.svg';
import MoneyIcon from '../assets/images/MoneyIcon.svg';
import LogoutIcon from '../assets/images/LogoutIcon.svg';
import DocumentIcon from '../assets/images/DocumentIcon.svg';
import CalendotWithTheme from '../assets/images/CalendorWithTheme.svg';
import GuardProfileLocation from '../assets/images/guard/GuardProfileLocation.svg';
import GuardShiftIcon from '../assets/images/guard/GuardShiftIcon.svg';
import GuardProfileIcon from '../assets/images/guard/GuardProfileIcon.svg';

export const inputFields = [
  {
    id: 1,
    title: 'Phone Number',
    param: 'phoneNumber',
    keyboardType: 'number-pad',
    secureTextEntry: false,
  },
  {
    id: 2,
    title: 'Password',
    param: 'password',
    keyboardType: 'default',
    secureTextEntry: true,
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
    title: 'Password',
    param: 'password',
    keyboardType: 'default',
    secureTextEntry: true,
  },
  {
    id: 2,
    title: 'Re-enter Password',
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
    title: 'CONTACT',
    navigationScreen: 'ContactScreen',
    image: <Contact />,
  },
  {
    id: 5,
    title: 'DOCUMENT',
    navigationScreen: 'DocumentStack',
    image: <Document />,
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
    navigationScreen: 'FaqListScreen',
    icon: <QuestionIcon />,
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
    id: 5,
    title: 'Logout',
    navigationScreen: 'LoginOptionsScreen',
    icon: <LogoutIcon />,
  },
];

export const GuardprofileOptions = [
  {
    id: 1,
    title: 'Your Details',
    navigationScreen: 'GuardEditProfileScreen',
    icon: <DocumentIcon />,
  },
  {
    id: 5,
    title: 'Logout',
    navigationScreen: 'LoginOptionsScreen',
    icon: <LogoutIcon />,
  },
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
