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
    Alert,
    Button,
    Modal,
    Pressable,
    Image
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import {url} from '../../constants/constant';
import Header from '../../components/Header/Header';
import { color } from 'react-native-reanimated';

var languages = [] ;
var skills = [] ;

class UploadDocumentsScreen extends Component{

  constructor() {
    super();

  this.state = {
    data: [],
    isLoading: false,
    imageSource: '',
    isImage: false,
    isEmiratesFrontImage: false,
    isEmiratesBackImage: false,
    isVisaCopyImage: false,
    isvaccinationCardImage: false,
    isEmpCardBackImage: false,
    isDrivingFrontImage: false,
    isDrivingBackImage: false,
    phone: '',
    username: '',
    agentlanguage: [],
    skills: [],
    address: '',
    profession: '',
    joiningDate: '',
    skill: '',
    uId: '',
    profileimage: '',
    vaccinationCardImage: '',
    empCardBackImage: '',
    agentDrivingLicenceFront: '',
    agentDrivingLicenceBack: '',
    emiratesIdFrontImage: '',
    emiratesIdBackImage: '',
    visaCopyImage: '',
    
    vaccinationCardImageSource: '',
    empCardBackImageSource: '',
    emiratesIdFrontSource: '',
    emiratesIdBackSource: '',
    drivingImageFrontSource: '',
    drivingImageBackSource: '',
    userChoice: '',
    isModalVisible: true,
    modalVisible: false,
    choice: '',
    agentId: ''
    };
  }
  setModalVisible = (visible, choice) => {
    console.log(this.state.agentId);
    this.setState({
      choice: choice,
      modalVisible: visible,
    });
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
          console.log(data[0]['agentId']);
          this.setState({
            data: data[0],
            agentId: data[0]['agentId'],
            emiratesIdFrontImage: data[0]['emaratesIDFront'] !== undefined ? data[0]['emaratesIDFront'] : '',
            emiratesIdBackImage: data[0]['emaratesIDBack'] !== undefined ? data[0]['emaratesIDBack'] : '',
            visaCopyImage: data[0]['visaCopy'] !== undefined ? data[0]['visaCopy'] : '',
            vaccinationCardImage: data[0]['pcrReport'] !== undefined ? data[0]['pcrReport'] : '',
            empCardBackImage: data[0]['empCardBack'] !== undefined ? data[0]['empCardBack'] : '',
            agentDrivingLicenceFront: data[0]['agentDrivingLicenceFront'] !== undefined ? data[0]['agentDrivingLicenceFront'] : '',
            agentDrivingLicenceBack: data[0]['agentDrivingLicenceBack'] !== undefined ? data[0]['agentDrivingLicenceBack'] : '',
            isLoading: false,
          })
        } catch (e) {
          console.log("....Error.... ",e)
        }
    })
  }

  handleEmiratesIdFront = (chooseFrom) => {
    if(chooseFrom=="1"){
        launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
          if(response.didCancel){
            return;
          }
          else {
            this.setState({
              modalVisible: false,
              emiratesIdFrontImage: response.uri,
              emiratesIdFrontSource: response.uri,
              })
        }
        });
    }
    else if(chooseFrom=="2"){
      launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
        if(response.didCancel){
          return;
        }
        else {
          this.setState({
            emiratesIdFrontSource: response.uri,
            isEmiratesFrontImage: true,
            modalVisible: false,
            emiratesIdFrontImage: response.uri,
          })
      }
      });
    }
  }
  handleEmiratesIdBack = (chooseFrom) => {
    if(chooseFrom=="1"){
      launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
        if(response.didCancel){
          return;
        }
        else {
          this.setState({
            emiratesIdBackSource: response.uri,
            isEmiratesBackImage: true,
            modalVisible: false,
            emiratesIdBackImage: response.uri,
          })
      }
      });
    }
    else if(chooseFrom){
      launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
        if(response.didCancel){
          return;
        }
        else {
          this.setState({
            emiratesIdBackSource: response.uri,
            isEmiratesBackImage: true,
            modalVisible: false,
            emiratesIdBackImage: response.uri,
          })
      }
      });
    }
  }

  handleVacination = (chooseFrom) => {
    if(chooseFrom=="1"){
      launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
        if(response.didCancel){
          return;
        }
        else {
          this.setState({
            vaccinationCardImageSource: response.uri,
            isvaccinationCardImage: true,
            modalVisible: false,
            vaccinationCardImage: response.uri,
          })
      }
      });
    }
    else if(chooseFrom=="2"){
      launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
          if(response.didCancel){
            return;
          }
          else {
            this.setState({
              isvaccinationCardImage: true,
              modalVisible: false,
              vaccinationCardImage: response.uri,
            })
        }
        });
    }
  }

  handleEmpBackImage = (chooseFrom) => {
    if(chooseFrom=="1"){
      launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
          if(response.didCancel){
            return;
          }
          else {
            this.setState({
              empCardBackImageSource: response.uri,
              isEmpCardBackImage: true,
              modalVisible: false,
              empCardBackImage: response.uri,
            })
        }
        });
    }
    else if(chooseFrom=="2"){
      launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
          if(response.didCancel){
            return;
          }
          else {
            this.setState({
              empCardBackImageSource: response.uri,
              isEmpCardBackImage: true,
              modalVisible: false,
              empCardBackImage: response.uri,
            })
        }
        });
    }
  }

  handleDrivingFrontImage = (chooseFrom) => {
    if(chooseFrom=="1"){ 
      launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
          if(response.didCancel){
            return;
          }
          else {
            this.setState({
              drivingImageFrontSource: response.uri,
              isDrivingFrontImage: true,
              modalVisible: false,
              agentDrivingLicenceFront: response.uri,
            })
        }
        });
      }
      if(chooseFrom=="2"){ 
        launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
            if(response.didCancel){
              return;
            }
            else {
              this.setState({
                drivingImageFrontSource: response.uri,
                isDrivingFrontImage: true,
              modalVisible: false,
              agentDrivingLicenceFront: response.uri,
              })
          }
          });
        }
        }

  handleDrivingBackImage = (chooseFrom) => {
    if(chooseFrom=="1"){
    launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
        if(response.didCancel){
          return;
        }
        else {
          this.setState({
            drivingImageBackSource: response.uri,
            isDrivingBackImage: true,
              modalVisible: false,
              agentDrivingLicenceBack: response.uri,
          })
      }
      });
  }
  else if(chooseFrom=="2"){
    launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
        if(response.didCancel){
          return;
        }
        else {
          this.setState({
            drivingImageBackSource: response.uri,
            isDrivingBackImage: true,
              modalVisible: false,
              agentDrivingLicenceBack: response.uri,
          })
      }
      });
  }
  }
  handleVisa = (chooseFrom) => {
    if(chooseFrom=="1"){
      launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
        if(response.didCancel){
          return;
        }
        else {
          this.setState({
            isVisaCopyImage: true,
            modalVisible: false,
            visaCopyImage: response.uri,
          })
      }
      });
    }
    else if(chooseFrom=="2"){
      launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
        if(response.didCancel){
          return;
        }
        else {
          this.setState({
            isVisaCopyImage: true,
            modalVisible: false,
            visaCopyImage: response.uri,
          })
      }
      });
    }
  }

  handleSelectPhoto = (chooseFrom) => {
    if(this.state.choice=='1'){
      this.handleEmiratesIdFront(chooseFrom)
    }
    else if(this.state.choice=='2'){
      this.handleEmiratesIdBack(chooseFrom)
    }
    else if(this.state.choice=='3'){
      this.handleVisa(chooseFrom)
    }
    else if(this.state.choice=='4'){
      this.handleVacination(chooseFrom)
    }
    else if(this.state.choice=='5'){
      this.handleEmpBackImage(chooseFrom)
    }
    else if(this.state.choice=='6'){
      this.handleDrivingFrontImage(chooseFrom)
    }
    else if(this.state.choice=='7'){
      this.handleDrivingBackImage(chooseFrom)
    }
    this.setState(
      {
        isModalVisible: false
      }
    )
  }

  uploadPhoto = async () => {
    
    let uploadData = new FormData();

    if(this.state.isEmiratesFrontImage){
    uploadData.append( 'emaratesIDFront',  {
        uri: this.state.emiratesIdFrontImage,
        type: 'image/jpg',
        name: 'image.jpg',
      })
    }
    if(this.state.isEmiratesBackImage){
      uploadData.append( 'emaratesIDBack',  {
        uri: this.state.emiratesIdBackImage,
        type: 'image/jpg',
        name: 'image.jpg',
      })
    }
    if(this.state.isVisaCopyImage){
        uploadData.append( 'visaCopy',  {
          uri: this.state.visaCopyImage,
          type: 'image/jpg',
          name: 'image.jpg',
        })
      }
    if(this.state.isvaccinationCardImage){
    uploadData.append( 'pcrReport',  {
        uri: this.state.vaccinationCardImage,
        type: 'image/jpg',
        name: 'image.jpg',
    })
    }
    if(this.state.isEmpCardBackImage){
        uploadData.append( 'empCardBack',  {
            uri: this.state.empCardBackImage,
            type: 'image/jpg',
            name: 'image.jpg',
        })
        }
    if(this.state.isDrivingFrontImage){
        uploadData.append( 'agentDrivingLicenceFront',  {
            uri: this.state.agentDrivingLicenceFront,
            type: 'image/jpg',
            name: 'image.jpg',
        })
        }
    if(this.state.isDrivingBackImage){
        uploadData.append( 'agentDrivingLicenceBack',  {
            uri: this.state.agentDrivingLicenceBack,
            type: 'image/jpg',
            name: 'image.jpg',
    })
    }
    this.setState({
      isLoading: true,
    })
       await fetch(url+'/postUserData/'+this.state.uId,{
        headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        },
        method: 'POST',
        body: uploadData,
    }).then((response) => {
        response.text().then((res) => {
        this.setState({
          isLoading: false,
        })
        this.props.navigation.goBack();
        });
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
          })
          
        console.log(error, "Image is not uploaded");
        });
        this.props.navigation.goBack();
  }
  deleteImageFromBackend = async(imageSource) => {
    await fetch(url+'/deleteimages/'+this.state.uId,{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
      body:JSON.stringify({
        "agentId": this.state.agentId,
        "image_path": imageSource,
      })
     }).then(res=>res.text())
     .then(async (data)=>{
       console.log(data);
        Alert.alert(
          "Deleted",
          "This Image was successfully deleted!",
          [
            {
              text: "Okay",
              onPress: () => console.log("Okay Pressed"),
              style: "cancel"
            },
          ]
        )
  })
      .catch((error) => {
        console.log(error, "...Error...");
      });
  }


  deleteImage = (deleteSource) => {

    Alert.alert(
      "Delete",
      "Are you sure you want to delete this image?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          onPress: () => {
            if(deleteSource=="1"){
              this.deleteImageFromBackend(this.state.emiratesIdFrontImage)
              this.setState({
                emiratesIdFrontImage: null,
                isEmiratesFrontImage: false
              })
            }
            else if(deleteSource=="2"){
              this.deleteImageFromBackend(this.state.emiratesIdBackImage)
              this.setState({
                emiratesIdBackImage: null,
                isEmiratesBackImage: false
              })
            }
            if(deleteSource=="3"){
              this.deleteImageFromBackend(this.state.visaCopyImage)
              this.setState({
                visaCopyImage: null,
                isVisaCopyImage: false
              })
            }
            else if(deleteSource=="4"){
              this.deleteImageFromBackend(this.state.vaccinationCardImage)
              this.setState({
                vaccinationCardImage: null,
                isvaccinationCardImage: false
              })
            }
            if(deleteSource=="5"){
              this.deleteImageFromBackend(this.state.empCardBackImage)
              this.setState({
                empCardBackImage: null,
                isEmpCardBackImage: false
              })
            }
            else if(deleteSource=="6"){
              this.deleteImageFromBackend(this.state.agentDrivingLicenceFront)
              this.setState({
                agentDrivingLicenceFront: null,
                isDrivingFrontImage: false
              })
            }
            if(deleteSource=="7"){
              this.deleteImageFromBackend(this.state.agentDrivingLicenceBack)
              this.setState({
                agentDrivingLicenceBack: null,
                isDrivingBackImage: false
              })
            }
          }
      }
      ]
    ); 
  }
  render(){
    const { modalVisible } = this.state;
    return (
    <SafeAreaView style={styles.container}>
        <Header 
        title=''
        isHome={true}
        navigation={this.props.navigation}
        />
        <View style={styles.topBar}>
                    <Text style={styles.topBarText}>Edit Documents</Text>
                </View>
        <ScrollView style={styles.editSection}>
              <View style={styles.doubleSection}>
                <View style={styles.bar}>
                    <Text style={styles.barText}>Emirates ID Front</Text>
                    <TouchableOpacity style={styles.barIcon} onPress={() => this.setModalVisible(true, "1")}>
                      <Icon
                      name="scan-helper"
                          size={26}
                          color="#fff"
                      />
                      <Text style={{fontWeight: 'bold',fontSize: 20,marginLeft: 5,color: '#fff'}}>Scan</Text>
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.centegreenView}>
                        <View style={styles.modalView}>
                          <Text style={styles.modalText}>Upload From!</Text>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>{this.handleSelectPhoto("1")}}
                          >
                            <Text style={styles.textStyle}>Camera</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>{this.handleSelectPhoto("2")}}
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
                </View>
                { this.state.emiratesIdFrontImage !=="" && this.state.emiratesIdFrontImage !== undefined
                  && this.state.emiratesIdFrontImage !== null ?
                    <View style={styles.firstItem}>
                          <View
                          style={{
                              height: 150,
                              width: '100%',
                              borderRadius: 15,       
                              resizeMode: 'contain'
                          }}>
                            <ImageBackground
                                source={{
                                uri: this.state.emiratesIdFrontImage,
                                }}
                              style={{
                                height: 150,
                                width: '100%',
                                borderRadius: 15,       
                                resizeMode: 'contain'
                              }}
                              imageStyle={{borderRadius: 15}}>
                                <View
                                style={{
                                    width: 40,
                                    height: 50,
                                    justifyContent: 'flex-end',
                                }}>
                                <Icon 
                                    onPress={()=>{ this.deleteImage("1")}}
                                    name="delete-sweep"
                                    size={26}
                                    color="green"
                                    style={{alignSelf: 'flex-end',}}
                                />
                                </View>
                            </ImageBackground>
                            </View> 
                    </View>
                    : null }
                </View>

                <View style={styles.doubleSection}>
                  <View style={styles.bar}>
                      <Text style={styles.barText}>Emirates ID Back</Text>
                      <TouchableOpacity style={styles.barIcon} onPress={() => this.setModalVisible(true, "2")}>
                          <Icon
                          name="scan-helper"
                              size={26}
                              color="#fff"
                          />
                          <Text style={{fontWeight: 'bold',fontSize: 20,marginLeft: 5,color: '#fff'}}>Scan</Text>
                        </TouchableOpacity>
                  </View>

                  { this.state.emiratesIdBackImage !=="" && this.state.emiratesIdBackImage !== undefined
                  && this.state.emiratesIdBackImage !== null ?
                    <View style={styles.firstItem}>
                          <View
                          style={{
                              height: 150,
                              width: '100%',
                              borderRadius: 15,       
                              resizeMode: 'contain'
                          }}>
                            <ImageBackground
                                source={{
                                uri: this.state.emiratesIdBackImage,
                                }}
                              style={{
                                height: 150,
                                width: '100%',
                                borderRadius: 15,       
                                resizeMode: 'contain'
                              }}
                              imageStyle={{borderRadius: 15}}>
                                <View
                                style={{
                                    width: 40,
                                    height: 50,
                                    justifyContent: 'flex-end',
                                }}>
                                <Icon 
                                    onPress={()=>{ this.deleteImage("2")}}
                                    name="delete-sweep"
                                    size={26}
                                    color="green"
                                    style={{alignSelf: 'flex-end',}}
                                />
                                </View>
                            </ImageBackground>

                            </View> 
                    </View>
                    : null } 

                </View>

                <View style={styles.doubleSection}>
                  <View style={styles.bar}>
                      <Text style={styles.barText}>Visa Copy</Text>
                      <TouchableOpacity style={styles.barIcon}  onPress={() => this.setModalVisible(true, "3")}>
                        <Icon
                            name="scan-helper"
                            size={26}
                            color="#fff"
                        />
                        <Text style={{fontWeight: 'bold',fontSize: 20,marginLeft: 5,color: '#fff'}}>Scan</Text>
                      </TouchableOpacity>
                  </View>
                  { this.state.visaCopyImage !=="" && this.state.visaCopyImage !== undefined
                  && this.state.visaCopyImage !== null ?
                    <View style={styles.firstItem}>
                          <View
                          style={{
                              height: 150,
                              width: '100%',
                              borderRadius: 15,       
                              resizeMode: 'contain'
                          }}>
                            <ImageBackground
                                source={{
                                uri: this.state.visaCopyImage,
                                }}
                              style={{
                                height: 150,
                                width: '100%',
                                borderRadius: 15,       
                                resizeMode: 'contain'
                              }}
                              imageStyle={{borderRadius: 15}}>
                                <View
                                style={{
                                    width: 40,
                                    height: 50,
                                    justifyContent: 'flex-end',
                                }}>
                                <Icon 
                                    onPress={()=>{ this.deleteImage("3")}}
                                    name="delete-sweep"
                                    size={26}
                                    color="green"
                                    style={{alignSelf: 'flex-end',}}
                                />
                                </View>
                            </ImageBackground>
                            </View> 
                    </View>
                    : null }

                </View>

              <View style={styles.doubleSection}>
                  <View style={styles.bar}>
                      <Text style={styles.barText}>Vaccination Card</Text>
                      <TouchableOpacity style={styles.barIcon}  onPress={() => this.setModalVisible(true, "4")}>
                        <Icon
                            name="scan-helper"
                            size={26}
                            color="#fff"
                        />
                        <Text style={{fontWeight: 'bold',fontSize: 20,marginLeft: 5,color: '#fff'}}>Scan</Text>
                      </TouchableOpacity>
                  </View>
                  { this.state.vaccinationCardImage !=="" && this.state.vaccinationCardImage !== undefined
                  && this.state.vaccinationCardImage !== null ?
                    <View style={styles.firstItem}>
                          <View
                          style={{
                              height: 150,
                              width: '100%',
                              borderRadius: 15,       
                              resizeMode: 'contain'
                          }}>
                            <ImageBackground
                                source={{
                                uri: this.state.vaccinationCardImage,
                                }}
                              style={{
                                height: 150,
                                width: '100%',
                                borderRadius: 15,       
                                resizeMode: 'contain'
                              }}
                              imageStyle={{borderRadius: 15}}>
                                <View
                                style={{
                                    width: 40,
                                    height: 50,
                                    justifyContent: 'flex-end',
                                }}>
                                <Icon 
                                    onPress={()=>{ this.deleteImage("4")}}
                                    name="delete-sweep"
                                    size={26}
                                    color="green"
                                    style={{alignSelf: 'flex-end',}}
                                />
                                </View>
                            </ImageBackground>
                            </View> 
                    </View>
                    : <Text></Text> }
                   
                </View>
                 
                <View style={styles.doubleSection}>
                  <View style={styles.bar}>
                      <Text style={styles.barText}>Driving Card Front (Optional)</Text>
                      <TouchableOpacity style={styles.barIcon}  onPress={() => this.setModalVisible(true, "6")}>
                        <Icon
                            name="scan-helper"
                            size={26}
                            color="#fff"
                        />
                        <Text style={{fontWeight: 'bold',fontSize: 20,marginLeft: 5,color: '#fff'}}>Scan</Text>
                      </TouchableOpacity>
                  </View>
                  { this.state.agentDrivingLicenceFront !=="" && this.state.agentDrivingLicenceFront !== undefined
                  && this.state.agentDrivingLicenceFront !== null ?
                    <View style={styles.firstItem}>
                          <View
                          style={{
                              height: 150,
                              width: '100%',
                              borderRadius: 15,       
                              resizeMode: 'contain'
                          }}>
                            <ImageBackground
                                source={{
                                uri: this.state.agentDrivingLicenceFront,
                                }}
                              style={{
                                height: 150,
                                width: '100%',
                                borderRadius: 15,       
                                resizeMode: 'contain'
                              }}
                              imageStyle={{borderRadius: 15}}>
                                <View
                                style={{
                                    width: 40,
                                    height: 50,
                                    justifyContent: 'flex-end',
                                }}>
                                <Icon 
                                    onPress={()=>{ this.deleteImage("6")}}
                                    name="delete-sweep"
                                    size={26}
                                    color="green"
                                    style={{alignSelf: 'flex-end',}}
                                />
                                </View>
                            </ImageBackground>
                            </View> 
                    </View>
                    : null }
                    
                </View>

                <View style={styles.doubleSection}>
                  <View style={styles.bar}>
                      <Text style={styles.barText}>Driving Card Back (Optional)</Text>
                      <TouchableOpacity style={styles.barIcon}  onPress={() => this.setModalVisible(true, "7")}>
                        <Icon
                            name="scan-helper"
                            size={26}
                            color="#fff"
                        />
                        <Text style={{fontWeight: 'bold',fontSize: 20,marginLeft: 5,color: '#fff'}}>Scan</Text>
                      </TouchableOpacity>
                  </View>
                  { this.state.agentDrivingLicenceBack !=="" && this.state.agentDrivingLicenceBack !== undefined
                  && this.state.agentDrivingLicenceBack !== null ?
                    <View style={styles.firstItem}>
                          <View
                          style={{
                              height: 150,
                              width: '100%',
                              borderRadius: 15,       
                              resizeMode: 'contain'
                          }}>
                            <ImageBackground
                                source={{
                                uri: this.state.agentDrivingLicenceBack,
                                }}
                              style={{
                                height: 150,
                                width: '100%',
                                borderRadius: 15,       
                                resizeMode: 'contain'
                              }}
                              imageStyle={{borderRadius: 15}}>
                                <View
                                style={{
                                    width: 40,
                                    height: 50,
                                    justifyContent: 'flex-end',
                                }}>
                                <Icon 
                                    onPress={()=>{ this.deleteImage("7")}}
                                    name="delete-sweep"
                                    size={26}
                                    color="green"
                                    style={{alignSelf: 'flex-end',}}
                                />
                                </View>
                            </ImageBackground>
                            </View> 
                    </View>
                    : null }
                    
                </View>
 
        </ScrollView>
        <View style={styles.choiceButton}>
          <TouchableOpacity style={styles.commandButton1} onPress={ () => {this.props.navigation.goBack()} }>
                    {/* <Text>Cancel</Text> */}
                    <Icon
                      name="close-circle"
                          size={36}
                          color="red"
                      />
                    
          </TouchableOpacity>
          <TouchableOpacity style={styles.commandButton} onPress={ this.uploadPhoto }>
                  { this.state.isLoading ? 
                  <ActivityIndicator size={26} color='#ffffff' style={{marginTop: 15}} />
                  :
                  // <Text style={{color: '#ffffff'}}>Save</Text>
                  <Icon
                      name="check-all"
                          size={36}
                          color="#ffffff"
                      />
                  //<Image source={require('../../../assets/submit.jpeg')} style={{ width: 40, height: 40 }} />
                      
                  }
          </TouchableOpacity>
        </View>
    </SafeAreaView>
    ); 
  }
}


const styles = StyleSheet.create({
    container: {
    flex: 1
    },
     editSection: { 
       marginTop: 20,
    },
    commandButton: {
      marginTop: 10,
      paddingTop: 8,
      borderRadius: 10,
      backgroundColor: '#006600',
      alignItems: 'center', 
      marginBottom: 10,
      width: '45%',
      height: 60
    },
    commandButton1: {
      marginTop: 10,
      padding: 15,
      borderRadius: 10,
      borderColor: '#006600',
      alignItems: 'center', 
      marginBottom: 10,
      width: '45%',
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
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
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
    topBar: {
      width: '100%',
      backgroundColor: '#ffffff',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 45,
      borderBottomRightRadius: 45,
      paddingBottom: 5
    },
    topBarText: {
      color: '#006600',
      fontWeight: '600',
      fontSize: 24
    },
    bar: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#F4F6F8',
        height: 40,
        alignItems: 'center',
        marginBottom: 20
    },
    barText: {
        opacity: 1,
        color: '#000',
        fontWeight: 'bold',
    },
    barIcon: {
      flexDirection: 'row',
      position: 'absolute',
      right: 0,
      backgroundColor: '#006600',
      borderRadius: 10,
      paddingHorizontal: 3,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: 120, 
    },
    doubleSection: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F4F6F8',
        borderRadius: 15,
        marginBottom: 20,
    },
    firstItem: {
        width: '100%',
        flexDirection: 'column',
        borderRadius: 15,
    },
    sectionText: {

    },
    choiceButton: {
      flexDirection: 'row',
      backgroundColor: '#fff'
    },
    centegreenView: {
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
    }

  });

export default UploadDocumentsScreen;
