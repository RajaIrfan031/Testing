import React,{Component} from 'react';
import {View,UIManager} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
// import Geolocation from '@react-native-community/geolocation';
import { StatusBar } from 'react-native';
// Geolocation.setRNConfiguration();
// Geolocation.setRNConfiguration(config);

export default class App extends Component {
  componentDidMount (){
    StatusBar.setBarStyle("dark-content")
  }
  render() {
    return <AppNavigator />;
  }
}
