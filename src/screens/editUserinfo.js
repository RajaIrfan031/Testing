import React, {Component, useState} from 'react';
import {View, TouchableOpacity, TextInput, SafeAreaView, StatusBar,BackHandler, Keyboard, ScrollView} from 'react-native';
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
class editUserinfo extends Component {
  state = {
    error: false,
    errorText: '',
    name: '',
    phone:'',
    joiningdate:'',
    resignationDate:'',
  };
  UNSAFE_componentWillReceiveProps = () => {
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
      this.UpdateUserInfo();
    }
  };
  componentDidMount = () => {
    const {name, phone, joiningdate, resignationDate} = this.props.route.params;
    const{id} = this.props.route.params;
    this.setState({name: name, id: id, phone: phone, 
    joiningdate: joiningdate, resignationDate:resignationDate});
    StatusBar.setBarStyle("dark-content")
  };

  UpdateUserInfo = async () => {
    const token = await AsyncStorage.getItem("token")
    iduser=this.state.id;
    try{
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "username":this.state.name,
        "phone":this.state.phone,
        "joiningdate":this.state.joiningdate,
        "resignationDate":this.state.resignationDate,
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              // console.log(this.state.name);
              //await AsyncStorage.setItem('token',data.token)
              this.props.navigation.navigate('AdminScreen');
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
      }catch(e){
        alert('User not found ,Error!',e)
      }

   };

   
  render() {
    return (
      <DismissKeyboard>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          title="Edit User Info"
          isHome={false}
          navigation={this.props.navigation}
        />
        <Text style={[styles.continue, {marginTop: responsiveHeight(5)}]}>
          User info
        </Text>
        <ScrollView>
        <View style={styles.inputView}>
        <Text style={{color: '#7D9678', fontSize: 12}}>Name:</Text>
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
        <View style={styles.inputView}>
        <Text style={{color: '#7D9678', fontSize: 12}}>Phone #:</Text>
          <TextInput
            style={styles.inputsStyles}
            placeholder={'Phone'}
            placeholderTextColor={'#7D9678'}
            value={this.state.phone}
            onChangeText={val => {
              this.setState({phone: val, error: false});
            }}
          />
        </View>
        <View style={styles.inputView}>
        <Text style={{color: '#7D9678', fontSize: 12}}>Joining Date:</Text>
          <TextInput
            style={styles.inputsStyles}
            placeholder={'Joining date'}
            placeholderTextColor={'#7D9678'}
            value={this.state.joiningdate}
            onChangeText={val => {
              this.setState({joiningdate: val, error: false});
            }}
          />
        </View>
        <View style={styles.inputView}>
        <Text style={{color: '#7D9678', fontSize: 12}}>Resignation Date:</Text>
          <TextInput
            style={styles.inputsStyles}
            placeholder={'Resignation Date'}
            placeholderTextColor={'#7D9678'}
            value={this.state.resignationDate}
            onChangeText={val => {
              this.setState({resignationDate: val, error: false});
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
              Update user info
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

export default editUserinfo;