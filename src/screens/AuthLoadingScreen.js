import React, {Component} from 'react';
import {View, Text, StatusBar, SafeAreaView, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
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
        //  this.props.navigation.navigate('App');
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
        {/* <Text style={styles.logeng}>BOBI</Text>
        <Text style={styles.slogeng}>Maintenance Services</Text>
        <Text style={styles.logarb}>بوبي</Text>
        <Text style={styles.slogarb}>خدمات الصيانة</Text> */}

        <View
          style={{
            height: responsiveHeight(30),
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={require('../Image/GRDN-Sign.png')}
            style={{
              resizeMode: 'contain',
              width: '50%',
              height: '100%',
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default AuthLoadingScreen;
