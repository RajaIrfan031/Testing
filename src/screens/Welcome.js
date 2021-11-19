import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import {Text} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import styles from '../styles/styles';
import {url} from '../constants/constant';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';
import PhoneInput from 'react-native-phone-input';
import Entypo from 'react-native-vector-icons/Entypo';

const DismissKeyboard = ({children}) =>
  Platform.OS === 'android' ? (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
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

class Welcome extends Component {
  constructor(props) {
    super(props);
    // this.onPressFlag = this.onPressFlag.bind(this);
    // this.selectCountry = this.selectCountry.bind(this);

    this.state = {
      showPass: false,
      phoneNo: '',
      error: false,
      errorText: '',
      PasswordErrorText: '',
      Passerror: false,
      password: '',
      isLoading: false,
      cca2: 'PK',
      valid: '',
      type: '',
      value: '+971',
      pickerData: null,
      visible: false,
    };
  }
  changeCode = val => {
    this.setState({value: val});
  };

  Navigate = async () => {
    if (this.state.value === '') {
      this.setState({
        error: true,
        errorText: 'Country Code must not be Empty.',
        isLoading: false,
      });
    }
    if (this.state.phoneNo === '') {
      this.setState({
        error: true,
        errorText: 'Phone no must not be Empty.',
        isLoading: false,
      });
    }
     if (this.state.phoneNo.length<8) {
      this.setState({
        error: true,
        errorText: 'Phone no is invalid.',
        isLoading: false,
      });
    }
    if (this.state.password === '') {
      this.setState({
        Passerror: true,
        PasswordErrorText: 'Please Enter Valid Password.',
        isLoading: false,
      });
    } else if (this.state.phoneNo !== '' && this.state.password !== '') {
      let Numbers = this.state.phoneNo
      let string = Numbers.indexOf(0) == '0' ? Numbers.substring(1) : Numbers;
      // console.log(this.state.value + string)
      this.setState({
        phoneNo: string,
        isLoading: false
      })
        const token = await AsyncStorage.getItem("token")
       fetch(url+"/signin",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
          "phone":this.state.value+this.state.phoneNo,
          "password":this.state.password,
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              await AsyncStorage.setItem('token',data.token)
              this.props.navigation.navigate("App")
            } catch (e) {
              this.setState({
              Passerror: true,
              PasswordErrorText: 'Incorrect Phone Number or Password.',
              isLoading: false,
            });
              console.log("....Error.... ",e)
            }
      })
    }
  }

      // await axios
      //   .post(url + '/customerAuth/login', {
      //     phoneNo: this.state.value + string,
      //     password: this.state.password,
      //   })

      // await axios
      //   .get('http://127.0.0.1:3000/users')
    //     .then(async Response => {
    //       if (Response.data.data === 'ok') {
    //         console.log('testing')
    //         let token = decode(Response.data.token);
    //         await AsyncStorage.setItem('Token', Response.data.token);
    //         await AsyncStorage.setItem('UserID', '' + token.id);
    //         this.setState({isLoading: false}, () => {
    //           this.setState({
    //             Passerror: false ,
    //             PasswordErrorText: '',
    //           });
    //           this.props.navigation.navigate('App', {change: true});
    //         });
    //       } else {
    //         this.setState({
    //           Passerror: true,
    //           PasswordErrorText: 'Incorrect Phone Number or Password.',
    //           isLoading: false,
    //         });
    //       }
    //     })
    //     .catch(error => {
    //       //console.log(error);
    //     });

    // } else {
    //   this.setState({isLoading: false});
    // }
  //};

  updateInfo() {
    this.setState(
      {
        value: this.phone.getValue(),
        error: false,
      },
      () => {
        //console.log('VAUE', this.phone.getValue());
      },
    );
  }
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    return (
      <DismissKeyboard>
        <View style={{justifyContent: 'center'}}>
          <ScrollView>
            <KeyboardAvoidingView
              behavior={'position'}
              keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 20}>
              <View style={styles.container}>
              <View
                  style={{
                    height: responsiveHeight(30),
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../Image/GRDN1.png')}
                    style={{
                      resizeMode: 'contain',
                      width: '50%',
                      height: '100%',
                    }}
                  />
                </View>
                {/* <Text style={styles.weleng}>Welcome to BOBI!</Text>
                <Text style={styles.welarb}>مرحبابكم في بوبي!</Text>
                <Text style={styles.logeng}>BOBI</Text>
                <Text style={styles.slogeng}>Maintenance Services</Text>
                <Text style={styles.logarb}>بوبي</Text>
                <Text style={styles.slogarb}>خدمات الصيانة</Text>*/}
                <Text style={styles.enteng}>
                  Please enter the phone number below to Login.
                </Text>
                <Text style={styles.entarb}>
                  الرجاء إدخال رقم الهاتف أدناه لتسجيل الدخول / التسجيل.
                </Text> 
            
                <View
                  style={[
                    styles.inputView,
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
                    style={[
                      styles.inputsStyles,
                      {width: '70%', borderWidth: 0},
                    ]}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    value={this.state.phoneNo}
                    maxLength={14}
                    onChangeText={val => {
                      this.setState({phoneNo: val, error: false});
                    }}
                  />
                </View>
                {this.state.error ? (
                  <View style={styles.ErrorView}>
                    <Text style={styles.ErrorText}>{this.state.errorText}</Text>
                  </View>
                ) : null}
                <View style={[styles.inputView]}>
                  <View
                    style={[
                      styles.inputsStyles,
                      {
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      },
                    ]}>
                    <TextInput
                      style={{
                        width: '80%',
                        height: '100%',
                        padding: 0,
                        margin: 0,
                      }}
                      placeholder="Password"
                      secureTextEntry={!this.state.showPass}
                      value={this.state.password}
                      onChangeText={val => {
                        this.setState({password: val, Passerror: false});
                      }}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({showPass: !this.state.showPass})
                      }
                      style={{right: responsiveWidth(2)}}>
                      <Entypo
                        name={'eye'}
                        size={responsiveFontSize(2.8)}
                        color={this.state.showPass ? '#000' : 'grey'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {this.state.Passerror ? (
                  <View style={styles.ErrorView}>
                    <Text style={styles.ErrorText}>
                      {this.state.PasswordErrorText}
                    </Text>
                  </View>
                ) : null}

                {this.state.isLoading ? (
                  <View style={styles.buttonTouch}>
                    <ActivityIndicator size={'large'} color={'#fff'} />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      marginTop: responsiveHeight(2),
                      justifyContent: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#006600',
                      borderRadius: 10,
                      width: '80%',
                      height: responsiveHeight(7.5),
                    }}
                    onPress={() => {
                      this.setState({isLoading: true}, () => {
                        this.Navigate();
                      });
                    }}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 16,
                        color: 'white',
                        textTransform: 'uppercase',
                      }}>
                      {'Sign in'}
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={{marginVertical: responsiveHeight(2)}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ResetPasswordPhone')
                    }
                    style={{
                      alignSelf: 'center',
                      marginTop: responsiveHeight(1),
                    }}>
                    <Text style={styles.forgot}>{'Forgot Password?'}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={styles.contentText}>
                      {'Don`t have an account? '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Signin')}>
                      <Text style={{color: '#5DC7D1'}}>{'Sign Up'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </DismissKeyboard>
    );
  }
}

export default Welcome;