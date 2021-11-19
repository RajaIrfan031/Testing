import React, {Component} from 'react';
import {View, Text, StatusBar, SafeAreaView, Image, ActivityIndicator} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthLoadingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = async () => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor(Colors.white);
    const Token = await AsyncStorage.getItem('token');
    if (Token !== null) {
      setTimeout(() => {
        this.props.navigation.replace('App');
      }, 2000);
    } else if (Token === null) {
      setTimeout(() => {
        this.props.navigation.navigate('AuthStack');
      }, 2000);
    }
  };
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}> 

        <View style={{paddingBottom: 100}}> 
          <Image style={{width: 250, height: 50,resizeMode: 'stretch'}} source={require('../../../assets/logo.jpeg')} />
        </View>
      </SafeAreaView>
    );
  }
}

export default AuthLoadingScreen;
