import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  StatusBar,
  Alert,
} from 'react-native';
import {Text, Icon} from 'native-base';
import styles from '../styles/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {url} from '../constants/constant';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-input';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DismissKeyboard = ({children}) =>
  Platform.OS === 'android' ? (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {children}
    </SafeAreaView>
  ) : (
    <TouchableOpacity
      activeOpacity={1}
      style={{flex: 1, justifyContent: 'center'}}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {children}
    </TouchableOpacity>
  );

class Signin extends Component {
  state = {
    error: false,
    errorText: '',
    Numbers: '',
    isLoading: false,
    value: '+971',
  };
  updateInfo() {
    this.setState({
      value: this.phone.getValue(),
      error: false,
    });
  }
  changeCode = val => {
    this.setState({value: val});
  };

Navigate1 = async () => {
    const {value, Numbers} = this.state;
    console.log(url);
     if (value && Numbers) {
       try{
        const token = await AsyncStorage.getItem("token")
        fetch(url+'/checkphone',{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "phone":value+Numbers,
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              //await AsyncStorage.setItem('token',data.token)
              this.setState({
        error: true,
        errorText: 'Your phone number is already registered.',
        isLoading: false,
      });
            } catch (error) {
              console.log("Not registered")
              this.login();
            }
     })
        .catch(error => {
          this.login();
          console.log("This Phone number is already registered.");
          this.setState({
        error: true,
        errorText: 'Your phone number is already registered.',
        isLoading: false,
      });
        });
    }catch(error){
      console.log('errorororo')
    }
     }
  };
  async login() {
    const {value, Numbers} = this.state;
    await auth()
      .signInWithPhoneNumber(value + Numbers)
      .then(async (confirmResult) => {
         console.log(confirmResult)
        if (confirmResult) {
          this.setState({isLoading: false});
          this.props.navigation.navigate('Verify', {
            phoneNo: value + Numbers,
            confirmResult: confirmResult,
          });
        }
      })
      .catch((error) => {
        // console.log(error)
        this.setState({
          error: true,
          isLoading: false,
          errorText:
            error.toString().indexOf('block') !==-1
              ? 'Please try again later.'
              : null,
        });
        this.setState({isLoading: false});
      });
  }

  Navigate = async () => {
    const {Numbers, error, value} = this.state;
    if (Numbers === '') {
      this.setState({
        error: true,
        errorText: 'Phone Number must not be empty.',
        isLoading: false,
      });
    }
    else if(Numbers.length!=9 && Numbers.length!=10){
      this.setState({
        error: true,
        errorText: 'Phone Number must be valid.',
        isLoading: false,
      });
    }
    else if (value === '') {
      this.setState({
        error: true,
        errorText: 'Country Code must not be empty.',
        isLoading: false,
      });
    } else if (!error) {
      let string = Numbers.indexOf(0) == '0' ? Numbers.substring(1) : Numbers;
      console.log(this.state.value + string)
      this.setState({Numbers: string})
      this.setState({isLoading: false}, async () => {
     await this.Navigate1();
      });
      } 
      else {
      this.setState({isLoading: false});
    }
  };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }
  render() {
    return (
      <DismissKeyboard>
        <SafeAreaView
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{paddingLeft: responsiveWidth(10), width: '33%'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{width: '100%'}}>
                <FontAwesome
                  name={'chevron-left'}
                  size={responsiveFontSize(2.5)}
                  color="#006600"
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.welback, {width: '33%'}]}>Sign Up</Text>
            <View style={{width: '33%'}} />
          </View>

          <Text style={styles.continue}>
            Type in your phone number to continue
          </Text>

          <View
            style={[
              {
                marginTop: responsiveHeight(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#A6A6A6',
                height: responsiveHeight(6),
                paddingLeft: responsiveWidth(1),
                width: '70%',
                alignSelf: 'center',
              },
            ]}>
            <View style={{width: '30%'}}>
              <PhoneInput
                initialCountry={'ae'}
                onPressFlag={this.onPressFlag}
                onSelectCountry={() => this.updateInfo()}
                onChangePhoneNumber={val => this.changeCode(val)}
                value={this.state.value}
                ref={ref => {
                  this.phone = ref;
                }}
              />
            </View>
            <TextInput
              style={[styles.inputsStyles, {borderWidth: 0, width: '70%'}]}
              placeholder={'Phone Number'}
              keyboardType={'phone-pad'}
              placeholderTextColor={'#7D9678'}
              value={this.state.Number}
              maxLength={14}
              onChangeText={val => {
                this.setState({Numbers: val, error: false});
              }}
            />
          </View>
          {this.state.error ? (
            <View style={styles.ErrorView}>
              <Text style={styles.ErrorText}>{this.state.errorText}</Text>
            </View>
          ) : null}
          <View style={{height: '68%', justifyContent: 'flex-end'}}>
            {this.state.isLoading ? (
              <View style={styles.buttonTouch}>
                <ActivityIndicator size={'large'} color={'#fff'} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.buttonTouch}
                onPress={() =>
                  this.setState({isLoading: true}, () => {
                    this.Navigate();
                  })
                }>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    fontSize: 16,
                    color: 'white',
                    textTransform: 'uppercase',
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

export default Signin;