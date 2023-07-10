import {View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../components/SplashScreen';
import LoginScreen from '../components/LoginScreen';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import HomeScreen from '../components/HomeScreen';
import Notices from '../components/Notices';
import OnBoardingScreen from '../components/OnBoardingScreen';
import OtpScreen from '../components/OtpScreen';
import SetNewPassword from '../components/SetNewPassword';
import NoticeDetailScreen from '../components/NoticeDetailScreen';
import CompaintList from '../components/CompaintList';
import AddComplaints from '../components/Complaints/AddComplaints';
import ImageViewScreen from '../components/ImageViewScreen';
import ContactScreen from '../components/Contact/ContactScreen';
import ProfileScreen from '../components/Profile/ProfileScreen';
import EditProfileScreen from '../components/Profile/EditProfileScreen';
import FaqScreen from '../components/Profile/FaqListScreen';
import FaqDetailScreen from '../components/Profile/FaqDetailScreen';
import TakePaymentScreen from '../components/Profile/TakePaymentScreen';
import MainTainUserPayment from '../components/Profile/MainTainUserPayment';
import ComplaintDetailScreen from '../components/Complaints/ComplaintDetailScreen';
import ComplaintChatScreen from '../components/Complaints/ComplaintChatScreen';
import ChangePassword from '../components/Profile/ChangePassword';
import DocumentList from '../components/Document/DocumentList';
import DocumentDetailScreen from '../components/Document/DocumentDetailScreen';
import SocietyInfo from '../components/Society/SocietyInfo';
import LoginOptionsScreen from '../components/Login/LoginOptionsScreen';
import GuardHomeScreen from '../components/Guard/GuardHomeScreen';
import GuardEditProfile from '../components/Guard/GuardEditProfile';
import AddVisitor from '../components/Guard/AddVisitor';
import PaymentHistory from '../components/PaymentHistory';
import ResidentList from '../components/Resident/ResidentList';
import AddNewResident from '../components/Resident/AddNewResident';
import GuardList from '../components/Guard/GuardList';
import VisitorsList from '../components/Guard/VisitorsList';
import ContactDetail from '../components/Contact/ContactDetail';
import AppWebview from '../ReUsableComponents/AppWebview';
import CreateNotice from '../components/Notice/CreateNotice';
import EditNotice from '../components/Notice/EditNotice';
import CreateDocument from '../components/Document/CreateDocument';
import EditDocument from '../components/Document/EditDocument';
import CreateContact from '../components/Contact/CreateContact';
import SocietyEditScreen from '../components/Society/SocietyEditScreen';
import CreateGuard from '../components/Guard/CreateGuard';
import NotificationList from '../components/NotificationList';
import ServiceDetail from '../components/Service/ServiceDetail';
import SupportScreen from '../components/Service/SupportScreen';

const Stack = createNativeStackNavigator();

const mainNavigation = () => {
  const stackScreenWithNoHeader = (name, screen) => {
    return (
      <Stack.Screen
        name={name}
        component={screen}
        options={{headerShown: false}}
      />
    );
  };

  // const NoticeNavigationStack = () => {
  //   return (
  //     <Stack.Navigator initialRouteName="SplashScreen">
  //       {stackScreenWithNoHeader('SplashScreen', SplashScreen)}
  //     </Stack.Navigator>
  //   );
  // };

  function NoticeStackNavigator() {
    return (
      <Stack.Navigator>
        {stackScreenWithNoHeader('NoticeList', Notices)}
        {stackScreenWithNoHeader('NoticeDetailScreen', NoticeDetailScreen)}
        {stackScreenWithNoHeader('CreateNotice', CreateNotice)}
        {stackScreenWithNoHeader('EditNotice', EditNotice)}
      </Stack.Navigator>
    );
  }

  function ComplaintStackNavigator() {
    return (
      <Stack.Navigator>
        {stackScreenWithNoHeader('ComplainList', CompaintList)}
        {stackScreenWithNoHeader('ComplainDetailScreen', ComplaintDetailScreen)}
        {stackScreenWithNoHeader('AddComplain', AddComplaints)}
      </Stack.Navigator>
    );
  }

  function ProfileStackNavigator() {
    return (
      <Stack.Navigator>
        {stackScreenWithNoHeader('ProfileScreen', ProfileScreen)}
        {stackScreenWithNoHeader('EditProfileScreen', EditProfileScreen)}
        {stackScreenWithNoHeader('FaqListScreen', FaqScreen)}
        {stackScreenWithNoHeader('FaqDetailScreen', FaqDetailScreen)}
        {stackScreenWithNoHeader('ChangePasswordScreen', ChangePassword)}
        {stackScreenWithNoHeader('GuardEditProfileScreen', GuardEditProfile)}
        {stackScreenWithNoHeader('GuardListScreen', GuardList)}
        {stackScreenWithNoHeader('VisitorsListScreen', VisitorsList)}
      </Stack.Navigator>
    );
  }

  function DocumentStackNavigator() {
    return (
      <Stack.Navigator>
        {stackScreenWithNoHeader('DocumentList', DocumentList)}
        {stackScreenWithNoHeader('DocumentDetail', DocumentDetailScreen)}
        {stackScreenWithNoHeader('CreateDocument', CreateDocument)}
        {stackScreenWithNoHeader('EditDocument', EditDocument)}
      </Stack.Navigator>
    );
  }

  function ResidentStackScreens() {
    return (
      <Stack.Navigator>
        {stackScreenWithNoHeader('ResidentList', ResidentList)}
        {stackScreenWithNoHeader('AddNewResident', AddNewResident)}
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      {stackScreenWithNoHeader('SplashScreen', SplashScreen)}
      {stackScreenWithNoHeader('OnBoardingScreen', OnBoardingScreen)}
      {stackScreenWithNoHeader('LoginOptionsScreen', LoginOptionsScreen)}
      {stackScreenWithNoHeader('LoginScreen', LoginScreen)}
      {stackScreenWithNoHeader('SignUpScreen', SignUp)}
      {stackScreenWithNoHeader('ForgotPasswordScreen', ForgotPassword)}
      {stackScreenWithNoHeader('SetNewPasswordScreen', SetNewPassword)}
      {stackScreenWithNoHeader('OtpScreen', OtpScreen)}
      {stackScreenWithNoHeader('HomeScreen', HomeScreen)}
      {stackScreenWithNoHeader('GuardHomeScreen', GuardHomeScreen)}
      {stackScreenWithNoHeader('CreateGuardScreen', CreateGuard)}
      {stackScreenWithNoHeader('AddVisitor', AddVisitor)}
      {stackScreenWithNoHeader('NoticeScreen', NoticeStackNavigator)}
      {stackScreenWithNoHeader('ComplaintScreen', ComplaintStackNavigator)}
      {stackScreenWithNoHeader('ImageViewScreen', ImageViewScreen)}
      {stackScreenWithNoHeader('ContactScreen', ContactScreen)}
      {stackScreenWithNoHeader('ContactDetailScreen', ContactDetail)}
      {stackScreenWithNoHeader('ServiceDetailScreen', ServiceDetail)}
      {stackScreenWithNoHeader('CreateContact', CreateContact)}
      {stackScreenWithNoHeader('ProfileStackScreen', ProfileStackNavigator)}
      {stackScreenWithNoHeader('PaymentHistoryScreen', PaymentHistory)}
      {stackScreenWithNoHeader('ResidentStack', ResidentStackScreens)}
      {stackScreenWithNoHeader('TakePaymentScreen', TakePaymentScreen)}
      {stackScreenWithNoHeader('MainTainUserPayment', MainTainUserPayment)}
      {stackScreenWithNoHeader('ComplaintChatScreen', ComplaintChatScreen)}
      {stackScreenWithNoHeader('UpdateComplaint', AddComplaints)}
      {stackScreenWithNoHeader('DocumentStack', DocumentStackNavigator)}
      {stackScreenWithNoHeader('SocietyInfoScreen', SocietyInfo)}
      {stackScreenWithNoHeader('SocietyEditScreen', SocietyEditScreen)}
      {stackScreenWithNoHeader('Webview', AppWebview)}
      {stackScreenWithNoHeader('NotificationList', NotificationList)}
      {stackScreenWithNoHeader('SupportScreen', SupportScreen)}
    </Stack.Navigator>
  );
};

export default mainNavigation;
