import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Text} from 'native-base';
import styles from '../styles/styles';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {url} from '../constants/constant';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
class CreatePassword extends Component {
  state = {
    showPass: false,
    Password: '',
    error: false,
    errorText: '',
    Name: '',
    NameErrorText: '',
    NameError: false,
    isLoading: false,
  };
  VerifyPassword = val => {
    let passwordRegix = /^(?=.*\d).{8,100}$/;
    if (passwordRegix.test(val)) {
      this.setState({error: false, errorText: '', Password: val});
    } else if (val === '') {
      this.setState({error: false, errorText: '', Password: val});
    } else {
      this.setState({
        error: true,
        errorText:
          'Password must be atleast 8 digits long and include atleast one numeric digit',
        Password: val,
      });
    }
  };

//  sendCred= async ()=>{
//     const {Password, error, Name, NameError, NameErrorText} = this.state;
//     const {PhoneNo} = this.props.route.params;
//      fetch("http://127.0.0.1:3000/users",{
//        method:"POST",
//        headers: {
//         'Content-Type': 'application/json'
//       },
//       body:JSON.stringify({
//         "email":Name,
//         "password":Password
//       })
//      })
//      .then(res=>res.json())
//      .then(async (data)=>{
//             try {
//               await AsyncStorage.setItem('token',data.token)
//               this.props.navigation.navigate("Enterphonenumber")
//             } catch (e) {
//               console.log("error hai",e)
//             }
//      })
//   }




  Navigate = () => {
    const {Password, error, Name, NameError, NameErrorText} = this.state;
    const {PhoneNo} = this.props.route.params;
    console.log(PhoneNo)
    if (Password === '') {
      this.setState({error: true, errorText: 'Please Enter Valid Password.'});
    }
    if (Name === '') {
      this.setState({NameErrorText: 'Name cannot be Empty.', NameError: true});
    } else if (!error && !NameError) {
        fetch(url+'/signup',{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "username":Name,
        "password":Password,
        "phone":PhoneNo,

      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              await AsyncStorage.setItem('token',data.token)
              this.props.navigation.navigate("Enterphonenumber")
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
        .catch(error => {
          console.log("Phone number is already registered.");
          this.setState({NameErrorText: 'You are already registered', NameError: true});
        });
    }
  };

  AddPaymentMethod = async UserID => {
    axios
      .post(url + '/customerPayment/addCustomerPaymentMethod', {
        paymentTypeID: 1,
        customerID: UserID,
      })
      .then(Response => {
        let Errors = Response.data.error;
        if (!Errors) {
          this.setState({isLoading: false}, () => {
            this.props.navigation.navigate('Enterphonenumber');
          });
        }
      })
      .catch(error => {
        //console.log(error);
      });
  };
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={styles.createpass}>Create Password</Text>
        <Text style={styles.enterpass}>
          Please create a name and password for
        </Text>
        <Text style={styles.youraccount}>your account</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputsStyles}
            placeholder={'Name'}
            placeholderTextColor={'#7D9678'}
            value={this.state.Name}
            onChangeText={val => {
              this.setState({Name: val, NameError: false, NameErrorText: ''});
            }}
          />
        </View>
        {this.state.NameError ? (
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{this.state.NameErrorText}</Text>
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
              style={{width: '80%', height: '100%', padding: 0, margin: 0}}
              placeholder="Password"
              secureTextEntry={!this.state.showPass}
              value={this.state.Password}
              onChangeText={val => {
                this.VerifyPassword(val);
              }}
            />
            <TouchableOpacity
              onPress={() => this.setState({showPass: !this.state.showPass})}
              style={{right: responsiveWidth(2)}}>
              <Entypo
                name={'eye'}
                size={responsiveFontSize(2.8)}
                color={this.state.showPass ? '#000' : 'grey'}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.inputView}>
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
              // style={styles.inputsStyles}
              placeholder={'Password'}
              secureTextEntry={!this.state.showPass}
              placeholderTextColor={'#7D9678'}
              value={this.state.Password}
              onChangeText={val => {
                this.VerifyPassword(val);
              }}
            />
            <TouchableOpacity
              onPress={() => this.setState({showPass: !this.state.showPass})}
              style={{right: responsiveWidth(2)}}>
              <Entypo
                name={'eye'}
                size={responsiveFontSize(2.8)}
                color={this.state.showPass ? '#000' : 'grey'}
              />
            </TouchableOpacity>
          </View>
        </View> */}
        {this.state.error ? (
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{this.state.errorText}</Text>
          </View>
        ) : null}

        <View style={{flexDirection: 'row', width: '80%', alignSelf: 'center'}}>
          <Text style={styles.terms}>By signing up, you agree to the</Text>
          <Text
            onPress={() =>
              this.props.navigation.navigate('TermsConditions', {
                screenName: this.props.route.name,
              })
            }
            style={{
              color: '#5DC7D1',
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'center',
              marginTop: 10,
              marginLeft: 3,
            }}>
            Terms and Conditions.
          </Text>
        </View>
        <View style={{height: '38%', justifyContent: 'flex-end'}}>
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
                Sign up
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default CreatePassword;