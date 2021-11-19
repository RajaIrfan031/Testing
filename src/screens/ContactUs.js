import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Linking
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CustomHeader from '../component/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../styles/styles';
import call from 'react-native-phone-call';
export default class ContactUs extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }
  DialPhone = phoneNo => {
    const args = {
      number: phoneNo, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };
  render() {
    return (
      <SafeAreaView style={styles.contianer}>
        <CustomHeader
          title="Contact Us"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: responsiveHeight(2),
          }}>
          <Text
            style={[
              Styles.textthin,
              {
                color: '#006600',
                fontSize: responsiveFontSize(2.5),
                fontWeight: 'bold',
              },
            ]}>
            {'Get in touch with us.'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:' + 'info@grdn.online')}
          style={Styles.MainContainer}>
          <View style={Styles.LeftIcon}>
          
             <FontAwesome
            name={"envelope-o"}
            size={responsiveFontSize(4)}
            color={'#006600'}
          />
          </View>
          <View style={Styles.RightContent}>
            <Text style={Styles.textBold}>{'Facing Issues?'}</Text>
            <Text style={Styles.textthin}>{'info@grdn.online'}</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={Styles.MainContainer}>
          <View style={Styles.LeftIcon}>
            <Ionicons
              name={'ios-mail'}
              color={'#006600'}
              size={responsiveFontSize(4)}
            />
          </View>
          <View style={Styles.RightContent}>
            <Text style={Styles.textBold}>{'For Legal Terms'}</Text>
            <Text style={Styles.textthin}>{'legal@grdn.online'}</Text>
          </View>
        </View> */}
        {/* <View style ={{width:'85%',height:1,backgroundColor:"#9aa69f",alignSelf:'flex-end'}} /> */}
        <TouchableOpacity
          onPress={() => this.DialPhone('+97142980535')}
          style={Styles.MainContainer}>
          <View style={Styles.LeftIcon}>
            <AntDesign
              name={'phone'}
              color={'#006600'}
              size={responsiveFontSize(3.8)}
            />
          </View>
          <View style={Styles.RightContent}>
            <Text style={Styles.textBold}>{'Phone'}</Text>
            <Text style={Styles.textthin}>{'+971 42 980535'}</Text>
          </View>
        </TouchableOpacity>

        {/* <View style ={{width:'85%',height:1,backgroundColor:"#9aa69f",alignSelf:'flex-end'}} /> */}
      </SafeAreaView>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  MainContainer: {
    marginVertical: responsiveHeight(1),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(10),
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'space-around',
  },
  LeftIcon: {
    justifyContent: 'center',
  },
  RightContent: {
    justifyContent: 'center',
    width: '50%',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.3),
    color: 'black',
  },
});
