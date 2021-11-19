import React, {Component, useState} from 'react';
import {
  View,Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Keyboard
} from 'react-native';
import {Text} from 'native-base';
import styles from '../styles/styles';
import CustomHeader from '../component/CustomHeader';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import {url} from '../constants/constant';
import axios from 'axios';

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
class ChangePassword extends Component {
  state = {
    newPass: '',
    confirmNewPass: '',
    currentpass: '',
    currentPassErrorText: '',
    newPassErrorText: '',
    confirmNewPassErrorText: '',
    NewPassError: false,
    CurrentPassError: false,
    confirmNewPassError: false,
    isLoading: false,
    iduser:'',
    currentpassword:'',
    phone:'',
  };
  componentDidMount() {
   // const {name} = this.props.route.params;
    const{id} = this.props.route.params;
    this.setState({id: id});
    StatusBar.setBarStyle('dark-content');
  }
  componentWillMount = () => {
    this.navigation = this.props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    });
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = async () => {
    await this.props.navigation.goBack();
    await this.RemoveListener();
    return true;
  };
  RemoveListener = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };
  VerifyNewPass = val => {
    let NewPasswordRegix = /^(?=.*\d).{8,100}$/;
    if (NewPasswordRegix.test(val)) {
      this.setState({newPass: val, newPassErrorText: '', NewPassError: false});
    } else if (val === '') {
      this.setState({newPass: val, newPassErrorText: '', NewPassError: false});
    } else {
      this.setState({
        newPass: val,
        newPassErrorText:
          'Password must be atleast 8 digits long and include atleast one numeric digit',
        NewPassError: true,
      });
    }
  };
  Navigate = () => {
    const {
      newPass,
      newPassErrorText,
      NewPassError,
      currentPassErrorText,
      currentpass,
      CurrentPassError,
      confirmNewPass,
      confirmNewPassError,
      confirmNewPassErrorText,
    } = this.state;

    if (currentpass === '') {
      this.setState({
        currentPassErrorText: 'Current Password must not be empty.',
        CurrentPassError: true,
      });
    }else if (newPass === '') {
      this.setState({
        newPassErrorText: 'New Password must not be empty.',
        NewPassError: true,
      });
    }
    if (confirmNewPass === '') {
      this.setState({
        confirmNewPassErrorText: 'Confirm Password must not be empty',
        confirmNewPassError: true,
      });
    } else {
      if (newPass !== confirmNewPass) {
        this.setState({
          confirmNewPassErrorText:
            'Confirm Password does not matches with New Password.',
          confirmNewPassError: true,
        });
      } else if (!NewPassError) {
        this.getpassword();
      }
    }
  };

getpassword= async()=>{

  const token = await AsyncStorage.getItem("token")
    fetch(url,{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(async data=>{
      await this.setState(
              {
                //fullName: data.username,
                phone: data.phone,
               // user_id:data._id,
               // CustPicture: CustData.profilePicture,
                //isLoading: false,
              },
      );
            fetch(url+"/signin",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "phone":this.state.phone,
                "password":this.state.currentpass,
            })
          })
          .then(res=>res.json())
          .then(async (data)=>{
                  try {
                    await AsyncStorage.setItem('token',data.token)
                    console.log("Password matched")
                    iduser=this.state.id;
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "password":this.state.confirmNewPass
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              Alert.alert("Your password has been changed successfully!")
            } catch (e) {
              console.log(".Error ",e)
            }
     })

                  } catch (error) {
                    this.setState({
        currentPassErrorText: 'Current Password is Incorrect.',
        CurrentPassError: true,
      });
                  }
            }) 
    })

}
  // UpdatePassword = async () => {
  //   const token = await AsyncStorage.getItem("token")
  //   iduser=this.state.id;
  //   fetch(url+'/signup/'+iduser,{
  //      method:"POST",
  //      headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify({
  //       "password":this.state.confirmNewPass
  //     })
  //    })
  //    .then(res=>res.json())
  //    .then(async (data)=>{
  //           try {
  //             console.log(this.state.name);
  //             //await AsyncStorage.setItem('token',data.token)
  //             this.props.navigation.navigate('Profile');
  //             Alert.alert("Your password has been changed successfully!")
  //           } catch (e) {
  //             console.log("....Error.... ",e)
  //           }
  //    })
    // const UserID = await AsyncStorage.getItem('UserID');
    // this.setState({isLoading: true});
    // await axios
    //   .post(url + '/customer/changePassword', {
    //     id: UserID,
    //     curPassword: this.state.currentpass,
    //     newPassword: this.state.newPass,
    //   })
    //   .then(async Response => {
    //     let data = await Response.data;
    //     if (!data.error) {
    //       this.setState({isLoading: false}, () => {
    //         setTimeout(() => {
    //           this.props.navigation.navigate('BOBYM');
    //         }, 1000);
    //       });
    //     } else {
    //       this.setState({
    //         CurrentPassError: true,
    //         isLoading: false,
    //         currentPassErrorText: 'Incorrect Current Password',
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({
    //       CurrentPassError: true,
    //       isLoading: false,
    //       currentPassErrorText: 'Error in reset password. Please try again!',
    //     });
    //   });
  //};
saveimage = async() =>{
    const token = await AsyncStorage.getItem("token")
    iduser=this.state.id;
    //console.log("Image path is "+this.imageurl)
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "profileimage":"imagesmy.jpg"
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              console.log(this.state.name);
              //await AsyncStorage.setItem('token',data.token)
              this.props.navigation.navigate('Profile');
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
};

  render() {
    const {
      newPass,
      newPassErrorText,
      NewPassError,
      currentPassErrorText,
      currentpass,
      CurrentPassError,
      confirmNewPass,
      confirmNewPassError,
      confirmNewPassErrorText,
    } = this.state;
    return (
      <DismissKeyboard>
        <SafeAreaView style={{flex: 1}}>
          <CustomHeader
            title="Change Password"
            navigation={this.props.navigation}
          />
          <Text
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              fontSize: 18,
              color: '#006600',
            }}>
            Please enter the following to change
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              fontSize: 18,
              color: '#006600',
            }}>
            your account's password
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputsStyles}
              placeholder={'Current Password'}
              value={currentpass}
              secureTextEntry={true}
              placeholderTextColor={'#7D9678'}
              onChangeText={val =>
                this.setState({
                  currentpass: val,
                  currentPassErrorText: '',
                  CurrentPassError: false,
                })
              }
            />
          </View>

          {CurrentPassError ? (
            <View style={styles.ErrorView}>
              <Text style={styles.ErrorText}>{currentPassErrorText}</Text>
            </View>
          ) : null}
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputsStyles}
              placeholder={'New Password'}
              value={newPass}
              secureTextEntry={true}
              placeholderTextColor={'#7D9678'}
              onChangeText={val => this.VerifyNewPass(val)}
            />
          </View>

          {NewPassError ? (
            <View style={styles.ErrorView}>
              <Text style={styles.ErrorText}>{newPassErrorText}</Text>
            </View>
          ) : null}
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputsStyles}
              placeholder={'Confirm New Password'}
              value={confirmNewPass}
              onChangeText={val =>
                this.setState({confirmNewPass: val, confirmNewPassError: false})
              }
              secureTextEntry={true}
              placeholderTextColor={'#7D9678'}
            />
          </View>

          {confirmNewPassError ? (
            <View style={styles.ErrorView}>
              <Text style={styles.ErrorText}>{confirmNewPassErrorText}</Text>
            </View>
          ) : null}

          {this.state.isLoading ? (
            <View
              style={[styles.buttonTouch, {marginTop: responsiveHeight(34)}]}>
              <ActivityIndicator color={'#fff'} size={'large'} />
            </View>
          ) : (
            <TouchableOpacity
              style={{
                marginTop: responsiveHeight(34),
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: '#006600',
                borderRadius: 10,
                width: '90%',
                height: '7.5%',
              }}
              onPress={() => {
                this.Navigate();
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontSize: 16,
                  color: 'white',
                }}>
                CONFIRM
              </Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

export default ChangePassword;