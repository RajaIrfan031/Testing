import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Alert,
  Keyboard,
} from 'react-native';
import {Text} from 'native-base';
import styles from '../../styles/styles';
import {url} from '../../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
class CreatePassword extends Component {
  state = {
    Password: '',
    error: false,
    errorText: '',
    Name: '',
    NameErrorText: '',
    NameError: false,
    isLoading: false,
    iduser:'',
    user_id:'',
    phoneNo:'',
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
getuserData = async () => {
    const token = await AsyncStorage.getItem("token")
    fetch(url,{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(async data=>{
      await this.setState(
              {
                phoneNo: data.phone,
                user_id:data._id,
              },
            );
    //console.log("User ID "+data._id)
    const {Password, error, Name, NameError, NameErrorText} = this.state;
    try{
      if(Password===''){
          this.setState({error: true, errorText: 'Please Enter Valid Password.', isLoading: false});
      }else {
        console.log("in cp")
      fetch(url+'/changePassword/'+data._id,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "password":this.state.Password
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              //await AsyncStorage.setItem('token',data.token)
              this.props.navigation.navigate('Enterphonenumber');
              console.log('Password changed success')
              Alert.alert("Your password has been reset successfully.")
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
      }
    }catch(error){
      console.log('Network Error')
    }
    })

  };

  // Navigate = async() => {
  //   const {PhoneNo} = this.props.route.params;
  //   const {Password, error, Name, NameError, NameErrorText} = this.state;
  //   if (Password === '') {
  //     this.setState({error: true, errorText: 'Please Enter Valid Password.'});
  //   } else if (!error) {
  //     this.getuserData();
  //     //this.props.navigation.navigate('Enterphonenumber');
      // axios
      //   .post(url + '/customer/forgetPassword', {
      //     phoneNo: PhoneNo,
      //     password: Password,
      //   })
      //   .then(Response => {
      //     if (Response.data.error) {
      //       Alert.alert(
      //         'User Not Found',
      //         'User Record does not exist in the system',
      //         [
      //           {
      //             text: 'OK',
      //           },
      //         ],
      //         {cancelable: false},
      //       );
      //     } else {
      //       this.setState({isLoading: false}, () => {
      //         this.props.navigation.navigate('Enterphonenumber');
      //       });
      //     }
      //   })
        // .catch(error => {
        //   //console.log(error);
        // });
  //   } else {
  //     this.setState({isLoading: false});
  //   }
  // };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }
  render() {
    return (
      <DismissKeyboard>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={styles.createpass}>Create Password</Text>
          <Text style={styles.enterpass}>Please create new password to</Text>
          <Text style={styles.youraccount}>reset your current password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputsStyles}
              placeholder={'Password'}
              secureTextEntry={true}
              placeholderTextColor={'#7D9678'}
              value={this.state.Password}
              onChangeText={val => {
                this.VerifyPassword(val);
              }}
            />
          </View>
          {this.state.error ? (
            <View style={styles.ErrorView}>
              <Text style={styles.ErrorText}>{this.state.errorText}</Text>
            </View>
          ) : null}
          <View style={{height: '58%', justifyContent: 'flex-end'}}>
            {this.state.isLoading ? (
              <View style={styles.buttonTouch}>
                <ActivityIndicator color={'#fff'} size={'large'} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.buttonTouch}
                onPress={() =>
                  this.setState({isLoading: true}, () => {
                    this.getuserData();
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
                  Reset Password
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

export default CreatePassword;