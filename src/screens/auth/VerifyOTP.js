import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import {Text} from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from '../../styles/styles';
import auth from '@react-native-firebase/auth';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

class VerifyOTP extends Component {
  state = {vCode: '', ConfirmResult: '', timer: 60, showTimer: false};
  async UNSAFE_componentWillMount() {
    const {confirmResult, phoneNo} = this.props.route.params;
    await this.setState({ConfirmResult: confirmResult});
  }
  async login() {
    const {confirmResult, phoneNo} = this.props.route.params;
    await auth()
      .signInWithPhoneNumber(phoneNo)
      .then(async confirmResult => {
        if (confirmResult) {
          await this.setState({ConfirmResult: confirmResult});
        }
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error));
      });
  }

  async verfyCode() {
    const {phoneNo} = this.props.route.params;

    {
      await this.state.ConfirmResult && this.state.vCode
        ? this.state.ConfirmResult.confirm(this.state.vCode)
            .then(async user => {
              try {
                if (user) {
                  this.setState({showTimer: false}, () => {
                    this.stopTimer();
                  });
                  this.props.navigation.navigate('ResetPassword', {
                    PhoneNo: phoneNo,
                  });
                } else {
                  Alert.alert('Your Verification Code is Wrong.');
                }
              } catch (error) {
                Alert.alert('Something Went Wrong');
              }
            })
            .catch(error => {
             error
                ? Alert.alert(
                    'Verification Failed',
                    'Your Verification Code is Wrong.',
                    [
                      {
                        text: 'OK',
                        onPress: () => this.props.navigation.goBack(),
                      },
                    ],
                    {cancelable: false},
                  )
                : null;
            })
        : Alert.alert('Please Enter Your Verification Code First');
    }
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

  async componentDidMount() {
    this.navigation = this.props.navigation.addListener('focus', async () => {
      const {phoneNo} = this.props.route.params;
      await this.setState({showTimer: true}, () => {
        this.startTimer();
      });
      Platform.OS === 'android'
        ? auth()
            .verifyPhoneNumber(phoneNo)
            .on('state_changed', (phoneAuthState) => {
              if (phoneAuthState.state === 'verified') {
                this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'ResetPassword',
                        params: {
                          PhoneNo: phoneNo,
                        },
                      },
                    ],
                  }),
                );
              }
            })
        : null;
    });
  }

  render() {
    const {phoneNo} = this.props.route.params;
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
        <Text style={styles.VerifyAccount}>Verify Account</Text>
        <Text style={styles.entercode}>Please enter verification</Text>
        <Text style={styles.codesent}>code sent</Text>
        <Text style={styles.to}>to {phoneNo}</Text>

        <OTPInputView
          style={{
            width: '60%',
            height: 100,
            justifyContent: 'center',
            alignSelf: 'center',
            color: '#006600',
          }}
          pinCount={6}
          onCodeChanged={code => {
            this.setState({vCode: code});
          }}
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
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

        <View style={{height: '38%', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={styles.buttonTouch}
            onPress={() => {
              this.verfyCode();
            }}>
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

export default VerifyOTP;