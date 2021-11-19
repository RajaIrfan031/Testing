import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import {Text} from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from '../../styles/styles';
import auth from '@react-native-firebase/auth';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
class VerifyAccount extends Component {
  state = {
    vCode: '',
    timer: 60,
    showTimer: false,
    ConfirmResult: '',
  };
  async componentWillMount() {
    const {confirmResult, phoneNo} = this.props.route.params;
    await this.setState({ConfirmResult: confirmResult});
  }
  async componentDidMount() {
    this.navigation = this.props.navigation.addListener('focus', async () => {
      this.setState({showTimer: true}, async () => {
        await this.startTimer();
      });

      Platform.OS === 'android'
        ? (this.navigation = this.props.navigation.addListener(
            'focus',
            async () => {
              const {phoneNo} = this.props.route.params;
              auth()
                .verifyPhoneNumber(phoneNo)
                .on('state_changed', phoneAuthState => {
                  //console.log('phoneAuthStae', phoneAuthState);
                  if (phoneAuthState.state === 'verified') {
                    this.props.navigation.navigate('ResetPassword', {
                      PhoneNo: phoneNo,
                    });
                    //console.log('verified');
                  } else if (phoneAuthState.state === 'timeout') {
                    Alert.alert('Request Time out');
                  }
                });
            },
          ))
        : null;
    });
  }
  startTimer = async () => {
    this.interval = await setInterval(
      async () =>
        await this.setState(prevState => ({timer: prevState.timer - 1})),
      1000,
    );
    setTimeout(async () => {
      await clearInterval(this.interval);
      await this.setState({timer: 60, showTimer: false});
    }, 60000);
  };
  stopTimer = async () => {
    await clearInterval(this.interval);
    await this.setState({timer: 60, showTimer: false});
  };
  async login() {
    const {confirmResult, phoneNo} = this.props.route.params;
    await auth()
      .signInWithPhoneNumber(phoneNo)
      .then(async confirmResult => {
        //console.log('RESPONSE in  VERIFY ACCOUNT', confirmResult);
        if (confirmResult) {
          await this.setState({ConfirmResult: confirmResult});
        }
      })
      .catch(error => {
        //console.log('Error 1=>', error);
      });
  }

  async verfyCode() {
    // await this.state.showTimer ? this.stopTimer() : null;
    const {phoneNo} = this.props.route.params;
    //console.log(this.state.vCode)
    await this.state.ConfirmResult && this.state.vCode
      ? this.state.ConfirmResult.confirm(this.state.vCode)
          .then(async user => {
            //console.log(user);
            if (await user) {
              this.setState({showTimer:false},()=>{
                this.stopTimer();
              });
              this.props.navigation.navigate('ResetPassword', {
                PhoneNo: phoneNo,
              });
            } else {
              //console.log('User Not Verified');
              Alert.alert('Your Verification Code is Wrong.');
            }
          })
          .catch(error =>
            {
              //console.log(error)
              error
              ? Alert.alert(
                  'Verification Failed',
                  'Your Verification Code is Wrong.',
                  [{text: 'OK', onPress: () => this.props.navigation.goBack()}],
                  {cancelable: false},
                )
              : null}
          )
      : Alert.alert('Please Enter Your Verification Code First');
  }

  render() {
    const {phoneNo, confirmResult} = this.props.route.params;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={styles.VerifyAccount}>Verify Account</Text>
        <Text style={styles.entercode}>
          Please enter verification to reset password
        </Text>
        <Text style={styles.codesent}>code sent</Text>
        <Text style={styles.to}>
          {'to '}
          {phoneNo}
        </Text>
        <OTPInputView
          style={{
            width: '60%',
            height: 100,
            justifyContent: 'center',
            alignSelf: 'center',
            color: '#006600',
          }}
          onCodeChanged={code => {
            this.setState({vCode: code});
          }}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            //console.log(`Code is ${code}, you are good to go!`);
          }}
        />

        <Text style={styles.validcode}>The code is valid for 5 minutes</Text>

        {this.state.showTimer ? (
          <View
            style={{
              top: responsiveHeight(2),
              width: responsiveWidth(30),
              height: responsiveHeight(8),
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#006600',
              borderRadius: 8,
              alignSelf: 'center',
            }}>
            <Text style={{color: '#006600', fontWeight: 'bold'}}>
              {'00 : ' + this.state.timer}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.setState({showTimer: true}, async () => {
                await this.startTimer();
                await this.login();
              });
            }}
            style={{
              top: responsiveHeight(2),
              width: responsiveWidth(35),
              height: responsiveHeight(8),
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#006600',
              alignSelf: 'center',
            }}>
            <Text style={[styles.resend, {color: '#fff'}]}>Resend code</Text>
          </TouchableOpacity>
        )}
        <View style={{justifyContent: 'flex-end', height: '38%'}}>
          <TouchableOpacity
            style={styles.buttonTouch}
            onPress={() => this.verfyCode()}
            // onPress={() => this.props.navigation.navigate('ResetPassword',{PhoneNo:phoneNo})}
          >
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 14,
                color: 'white',
                textTransform: 'uppercase',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default VerifyAccount;