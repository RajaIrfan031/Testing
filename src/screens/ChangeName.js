import React, {Component, useState} from 'react';
import {View, TouchableOpacity, TextInput, SafeAreaView, StatusBar,BackHandler, Keyboard} from 'react-native';
import {Text} from 'native-base';
import Accordion from '../component/accordion';
import {IMAGE} from '../constants/Imagee';
import styles from '../styles/styles';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import CustomHeader from '../component/CustomHeader';
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
class ChangeName extends Component {
  state = {
    error: false,
    errorText: '',
    name: '',
  };
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
  Navigate = () => {
    const {name, error} = this.state;
    if (name === '') {
      this.setState({
        error: true,
        errorText: 'Name must not be empty.',
      });
    } else if (!error) {
      this.UpdateName();
    }
  };
  componentDidMount = () => {
    const {name} = this.props.route.params;
    const{id} = this.props.route.params;
    this.setState({name: name, id: id});
    StatusBar.setBarStyle("dark-content")
  };

  UpdateName = async () => {

    const token = await AsyncStorage.getItem("token")
    iduser=this.state.id;
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "username":this.state.name
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

  //   const UserID = await AsyncStorage.getItem('UserID');
  //   await axios
  //     .post(url + '/customer/updateCustomer', {
  //       customerID: UserID,
  //       fullName: this.state.name,
  //     })
  //     .then(async Response => {
  //       let data = await Response.data.data;
  //       if (!data.error) {
  //         this.props.navigation.navigate('Profile');
  //       }
  //     })
  //     .catch(error => {
  //       //console.log(error);
  //     });
   };
  render() {
    return (
      <DismissKeyboard>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          title="Update Name"
          isHome={false}
          navigation={this.props.navigation}
        />
        <Text style={[styles.continue, {marginTop: responsiveHeight(5)}]}>
          Type in your name to update
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputsStyles}
            placeholder={'Name'}
            placeholderTextColor={'#7D9678'}
            value={this.state.name}
            onChangeText={val => {
              this.setState({name: val, error: false});
            }}
          />
        </View>
        {this.state.error ? (
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{this.state.errorText}</Text>
          </View>
        ) : null}
        <View style={{height: '68%', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={styles.buttonTouch}
            onPress={() => this.Navigate()}>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 16,
                color: 'white',
                textTransform: 'uppercase',
              }}>
              Update Name
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

export default ChangeName;