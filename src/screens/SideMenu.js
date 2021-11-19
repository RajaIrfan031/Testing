import React, {Component, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Text, List, ListItem} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import {url} from '../constants/constant';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';
export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    }
  state = {
    CustName: null,
    CustPicture: null,
    refresh: '',
    Notifications: [],
    NoticationsCount: null,
    isLoading: true,
    profilePicture:'',
  };

  getNotifications = async () => {
    const UserID = await AsyncStorage.getItem('UserID');
    await axios
      .post(url + '/customerNotification/getCustomerNotification', {
        customerID: UserID,
      })
      .then(async Response => {
        let Notifications = Response.data.data;
        let Errors = Response.data.error;
        let oldNoti = await AsyncStorage.getItem('Noti');
        let Updated = (await Notifications.length) - parseInt(oldNoti);
        if (!Errors) {
          await this.setState({
            NoticationsCount: Updated,
            isLoading: false,
          });
          
        } else {
          this.setState({isLoading: false});
        }
      })
      .catch(error => {
        //console.log(error);
      });
  };
   async UNSAFE_componentWillReceiveProps(nextProps) {
     if (this.props.change) {
       await this.getuserData();
      this.setState({refresh: this.props.change});
       StatusBar.setBarStyle('dark-content');
     }
   }
   
  
getuserData = async () => {
    const token = await AsyncStorage.getItem("token")
    await fetch(url,{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(async data=>{
      //console.log("data from frofile is "+data)
      await this.setState(
              {
                fullName: data.username,
                phoneNo: data.phone,
                user_id:data._id,
                profilePicture:url+'/'+data.profileimage,
               // CustPicture: CustData.profilePicture,
                //isLoading: false,
              },
            
            );
    })
}; 

componentDidMount = () => {
  this.setState({refresh: this.props.change});
  this.getuserData();
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    // this.getuserData();
    // });
   StatusBar.setBarStyle('dark-content');
    };
  render() {
    this.getuserData();
  const {profilePicture,CustName, phoneNo} = this.state;
  const {props, change} = this.props;
    return (
      
      <SafeAreaView style={{flex: 1}}>
        {this.state.isLoading ? (
            <View
            style={{
              height: 120,
              justifyContent: 'center',
              backgroundColor: '#006600',
            }}>
            <Image
              source={
                this.state.profilePicture !== url+'//'
                  ? {uri: profilePicture}
                  : require('../Image/BOBY.png')
              }
              style={{
                height: 80,
                width: 80,
                borderRadius: 60,
                // marginBottom:responsiveHeight(5),
                marginTop: -20,
                marginLeft: 10,
                // backgroundColor:'red'
              }}
            />
            <Text style={{paddingLeft: 100, 
            fontSize: responsiveFontSize(2.3),
            marginTop: -70, color: '#fff'}}>
              Welcome!
            </Text>
            <Text
              style={{
                paddingLeft: 100,
                marginTop: 1,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
                color: '#fff',
              }}>
              {this.state.fullName}
            </Text>
            <Text
              style={{
                paddingLeft: 100,
                marginTop: 1,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),
                color: '#fff',
              }}>
              {this.state.phoneNo}
            </Text>
            <Icon
              name="edit"
              color="#fff"
              style={{
                color: '#fff',
                fontSize: 20,
                marginLeft: 240,
                marginTop: -40,
              }}
              onPress={() => props.navigation.navigate('ProfileStack')}
            />

           
          </View>
        ) : (
             <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#006600',
            }}>
            <ActivityIndicator size={'large'} color={'#fff'} />
          </View>
        )}

        <ScrollView
          style={{backgroundColor: '#006600', paddingTop: responsiveHeight(3)}}>
          <List>
            <ListItem
              onPress={() => props.navigation.navigate('HomeStack')}
              style={{color: '#fff', marginTop: 0}}>
              <FontAwesome
                name="home"
                style={{width: '20%', alignItems: 'center'}}
                color={'#fff'}
                size={responsiveFontSize(2.8)}
              />

              <Text style={{color: '#fff'}}>Home</Text>
            </ListItem>
            
            <ListItem
              style={{color: '#fff', marginTop: 0}}
              onPress={() => props.navigation.navigate('ContactUs')}>
              <Material
                style={{width: '20%', alignItems: 'center'}}
                name={'contact-phone'}
                color={'#fff'}
                size={responsiveFontSize(2.8)}
              />
              <Text style={{color: '#fff'}}>Contact Us</Text>
            </ListItem>
            <ListItem
              style={{color: '#fff', marginTop: 0}}
              onPress={() => {
                props.navigation.navigate('TermsConditions', {
                  screenName: 'FromDrawer',
                });
              }}>
              <FA5
                style={{width: '20%', alignItems: 'center'}}
                name={'file-signature'}
                color={'#fff'}
                size={responsiveFontSize(2.8)}
              />
              <Text style={{color: '#fff'}}>Terms and Conditions</Text>
            </ListItem>
           
            <ListItem
              onPress={async () => {
                await AsyncStorage.clear();
                await props.navigation.navigate('AuthStack');
              }}
              style={{color: '#fff', marginTop: 0}}>
              <AntDesign
                style={{width: '20%', alignItems: 'center'}}
                name={'logout'}
                color={'#fff'}
                size={responsiveFontSize(2.8)}
              />
              <Text style={{color: '#fff'}}>Sign out</Text>
            </ListItem>
            {this.state.phoneNo=='+971544444444'
            ?
            <ListItem
              onPress={async () => {
                //await AsyncStorage.clear();
                await props.navigation.navigate('AdminScreen');
              }}
              style={{color: '#fff', marginTop: 0}}>
              <AntDesign
                style={{width: '20%', alignItems: 'center'}}
                name={'user'}
                color={'#fff'}
                size={responsiveFontSize(2.8)}
            
              />
              <Text style={{color: '#fff'}}>Admin</Text>
            </ListItem>
            :null }
          </List>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

