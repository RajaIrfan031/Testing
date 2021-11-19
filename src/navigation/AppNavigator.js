import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthLoading from '../screens/auth/AuthLoadingScreen'; 

import Entrance from '../screens/auth/Entrance';
import Login from '../screens/auth/LoginScreen';
import EnterPhoneNumber from '../screens/auth/EnterPhoneNumber'
import CreatePassword from '../screens/auth/CreatePassword'
import VerifyOTP from '../screens/auth/VerifyOTP'
import TermsConditions from '../screens/auth/TermsConditions'
import OTPReset from '../screens/auth/OTPReset';

import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import UploadDocumentsScreen from '../screens/profile/UploadDocumentsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import CreateNewBankAccount from '../screens/wallet/CreateNewBankAccount';
import ShowTransactions from '../screens/transaction/ShowTransactions';

import ShowTaskScreen from '../screens/tasks/ShowTaskScreen';
import ShowCompletedTaskScreen from '../screens/tasks/ShowCompletedTaskScreen';
import AllTasksScreen from '../screens/tasks/AllTasksScreen';
import RemainingTasksScreen from '../screens/tasks/RemainingTasksScreen';
import CompletedTasksScreen from '../screens/tasks/CompletedTasksScreen';
import StartedTasksScreen from '../screens/tasks/StartedTasksScreen';
import EditBankAccountScreen from '../screens/bankaccount/EditBankAccountScreen';
import BankAccountScreen from '../screens/bankaccount/BankAccountScreen';
import ResetPasswordPhone from '../screens/auth/ResetPasswordPhone';
import ResetPassword from '../screens/auth/ResetPassword';

const BottomTab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const StackHome = createStackNavigator();
const StackApp = createStackNavigator();

export default class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {refresh: true};
    StatusBar.setBarStyle('dark-content');
  }
  AuthStack = () => (
    <Stack.Navigator
      initialRouteName="Entrance"
      screenOptions={{headerShown: false, headerShown: false}}>
      <Stack.Screen name={'Entrance'} component={Entrance} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'CreatePassword'} component={CreatePassword} />
      <Stack.Screen name={'EnterPhoneNumber'} component={EnterPhoneNumber} />
      <Stack.Screen name={'VerifyOTP'} component={VerifyOTP} />
      <Stack.Screen name={'TermsConditions'} component={TermsConditions} />
      <Stack.Screen name={'ResetPasswordPhone'} component={ResetPasswordPhone}/>
      <Stack.Screen name={'ResetPassword'} component={ResetPassword}/>
      <Stack.Screen name={'OTPReset'} component={OTPReset} />
    </Stack.Navigator>
  );

    TasksStack = () => (
        <StackHome.Navigator initialRouteName={'HomeScreen'} screenOptions={{headerShown: false, headerShown: false}}>
          <StackHome.Screen name={'RemainingTasksScreen'} component={RemainingTasksScreen} screenOptions={{headerShown: false, headerShown: false}}/>
          <StackHome.Screen name={'AllTasksScreen'} component={AllTasksScreen} screenOptions={{headerShown: false, headerShown: false}}/>
          <StackHome.Screen name={'HomeScreen'} component={HomeScreen} />
          <StackHome.Screen name={'CompletedTasksScreen'} component={CompletedTasksScreen} />
          <StackHome.Screen name={'StartedTasksScreen'} component={StartedTasksScreen} />
        </StackHome.Navigator>
    );
    
    BottomStackScreen = ({navigation}) => (
    
    <BottomTab.Navigator
    initialRouteName="ProfileScreen"
    activeColor="#006600"
    label={{fontSize: 24}}
    barStyle={{backgroundColor:'white', paddingHorizontal:10,paddingVertical:5,borderTopLeftRadius:25,borderTopRightRadius: 25,color:'#006600'}}
     >
        <BottomTab.Screen
        name="HomeScreen"
        component={this.TasksStack}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={26} />
            ),
        }}
        screenOptions={{headerShown: false, headerShown: false}}
        />
        <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-supervisor-outline" color={color} size={26} />
            ),
        }}
        />
        <BottomTab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={26} />
            ),
            
        }}
        /> 
    </BottomTab.Navigator>
    );

  render() {
    return (
      <NavigationContainer>
        <StackApp.Navigator
          initialRouteName="AuthLoading"
          screenOptions={{headerShown: false}}>
          <StackApp.Screen name={'AuthLoading'} component={AuthLoading} />
          <StackApp.Screen name={'AuthStack'} component={this.AuthStack} />
          <StackApp.Screen name={'App'} component={this.BottomStackScreen} />
          <StackApp.Screen name={'EditProfileScreen'} component={EditProfileScreen} />
          <StackApp.Screen name={'UploadDocumentsScreen'} component={UploadDocumentsScreen} />
          <StackApp.Screen name={'WalletScreen'} component={WalletScreen} />
          <StackApp.Screen name={'CreateNewBankAccount'} component={CreateNewBankAccount} />
          <StackApp.Screen name={'BankAccountScreen'} component={BankAccountScreen} />
          <StackApp.Screen name={'EditBankAccountScreen'} component={EditBankAccountScreen} />
          <StackApp.Screen name={'ShowTaskScreen'} component={ShowTaskScreen} />
          <StackApp.Screen name={'ShowCompletedTaskScreen'} component={ShowCompletedTaskScreen} />
          <StackApp.Screen name={'ShowTransactions'} component={ShowTransactions} />
          
        </StackApp.Navigator>
      </NavigationContainer>
    );
  }
}