import React, {Component, useState} from 'react';
import {View, TouchableOpacity, 
TextInput, SafeAreaView, StatusBar,
BackHandler, Keyboard, FlatList, ImageBackground, ScrollView} from 'react-native';
import {Text} from 'native-base';
import Accordion from '../component/accordion';
import {IMAGE} from '../constants/Imagee';
import styles from '../styles/styles';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import CustomHeader from '../component/CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {url} from '../constants/constant';
import DatePicker from 'react-native-datepicker';

import axios from 'axios';
//import { LocalNotification, ScheduledLocalNotification } from '../screens/pushNotification';

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
class AdminScreen extends Component {
  state = {
    error: false,
    errorText: '',
    fullName:'',
    phoneNo:'',
    user_id:'',
    profilePicture:'',
    joiningDate:'',
    Skills:'',
    data:[],
    usercount:[],

  };
  UNSAFE_componentWillMount = () => {
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
    const {skills, error} = this.state;
    if (skills === '') {
      this.setState({
        error: true,
        errorText: 'Skills must not be empty.',
      });
    } else if (!error) {
      this.getuserData();
    }
  };
  componentDidMount = () => {
      this.getuserData();
      this.countuser();
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getuserData();
      this.countuser();
    });
    StatusBar.setBarStyle("dark-content")
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
    const response = await fetch(url+'/user');
    const json = await response.json();
    await this.setState({data: json});
  };
countuser = async ()=>{
     const token = await AsyncStorage.getItem("token")
    const response = await fetch(url+'/count');
    const json = await response.json();
    await this.setState({usercount: json});
};
// setJoiningDate=async(Date)=>{
//     await this.setState({joiningDate:Date})
// }
setJoiningDate = async (Date,userid) => {
    await this.setState({joiningDate:Date})
    const token = await AsyncStorage.getItem("token")
    iduser=this.state.id;
    fetch(url+'/signup/'+userid,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "joiningdate":this.state.joiningDate
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              //await AsyncStorage.setItem('token',data.token)
              //this.props.navigation.navigate('Profile');
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
};

deleteuser = async (userid) => {
    //await this.setState({joiningDate:Date})
    const token = await AsyncStorage.getItem("token")
    //iduser=this.state.id;
    fetch(url+'/deleteUser/'+userid,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({

      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
                console.log("User deleted!")
              //await AsyncStorage.setItem('token',data.token)
              //this.props.navigation.navigate('Profile');
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
};
  render() {
    return (
      <DismissKeyboard>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          title="Users Info"
          isHome={false}
          navigation={this.props.navigation}
        />
        
            <Text style={styles.counttextView}>Total Users 00{this.state.usercount} </Text>
   
        <ScrollView style={{marginHorizontal: 2}}>
        <Text style={[styles.continue, {marginTop: responsiveHeight(5)}]}>
          All users info
        </Text>
        <View>
        {/* <Text>This is name{this.state.data}</Text> */}
        <FlatList
        data={this.state.data}
        keyExtractor={(x,i)=> i}
        renderItem={({ item })=>
        <View style={styles.usersinfo}>
        
        <TouchableOpacity
        style={{backgroundColor:'#A52A2A', borderRadius:5, alignSelf:'center'}}
        onPress={()=>{
           // this.deleteuser(item._id);
            alert('The user '+item.username+' has been deleted!');
        }}
        ><Text style={{color:'#ffffff'}}>Delete User</Text>
        </TouchableOpacity>
          <View style={styles.profileImg}>
             <ImageBackground
                borderRadius={responsiveHeight(10)}
                source={
                {uri:url+'/'+item.profileimage}
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: responsiveHeight(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.state.uploading ? (
                <ActivityIndicator size={'large'} color={'#fff'} />
              ) : null}
            </ImageBackground>
            </View>
            <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                //this.props.navigation.navigate('ChangeName', {name: fullName, id: user_id});
              }}
              style={styles.admininputsStyles}>
              <Text style={{alignSelf:'center', fontSize:20}}>{item.username} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //this.props.navigation.navigate('ChangeName', {name: fullName, id: user_id});
              }}
              style={styles.admininputsStyles}>
              <Text style={{alignSelf:'center', fontSize:18}}>{item.phone}</Text>
            </TouchableOpacity>
           <DatePicker
          style={styles.datePickerStyle}
          //joiningDate={item.joiningDate} // Initial date from state
          mode="date" // The enum of date, datetime and time
          date={item.joiningdate}
          placeholder="dd//mm//yy"
          format="DD-MM-YYYY"
        //   minDate="01-01-2021"
        //   maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
        this.setJoiningDate(date,item._id);
          }}
        />
          </View>
        <Text style={styles.admintextView}>
        </Text>
        <TouchableOpacity
        style={{backgroundColor:'#008000', borderRadius:5, alignSelf:'center'}}
        onPress={()=>{
           // this.deleteuser(item._id);
            this.props.navigation.navigate('editUserinfo', {
              name: item.username, 
              phone: item.phone,
              id: item._id,
              joiningdate: item.joiningdate,
              resignationDate: item.resignationDate,
              profileimage: item.profileimage,
              });
        }}
        ><Text style={{color:'#ffffff'}}>Edit User Info</Text>
        </TouchableOpacity>
        </View>}
        />
        
        </View>
        </ScrollView>
      </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

export default AdminScreen;