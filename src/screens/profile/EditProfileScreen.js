import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Modal,
    Image
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import DropDownPicker from 'react-native-dropdown-picker';

import {url} from '../../constants/constant';
import Header from '../../components/Header/Header';
import { Avatar } from 'react-native-paper';

class EditProfileScreen extends Component{

  constructor() {
    super();

  this.state = {
    data: [],
    isLoading: false,
    imageSource: '',
    isImage: false,
    phone: '',
    username: '',
    agentlanguage: [''],
    skills: [''],
    skill: ['Cleaning'],
    address: '',
    joiningDate: '',
    uId: '',
    profileimage: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
    modalVisible: false,
    isImageUploading: false,
    languages: ['English'],
    isSkillsChanged: false,
    isLanguagesChanged: false,
    };
}

  onChangePhoneNumber = val => {
    this.setState({phone: val});
  };

  onChangeUserName = val => {
    this.setState({username: val});
  };
  onChangeLanguage = val => {
    this.setState({language: val});
  };
  
  onChangeAddress = val => {
    this.setState({address: val});
  };

  onChangeJoiningDate = val => {
    this.setState({joiningDate: val});
  };

  AddSkill=()=>{
    this.state.skills.push( this.state.skill.toString() );
  }
  

  componentDidMount = async () => {
    var id = '';
    try{
      id = await AsyncStorage.getItem('_id');
      this.setState({
        uId: id,
      });
      }catch (e){
          console.log("....Error.... ",e)
      }
    fetch(url+'/user/'+id)
    .then(res=>res.json())
    .then(async (data)=>{
        try {
          this.setState({
            data: data[0],
            profileimage: data[0]['profileimage'],
            username: data[0]['username'],
            skills: data[0]['skills'],
            address: data[0]['agentAddress'],
            joiningDate: data[0]['joiningDate'],
            agentlanguage: data[0]['agentlanguage'],
            isLoading: false,
            isUploading: false
          });
        } catch (e) {
          console.log("....Error.... ",e)
        }
    })
  }

  handleUplaodFromGallery = () => {
    launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
      if(response.didCancel){
        return;
      }
      else {
        this.setState({
          imageSource: response.uri,
          isImage: true
        })
    }
    });
  }

  handleUplaodFromCamera = () => {
    launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
      if(response.didCancel){
        return;
      }
      else {
        this.setState({
          imageSource: response.uri,
          isImage: true
        })
    }
    });
  }

  uploadPhoto = () => {
    this.setState({
      isImageUploading: true
    })
    let uploadData = new FormData();

    uploadData.append( 'profileimage',  {
      uri: this.state.imageSource,
      type: 'image/jpg',
      name: 'image.jpg',
    })

    fetch(url+'/postUserData/'+this.state.uId,{
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: 'POST',
      body: uploadData,
    }).then((response) => {
        response.text().then((res) => {
          console.log(res);
          this.setState({
            isImageUploading: false
          })
          
        });
      })
      .catch((error) => {
        console.log(error, "Image is not uploaded");
      });
      
  }

  updateUserData = async() => {

    this.setState({
      isLoading: true
    })
    let uploadData1 = new FormData();

    if(this.state.username){
      uploadData1.append( 'username',  this.state.username);
    }

    if(this.state.address){
      uploadData1.append( 'address', this.state.address);
    }

    if(this.state.isLanguagesChanged){
          uploadData1.append( 'agentlanguage', JSON.stringify(this.state.agentlanguage));
          }

    if(this.state.isSkillsChanged){
      uploadData1.append( 'skills', JSON.stringify(this.state.skills));
    }
    await fetch(url+'/postUserData/'+this.state.uId,{
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: 'POST',
      body: uploadData1,
    }).then((response) => {
        response.text().then((res) => {
          console.log(res);
        });
      })
      .catch((error) => {
        console.log(error, "...Error...");
      });

      this.setState({
        isLoading: false,
        isSkillsChanged: false,
        isLanguagesChanged: false
      })
      this.props.navigation.navigate('ProfileScreen')
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  

  render(){
    const { modalVisible } = this.state;
    return (
    <SafeAreaView style={styles.container}>
        <Header
        title='Edit Profile'
        isHome={false}
        navigation={this.props.navigation}
        />
        <ScrollView style={styles.editSection}>
            <View>
                <View style={styles.profileHeader}>
                    { !this.state.isImage ?
                    <>
                    <TouchableOpacity style={styles.barIcon}>
                      <Avatar.Image
                        source={{
                          uri: this.state.profileimage,
                      }}
                      size = {80}
                      >
                      </Avatar.Image> 
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Text style={styles.modalText}>Upload From!</Text>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={this.handleUplaodFromCamera}
                          >
                            <Text style={styles.textStyle}>Camera</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={this.handleUplaodFromGallery}
                          >
                          <Text style={styles.textStyle}>Gallery</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => this.setModalVisible(false)}
                          >
                            <Text style={styles.textStyle}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                    </>
                            :
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={styles.barIcon}>
                      <Avatar.Image
                        source={{
                          uri: this.state.imageSource,
                      }}
                      size = {80}
                      >
                      </Avatar.Image> 
                    </TouchableOpacity>
                    </View>
                }
                <View style={styles.uploadSection}>
                  <Icon
                  onPress={() => this.setModalVisible(true)}
                      name="camera"
                      size={35}
                      color="#006600"
                      style={{
                        borderWidth: 1,
                        borderColor: '#006600',
                        height: 60,
                        borderRadius: 10,
                        padding: 10
                      }}
                  />
                   { this.state.isImage ? 
                     <TouchableOpacity style={styles.uploadingIcon} onPress={this.uploadPhoto}>
                        <Icon
                        onPress={this.uploadPhoto}
                            name="upload"
                            size={20}
                            color="#ffffff"
                        />
                        { this.state.isImageUploading ? 
                          <ActivityIndicator size={26} color='#ffffff' />
                          :
                            <Text style={{color: '#fff'}}>Upload</Text>
                          }
                      </TouchableOpacity>
                   : null
                   }
                </View>                
                </View>

                <View style={styles.action}> 
                  <Text style={{color: '#AAAAAA',fontSize: 16, marginTop: 15}}>Your Name</Text>
                  <TextInput
                      placeholder={this.state.data['username']}
                      placeholderTextColor="#000000"
                      autoCorrect={false}
                      style={[
                      styles.textInput,{color: '#000000',},
                      ]}
                      value={this.state.username}
                      onChangeText={val => this.onChangeUserName(val)}
                  />
                </View>

                <View style={[styles.action,{marginBottom: 10}]}> 
                  <Text style={{color: '#AAAAAA',fontSize: 16, marginTop: 15}}>Address</Text> 
                  <TextInput
                      placeholder="Address"
                      placeholderTextColor="#000000"
                      value={this.state.address}
                      onChangeText={val => this.onChangeAddress(val)}
                      autoCorrect={false}
                      style={[
                      styles.textInput,
                      {
                          color: '#000000',
                      },
                      ]}
                  />
                </View>
                <View style={styles.pickerView}>
                  <DropDownPicker
                  style={[
                    styles.action,
                    {
                      marginTop: 10,
                      color: '#000000',
                    },
                    ]}
                        items={[
                          {label: 'Cleaning', value: 'Cleaning'},
                          {label: 'Furnishing', value: 'Furnishing'},
                          {label: 'Managing', value: 'Managing'},
                          {label: 'Driving', value: 'Driving'},
                          {label: 'Other', value: 'Other'},
                      ]}
                        multiple={true}
                        multipleText="Select your Skills"
                        min={0}
                        max={4}
                        dropDownStyle={{backgroundColor: '#fff', fontSize: 26,color: '#FFFFFF'}}
                        defaultValue={this.state.skill}
                        containerStyle={{height: 60}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        onChangeItem={item => this.setState({
                            isSkillsChanged: true,
                            skills: item
                        })}
                    />
                  </View>
                    <View style={[styles.action, {flexDirection: 'row',alignItems: 'center',marginBottom: 10}]}> 
                    {
                       this.state.skills.map((skill, index)=>
                      <Text key={index}
                          style={[
                          styles.textInput,
                          {
                              color: '#000000',
                              alignItems: 'center',
                          },
                          ]}
                      > {skill}, </Text>
                       )
                      }
                    </View>
                <View style={styles.pickerView}>
                  <DropDownPicker
                  style={[
                    styles.action,
                    {
                      marginTop: 10,
                      color: '#000000',
                    },
                    ]}
                        items={[
                            {label: 'Arabic', value: 'Arabic'},
                            {label: 'English', value: 'English'},
                            {label: 'Hindi', value: 'Hindi'},
                            {label: 'Urdu', value: 'Urdu'},
                            {label: 'Other', value: 'Other'},
                        ]}
                        multiple={true}
                        multipleText="Select the languages"
                        min={0}
                        max={10}
                        dropDownStyle={{backgroundColor: '#fff', fontSize: 26,color: '#FFFFFF'}}
                        defaultValue={this.state.languages}
                        containerStyle={{height: 60}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        onChangeItem={item => this.setState({
                            isLanguagesChanged: true,
                            agentlanguage: item
                        })}
                    />
                  </View>
                    <View style={[styles.action, {flexDirection: 'row',alignItems: 'center'}]}> 
                    <Text style={[
                          styles.textInput,
                          {
                              color: '#000000',
                              alignItems: 'center',
                          },
                          ]}
                      ></Text>
                      {
                       this.state.agentlanguage.map((language, index)=>
                      <Text key={index}
                          style={[
                          styles.textInput,
                          {
                              color: '#000000',
                              alignItems: 'center',
                          },
                          ]}
                      > {language}, </Text>
                       )
                      }
                    </View>
                <View style={[styles.action,{ marginBottom: 20 }]}> 
                  <Text style={{color: '#AAAAAA',fontSize: 16, marginTop: 15}}>Covid Vaccination ID</Text> 
                  <TextInput
                      placeholder="COV-19923"
                      placeholderTextColor="#000000"
                      value={""}
                      onChangeText={val => this.onChangeAddress(val)}
                      autoCorrect={false}
                      style={[
                      styles.textInput,
                      {
                          color: '#000000',
                      },
                      ]}
                  />
                </View>
            </View>
        </ScrollView>
        <View style={styles.choiceButton}>
            <TouchableOpacity style={styles.commandButton1} onPress={ () => {this.props.navigation.goBack()} }>
            <Icon
              name="close-circle"
                  size={36}
                  color="red"
            />
            </TouchableOpacity>
            <TouchableOpacity style={styles.commandButton} onPress={ this.updateUserData }>
                    { this.state.isLoading ? 
                    <ActivityIndicator size={26} color='#ffffff' />
                    :
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                          name="check-all"
                          size={36}
                          color="#ffffff"
                        />
                      </View>
                    }
            </TouchableOpacity>
          </View>
    </SafeAreaView>
    ); 
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1, 
    },
    editSection: { 
      backgroundColor: '#FFFFFF',
        paddingBottom: 100
    },
    choiceButton: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 11,
      },
      shadowOpacity: 0.57,
      shadowRadius: 15.19,
      
      elevation: 23,
    flexDirection: 'row',
      backgroundColor: '#fff',
    },
    commandButton: {
      marginTop: 10,
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#006600',
      alignItems: 'center', 
      marginBottom: 10,
      width: '45%',
    },
    commandButton1: {
      marginTop: 10,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center', 
      marginBottom: 10,
      width: '45%',
      marginRight: 8
    },
    uploadSection: {
      flexDirection: 'column',
    },
    uploadingIcon: {
      flexDirection: 'row',
      width: 80,
      marginTop: 10,
      height: 40,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#006600',
      marginBottom: 20
    },
panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 5,
      shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 24, 
      color: 'white',
      fontWeight: '600',
    },
    panelButtonTitle1: {
      fontSize: 24, 
      color: '#000000',
      fontWeight: '600',
    },
    action: {
      width: '95%',
      marginTop: 20,
      height: 60,
      paddingTop: 5,
      paddingLeft: 10,
      marginHorizontal: '2.5%',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#AAAAAA',
      justifyContent: 'center',
      paddingBottom: 10
    },
    actionError: {
      flexDirection: 'row',
      paddingBottom: 5,
    },
    textInput: {
      color: '#000',
      fontSize: 16,
      marginTop: -10
    },
    pickerView: {
      width: '95%',
      marginHorizontal: '2.5%'
    },
  button: {
      height: 40,
      width: 120,
      backgroundColor: '#006600',
      borderRadius: 5,
      marginVertical: 10,
      marginLeft: 10,
  },
  profileHeader: {
    backgroundColor: '#F3F3F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    color: '#006600',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 5,
    width: 150,
    },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  });

export default EditProfileScreen;