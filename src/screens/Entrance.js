import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  BackHandler,
  Image,
} from 'react-native';
import {Text} from 'native-base';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import styles from '../styles/styles';

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
    this.state = {};
  }

  UNSAFE_componentWillMount = () => {
    this.navigation = this.props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    });
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    let routeName = this.props.route.name;
    if (routeName === 'Entrance') {
      BackHandler.exitApp();
      return true;
    }
  };
  RemoveListener = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }
  Login = async () => {
    await this.RemoveListener();
    await this.props.navigation.navigate('Enterphonenumber');
  };


  Signup = async () => {
    await this.RemoveListener();
    this.props.navigation.navigate('Signin');
  };
  
  render() {
    return (
      <DismissKeyboard>
        <View style={{justifyContent: 'center'}}>
          <ScrollView>
            <View style={{...styles.container}}>
             <View style={{
                  height: responsiveHeight(40),
                  flex: 1,
                  alignItems: 'center'
                }}>
              <Image
                resizeMode="contain"
                source={require('../Image/GRDN1.png')}
                style={{
                  resizeMode:"contain",
                  width: '50%',
                  height: '100%',
                }}
              />
              </View>
              <View
                style={{
                  height: responsiveHeight(40),
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  style={{
                    //   marginTop: responsiveHeight(5),
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    width: '80%',
                    height: responsiveHeight(7.5),
                    elevation: 5,
                    shadowOffset: {width: 0, height: 2},
                    shadowColor: 'rgba(0,0,0,0.1)',
                    shadowOpacity: 1,
                    shadowRadius: 4,
                  }}
                  onPress={() => {
                    this.Login();
                  }}>
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontSize: 16,
                      color: '#006600',
                      textTransform: 'uppercase',
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: responsiveHeight(2),
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#006600',
                    borderRadius: 10,
                    width: '80%',
                    height: responsiveHeight(7.5),
                    shadowOffset: {width: 0, height: 2},
                    shadowColor: 'rgba(0,0,0,0.1)',
                    shadowOpacity: 1,
                    shadowRadius: 4,
                  }}
                  onPress={() => {
                    this.Signup();
                  }}>
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontSize: 16,
                      color: 'white',
                      textTransform: 'uppercase',
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <KeyboardAvoidingView behavior={'padding'} />
          </ScrollView>
        </View>
      </DismissKeyboard>
    );
  }
}

export default Welcome;