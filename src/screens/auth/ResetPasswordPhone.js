/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text} from 'native-base';
import styles from '../../styles/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {url} from '../../constants/constant';
import axios from 'axios';
import PhoneInput from 'react-native-phone-input';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
  async login() {
    const {value, Numbers} = this.state;
    await auth()
      .signInWithPhoneNumber(value + Numbers)
      .then(async confirmResult => {
        console.log(confirmResult)
        if (confirmResult) {
          this.setState({isLoading: false});
          this.props.navigation.navigate('OTPReset', {
            phoneNo: value + Numbers,
            confirmResult: confirmResult,
          });
        }
      })
      .catch(error => {
        this.setState({
          error: true,
          isLoading: false,
          errorText:
            error.toString().indexOf('block') !== -1
              ? 'Please try again later.'
              : null,
        });
        this.setState({isLoading: false});
      });
  }
  Navigate = () => {
    const {Numbers, value} = this.state;
    if (Numbers === '') {
      this.setState({
        error: true,
        isLoading: false,
        errorText: 'Phone Number must not be empty.',
      });
    }
    if (value === '') {
      this.setState({
        error: true,
        isLoading: false,
        errorText: 'Country Code must not be empty.',
      });
    } else if (value !== '' && Numbers !== '') {
      let string = Numbers.indexOf(0) == '0' ? Numbers.substring(1) : Numbers;
      this.setState({Numbers: string});
      console.log();
      try{
        //const token = await AsyncStorage.getItem("token")
      fetch(url+'/verifyphone',{
        method:"POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "phone": value+Numbers,
        })
      })
    .then(res=>{
      try{
        console.log(res["ok"]);
               if(res["ok"]==false){
                  this.setState({
                  error: true,
                  errorText: "Phone number does not exist.",
                  isLoading: false,
                  });
               }else{
                 console.log("Registered.")
                 this.login();
               }
              }
      catch(error){
        this.setState({
          error: true,
            errorText: "Your request cannot be proceeded.",
            isLoading: false,
        })
      }
     })
    }catch(error){
      console.log('errorororo')
    }
    //   try{
    //     //const token = await AsyncStorage.getItem("token")
    // fetch(url+'/verifyphone',{
    //    method:"POST",
    //    headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "multipart/form-data",
    //     },
    //   body:JSON.stringify({
    //     "phone":value+Numbers,
    //   })
    //  })
    // .then(res=>res.json())
    //  .then(async (response)=>{
    //    console.log(response);
    //    if(response.error){
    //      console.log("in error: ");
    //     if (response.error=="Phone number not found.") {
    //       this.setState({
    //         error: true,
    //         errorText: 'Phone Number does not exist.',
    //         isLoading: false,
    //       });
    //     }  
    //    }
    //   //  if (response.error!="Phone number not found.") {
    //   //       this.setState({isLoading: false}, async () => {
    //   //         await this.login();
    //   //         // this.props.navigation.navigate('OTPReset', {phoneNo: Numbers});
    //   //       });
    //   //   }
    //     else {
    //       this.setState({isLoading: false}, async () => {
    //         await this.login();
    //         // this.props.navigation.navigate('OTPReset', {phoneNo: Numbers});
    //       });
    //       }
    //  })
    // }catch(error){
    //   console.log('errorororo')
    // }
  }
    
  };
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
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

              <Text style={[styles.welback, {width: '38%'}]}>
                Reset Password
              </Text>
              <View style={{width: '30%'}} />
            </View>
            <Text style={styles.continue}>
              Type in your phone number to reset password
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
                  textStyle={{color: '#006600'}}
                  textProps={{placeholderTextColor: '#7D9678'}}
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
                value={this.state.Numbers}
                maxLength={14}
                onChangeText={val => {
                  this.setState({Numbers: val, error: false, isLoading: false});
                }}
              />
            </View>

            {this.state.error ? (
              <View style={[styles.ErrorView, {width: '70%'}]}>
                <Text style={styles.ErrorText}>{this.state.errorText}</Text>
              </View>
            ) : null}

            <View style={{justifyContent: 'flex-end', height: '68%'}}>
              {this.state.isLoading ? (
                <View style={styles.buttonTouch}>
                  <ActivityIndicator color={'#fff'} size={'large'} />
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonTouch]}
                  onPress={() =>
                    this.setState({isLoading: true}, async () => {
                      await Keyboard.dismiss();
                      await this.Navigate();
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
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default Signin;
