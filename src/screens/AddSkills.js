import React, {Component, useState} from 'react';
import {View, TouchableOpacity, 
TextInput, SafeAreaView, StatusBar,BackHandler, 
Keyboard, ScrollView, Image} from 'react-native';
import {Text} from 'native-base';
import Accordion from '../component/accordion';
import {IMAGE} from '../constants/Imagee';
import styles from '../styles/styles';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import CustomHeader from '../component/CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {url} from '../constants/constant';
//import SelectMultiple from 'react-native-select-multiple';
//import MultiSelect from 'react-native-multiple-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
//import select from 'react-select';
const skillsAdd = [
  { id: 'SEO', name: 'SEO' },
  { id: 'Website Designer', name: 'Website Designer' },
  { id: 'Python', name: 'Python' },
  { id: 'C#', name: 'C#' }
];
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

class AddSkills extends Component {
  state = {
    error: false,
    errorText: '',
    selectedSkills: [],
    fullName:'',
  };
  onSelectedSkills = (selectedSkills) =>{
    this.setState({selectedSkills})
     console.log(this.state.selectedSkills)
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
    const {skills, error} = this.state;
    if (skills === '') {
      this.setState({
        error: true,
        errorText: 'Skills must not be empty.',
      });
    } else if (!error) {
      this.UpdateSkills();
    }
  };
  componentDidMount = () => {
    this.getuserData();
    const {skills} = this.props.route.params;
    const{id} = this.props.route.params;
    this.setState({skills: skills, id: id});
    StatusBar.setBarStyle("dark-content")
  };

  UpdateSkills = async () => {
    const token = await AsyncStorage.getItem("token")
    iduser=this.state.id;
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "skills":this.state.selectedSkills
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              // console.log(this.state.skills);
              //await AsyncStorage.setItem('token',data.token)
              this.props.navigation.navigate('Profile');
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
   };
   getuserData = async () => {
    const token = await AsyncStorage.getItem("token")
    fetch(url,{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(async data=>{
      //console.log("data from frofile is "+data)
      await this.setState(
              {
                fullName: data.username,
                selectedSkills:data.skills,
              },
            
            );
    })
  };

  render() {
// var ss=[];
// for (let i = 0; i < this.state.selectedSkills.length; i++) {
//   ss.push(
//     <View key={i}>
//     <Text></Text>
//     </View>
//   );
// }
    return (
      <DismissKeyboard>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          title="Add Skills"
          isHome={false}
          navigation={this.props.navigation}
        />
        <Text style={[styles.continue, {marginTop: responsiveHeight(5)}]}>
          Add your skills {this.state.selectedSkills}
        </Text>
        <ScrollView>
        <View>
         <SectionedMultiSelect
          items={skillsAdd}
          IconRenderer={Icon}
          uniqueKey="id"
          subKey="children"
          selectText="Skills..."
          showDropDowns={true}
          onSelectedItemsChange={this.onSelectedSkills}
          selectedItems={this.state.selectedSkills}
        />
      </View>
        <View style={styles.inputView}>
        {/* <TextInput
            style={styles.inputsStyles}
            placeholder={'Skills'}
            placeholderTextColor={'#7D9678'}
            value={this.state.selectedSkills}
           // value={this.state.selectedSkills[0]+' || '+this.state.selectedSkills[1]}
          /> */}
        </View>
        {this.state.error ? (
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{this.state.errorText}</Text>
          </View>
        ) : null}
         <View>
          </View>
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
              Add Skills
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

export default AddSkills;