import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import {Text} from 'native-base';
import styles from '../styles/styles';
import CustomHeader from '../component/CustomHeader';
// import * as ImagePicker from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {url} from '../constants/constant';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import {Snackbar} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-elements';
import CustomModal from '../component/Modal';
import Lightbox from 'react-native-lightbox';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    }

  state = {
    ProfileimageReceived: false,
    ProfileImage: null,
    imgName: '',
    imgType: '',
    UserData: [],
    fullName: '',
    profilePicture:'',
    emaratesIDf:'',
    emaratesIDb:'',
    user_id:'',
    imagepath:'',
    phoneNo: '',
    uploading: false,
    visible: false,
    ImageRemove: false,
    ConfirmationModal: false,
    Popup1: false,
    Popup2:false,
    imageurl:'',
    iduser:'',
    joiningDate:'',
    Skills:'',
    resignationDate:'dd/mm/yy',
  };
getCurrentDate(){
var day = new Date().getDate(); 
var month = new Date().getMonth()+1;
var year= new Date().getFullYear();
this.setState({
    joiningDate:day+'/'+month+'/'+year
  })
}

RemoveEmaratesIdFront=async()=>{

    const token = await AsyncStorage.getItem("token")
    iduser=this.state.user_id;
    await this.setState({
      uploading:false
    });
    //console.log("Image path is "+this.imageurl)
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "emaratesIDFront":'/'
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              //console.log('image removed')
              await this.setState({
                emaratesIDFront:'/'
              });

            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
  };

  RemoveEmaratesIdBack=async()=>{
    const token = await AsyncStorage.getItem("token")
    iduser=this.state.user_id;
    await this.setState({
      uploading:false
    });
    //console.log("Image path is "+this.imageurl)
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "emaratesIDBack":'/'
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              //console.log('image removed')
              await this.setState({
                emaratesIDBack:'/'
              });

            } catch (e) {
              console.log("....Error.... ",e)
            }
     })

  };


  RemoveImage = async () => {
      const token = await AsyncStorage.getItem("token")
    iduser=this.state.user_id;
    await this.setState({
      uploading:false
    });
    //console.log("Image path is "+this.imageurl)
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "profileimage":'/'
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              //console.log('image removed')
              await this.setState({
                profilePicture:'/'
              });

            } catch (e) {
              console.log("....Error.... ",e)
            }
     })



    // const UserID = await AsyncStorage.getItem('UserID');
    // await axios
    //   .post(url + '/customer/RemoveCustomerImage', {
    //     customerID: UserID,
    //   })
    //   .then(async Response => {
    //     let ERROR = Response.data.error;
    //     if (!ERROR) {
    //       this.setState({ImageRemove: true, ProfileImage: null});
    //     }
    //   })
    //   .catch(error => {
    //     //console.log(error);
    //   });
  };
DeleteImage = async () => {
      const token = await AsyncStorage.getItem("token")
    imgpath=this.state.imagepath;
    imgpath1=imgpath.split('/');
    await this.setState({
      uploading:false
    });
    //console.log("Image path is "+this.imageurl)
    fetch(url+'/deleteimage/'+imgpath1[1],{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "profileimage":'/'
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              //console.log('image removed')
              await this.setState({
                profilePicture:'/'
              });

            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
  };


  SelectProfileImage = async () => {
    iduser=this.state.user_id;
    const options = {
      title: 'Select or Capture Your Profile Picture.',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
     //console.log(Response)
    // // console.log('resp', Response.fileName);
    // if (Response.didCancel) {
    // } else if (Response.error) {
    // } else {
    //   const ProfileImg = Platform.OS === "android" ? Response.uri : Response.uri.replace('file://', '');
    //   ImageResizer.createResizedImage(ProfileImg, 500, 500,'JPEG', 50, 90, null)
    //   .then(async response => {
    //        await this.setState(
    //     {
    //       ProfileimageReceived: true,
    //       ProfileImage: Platform.OS === "android" ? Response.uri : Response.uri.replace('file://', ''),
    //       imgName: Response.fileName !== null ? Response.fileName : "uploadPic",
    //       imgType: Response.type,
    //       uploading: true,
    //     },
    //     () => {
    //       this.uploadImage();
    //     },
    //   );
    //  console.log('RESPONSE OF COMPRESSED',response.uri)
    //   })
    //   .catch(err => {
    //  Alert.alert('EERORR')
    //   });
    ImagePicker.launchImageLibrary(options, async Response => {

      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        const data = new FormData();
        data.append('name','avatar');
        data.append('profileimage',{
          uri: Response.uri,
          type: Response.type,
          name: Response.fileName
        });
      const config={
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      };
      fetch(url+'/userimage/'+iduser, config)
      .then((checkStatusAndGetJSONResponse)=>{
        //console.log(checkStatusAndGetJSONResponse);
      }).catch((error)=>{
       // console.log(error)
      });
      
        const ProfileImg = Response.uri;
          ImageResizer.createResizedImage(
          ProfileImg,
          500,
          500,
          'JPEG',
          50,
          0,
          null,
        )
          .then(async response => {

            var d = new Date();
            var n = d.getTime();
            //console.log('yime in string', n);
            //console.log('RESPONSE OF COMPRESSED ', response.uri);
            this.imageurl=response.uri;
            await this.setState(
              {
                ProfileimageReceived: true,
                profilePicture: response.uri,
                // Platform.OS === 'android'
                //   ? response.uri
                //   : response.uri.replace('file://', ''),
                imgName: n + '.jpg',
                imgType: Response.type,
              },
              // () => {
              // this.saveimage();
              // },
            );
          })
          .catch(err => {
            Alert.alert('ERROR');
          });
      }
    });
  };

  SelectEmaratesIDf = async () => {
    iduser=this.state.user_id;
    const options = {
      title: 'Select or Capture Your Profile Picture.',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
  
ImagePicker.launchImageLibrary(options, async Response => {

      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        const data = new FormData();
        data.append('name','avatar');
        data.append('emaratesIDFront',{
          uri: Response.uri,
          type: Response.type,
          name: Response.fileName
        });
      const config={
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      };
      fetch(url+'/getEmaratesIDFront/'+iduser, config)
      .then((checkStatusAndGetJSONResponse)=>{
        //console.log(checkStatusAndGetJSONResponse);
      }).catch((error)=>{
       // console.log(error)
      });
      
        const ProfileImg = Response.uri;
          ImageResizer.createResizedImage(
          ProfileImg,
          500,
          500,
          'JPEG',
          50,
          0,
          null,
        )
          .then(async response => {

            var d = new Date();
            var n = d.getTime();
            //console.log('yime in string', n);
            //console.log('RESPONSE OF COMPRESSED ', response.uri);
            this.imageurl=response.uri;
            await this.setState(
              {
                ProfileimageReceived: true,
                emaratesIDf: response.uri,
                // Platform.OS === 'android'
                //   ? response.uri
                //   : response.uri.replace('file://', ''),
                imgName: n + '.jpg',
                imgType: Response.type,
              },
              // () => {
              // this.saveimage();
              // },
            );
          })
          .catch(err => {
            //Alert.alert('ERROR');
          });
      }
    });
  };

SelectEmaratesIDb= async()=>{
iduser=this.state.user_id;
    const options = {
      title: 'Select or Capture Your Profile Picture.',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
  
ImagePicker.launchImageLibrary(options, async Response => {

      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        const data = new FormData();
        data.append('name','avatar');
        data.append('emaratesIDBack',{
          uri: Response.uri,
          type: Response.type,
          name: Response.fileName
        });
      const config={
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      };
      fetch(url+'/getEmaratesIDBack/'+iduser, config)
      .then((checkStatusAndGetJSONResponse)=>{
        //console.log(checkStatusAndGetJSONResponse);
      }).catch((error)=>{
       // console.log(error)
      });
      
        const ProfileImg = Response.uri;
          ImageResizer.createResizedImage(
          ProfileImg,
          500,
          500,
          'JPEG',
          50,
          0,
          null,
        )
          .then(async response => {

            var d = new Date();
            var n = d.getTime();
            //console.log('yime in string', n);
            //console.log('RESPONSE OF COMPRESSED ', response.uri);
            this.imageurl=response.uri;
            await this.setState(
              {
                ProfileimageReceived: true,
                emaratesIDb:responsive.uri,
                // Platform.OS === 'android'
                //   ? response.uri
                //   : response.uri.replace('file://', ''),
                imgName: n + '.jpg',
                imgType: Response.type,
              },
              // () => {
              // this.saveimage();
              // },
            );
          })
          .catch(err => {
            //Alert.alert('ERROR');
          });
      }
    });
}


saveimage = async() =>{
    const token = await AsyncStorage.getItem("token")
    iduser=this.state.user_id;
    await this.setState({
      uploading:false
    });
    //console.log("Image path is "+this.imageurl)
    fetch(url+'/signup/'+iduser,{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "profileimage":this.imageurl
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              //await AsyncStorage.setItem('token',data.token)
              this.props.navigation.navigate('Profile');
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
};

  Navigate = () => {
    this.props.navigation.navigate('ChangePassword',{id: user_id});
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
                phoneNo: data.phone,
                user_id:data._id,
                profilePicture:url+'/'+data.profileimage,
                imagepath:data.profileimage,
                joiningDate:data.joiningdate,
                Skills:data.skills,
                resignationDate:'dd/mm/yy',
                emaratesIDf:url+'/'+data.emaratesIDFront,
                emaratesIDb:url+'/'+data.emaratesIDBack,
              },
            
            );
    })
  };
  
  
  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.change) {
      await this.getuserData();
     this.setState({refresh: this.props.change});
 //     const UserID = await AsyncStorage.getItem('UserID');
      StatusBar.setBarStyle('dark-content');
    }
}
  componentDidMount = () => {
    this.getuserData();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getuserData();
    });
    StatusBar.setBarStyle('dark-content');
  };
  render() {
    const {ProfileImage, phoneNo, fullName, profilePicture, user_id, joiningDate, Skills, emaratesIDf, emaratesIDb} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          title="Profile"
          isHome={true}
          navigation={this.props.navigation}
        />
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({visible: false})}
          duration={3000}>
          Profile Picture Updated Successfuly
        </Snackbar>
        <Snackbar
          visible={this.state.ImageRemove}
          onDismiss={() => this.setState({ImageRemove: false})}
          duration={3000}>
          Profile Picture Removed Successfuly
        </Snackbar>
        <ScrollView>
          <View style={styles.profileImg}>
            <ImageBackground
              borderRadius={responsiveHeight(25)}
              source={
               // {uri:profilePicture}
                this.state.profilePicture !== url+'//'
                  ? {uri: profilePicture}
                  : require('../Image/BOBY.png')
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: responsiveHeight(25),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.state.uploading ? (
                <ActivityIndicator size={'large'} color={'#fff'} />
              ) : null}
            </ImageBackground>
          </View>
          {this.state.profilePicture !== url+'//' ? (
            <TouchableOpacity
              onPress={() => this.setState({Popup2: true})}
              style={{
                marginVertical: responsiveHeight(1),
                alignSelf: 'center',
                width: responsiveWidth(23),
                height: responsiveHeight(3),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 7,
              }}>
              <Text style={{color: 'white', fontSize: responsiveFontSize(1.2),
                textAlign:'center', fontWeight:'700',
                }}>
                {'Remove Image'}
              </Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => this.SelectProfileImage()}
            style={styles.pencilTouch}>
              {/* <Text style={{color: '#006600',
              fontSize: responsiveFontSize(1.2),
              fontWeight:'600' }}>

                Update Image
                
                </Text> */}

            <Entypo
              name={'camera'}
              color={'#006600'}
              size={responsiveFontSize(2.3)}
            />
          </TouchableOpacity>

          <View style={styles.inputView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ChangeName', {name: fullName, id: user_id});
              }}
              style={styles.inputsStyles}>
              <Text style={{color: '#7D9678', fontSize: 12}}>Name:</Text>
              <Text style={{color: '#7D9678'}}>{fullName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <View
              style={styles.inputsStyles}>
              <Text style={{color: '#7D9678', fontSize: 12}}>Phone Number:</Text>
              <Text style={{color: '#7D9678'}}>{phoneNo}</Text>
            </View>
          </View>

          <View style={styles.inputView}>
            <View
              style={styles.inputsStyles}>
              <Text style={{color: '#7D9678', fontSize: 12}}>Joining Date:</Text>
              <Text style={{color: '#7D9678'}}>{joiningDate}</Text>
            </View>
          </View>
          
          <View style={styles.inputView}>
            <TouchableOpacity
              onPress={() => {
              this.props.navigation.navigate('AddSkills', {skills: Skills, id: user_id});
              }}
              style={styles.inputsStyles}>
              <Text style={{color: '#7D9678', fontSize: 12}}>Skills:</Text>
              <Text style={{color: '#7D9678'}}>{Skills}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <View
              style={styles.inputsStyles}>
              <Text style={{color: '#7D9678', fontSize: 12}}>Resignation Date:</Text>
              <Text style={{color: '#7D9678'}}>{this.state.resignationDate}</Text>
            </View>
          </View>

          <View style={styles.selectimge}>
           <Text style={{color: '#7D9678', fontSize: 12, padding:1}}>Emarates ID (Front Side)</Text>
            {this.state.emaratesIDf !== url+'//' ? (
            <TouchableOpacity
              onPress={() => this.setState({Popup1: true})}
              style={{
                width: responsiveWidth(23),
                height: responsiveHeight(2),
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 7,
              }}>
              <Text style={{color: 'white', fontSize: responsiveFontSize(1.2),
                textAlign:'center', fontWeight:'700',
                }}>
                {'Remove Image'}
              </Text>
            </TouchableOpacity>
          ) : null}
            <Lightbox>
            <Image style={styles.selectimg}
           // style={{ height: '55%', width: '50%', alignSelf: 'center' }}
            source={{
              uri: this.state.emaratesIDf,
            }}
          />
            </Lightbox>
            { this.emaratesIDf !== url+'//' ?
            <TouchableOpacity
            onPress={() => this.SelectEmaratesIDf()}
            style={styles.pencilTouch}>
            <Entypo
              name={'plus'}
              color={'#000000'}
              size={responsiveFontSize(2.3)}
            />
             </TouchableOpacity>
            :null
            }
          </View>
          <View style={{padding:20}}>
          </View>

          <View style={styles.selectimge}>
           <Text style={{color: '#7D9678', fontSize: 12, padding:1}}>Emarates ID (Back Side)</Text>
            {this.state.emaratesIDb !== url+'//' ? (
            <TouchableOpacity
              onPress={() => this.setState({ConfirmationModal: true})}
              style={{
                width: responsiveWidth(23),
                height: responsiveHeight(2),
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 7,
              }}>
              <Text style={{color: 'white', fontSize: responsiveFontSize(1.2),
                textAlign:'center', fontWeight:'700',
                }}>
                {'Remove Image'}
              </Text>
            </TouchableOpacity>
          ) : null}
            <Lightbox>
            <Image style={styles.selectimg}
           // style={{ height: '55%', width: '50%', alignSelf: 'center' }}
            source={{
              uri: this.state.emaratesIDb,
            }}
          />
            </Lightbox>
            { this.emaratesIDb !== url+'//' ?
            <TouchableOpacity
            onPress={() => this.SelectEmaratesIDb()}
            style={styles.pencilTouch}>
            <Entypo
              name={'plus'}
              color={'#000000'}
              size={responsiveFontSize(2.3)}
            />
             </TouchableOpacity>
            :null
            }
            
          </View>
          
          <View
            style={{height: responsiveHeight(45), justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={[styles.buttonTouch, {marginBottom: responsiveHeight(20)}]}
              onPress={() => {
                this.getCurrentDate();
                //this.props.navigation.navigate('ChangePassword',{id: user_id});
                //this.Navigate();
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontSize: 14,
                  color: 'white',
                  textTransform: 'uppercase',
                }}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>

          <CustomModal isVisible={this.state.Popup2}>
            <View style={{flex: 1}}>
              <View style={{marginTop: responsiveHeight(15)}} />
              <View style={Styles.modalMainContainer}>
                <View style={Styles.modalImageContainer}>
                  <Image
                    source={require('../Image/cancel.png')}
                    style={Styles.modalImageStyle}
                  />
                </View>
                <View style={Styles.modalTextContainer}>
                  <Text style={Styles.modalTextStyle}>
                    {'Are you sure you want to remove your image?'}
                  </Text>
                </View>
                <View style={Styles.flex}>
                  <Button
                    title="Yes"
                    onPress={() => {
                      this.setState({Popup2: false}, () => {
                        this.DeleteImage();
                        this.RemoveImage();
                      });
                    }}
                    titleStyle={{textTransform: 'uppercase'}}
                    buttonStyle={[Styles.buttonStyle, {}]}
                    containerStyle={Styles.modalButtonContainer}
                  />
                  <Button
                    title="No"
                    onPress={() => {
                      this.setState({Popup2: false});
                    }}
                    titleStyle={{textTransform: 'uppercase'}}
                    buttonStyle={[Styles.buttonStyle, {}]}
                    containerStyle={Styles.modalButtonContainer}
                  />
                </View>
              </View>
            </View>
          </CustomModal>

          <CustomModal isVisible={this.state.ConfirmationModal}>
            <View style={{flex: 1}}>
              <View style={{marginTop: responsiveHeight(15)}} />
              <View style={Styles.modalMainContainer}>
                <View style={Styles.modalImageContainer}>
                  <Image
                    source={require('../Image/cancel.png')}
                    style={Styles.modalImageStyle}
                  />
                </View>
                <View style={Styles.modalTextContainer}>
                  <Text style={Styles.modalTextStyle}>
                    {'Are you sure you want to remove your image?'}
                  </Text>
                </View>
                <View style={Styles.flex}>
                  <Button
                    title="Yes"
                    onPress={() => {
                      this.setState({ConfirmationModal: false}, () => {
                        this.RemoveEmaratesIdBack();
                      });
                    }}
                    titleStyle={{textTransform: 'uppercase'}}
                    buttonStyle={[Styles.buttonStyle, {}]}
                    containerStyle={Styles.modalButtonContainer}
                  />
                  <Button
                    title="No"
                    onPress={() => {
                      this.setState({ConfirmationModal: false});
                    }}
                    titleStyle={{textTransform: 'uppercase'}}
                    buttonStyle={[Styles.buttonStyle, {}]}
                    containerStyle={Styles.modalButtonContainer}
                  />
                </View>
              </View>
            </View>
          </CustomModal>

          <CustomModal isVisible={this.state.Popup1}>
            <View style={{flex: 1}}>
              <View style={{marginTop: responsiveHeight(15)}} />
              <View style={Styles.modalMainContainer}>
                <View style={Styles.modalImageContainer}>
                  <Image
                    source={require('../Image/cancel.png')}
                    style={Styles.modalImageStyle}
                  />
                </View>
                <View style={Styles.modalTextContainer}>
                  <Text style={Styles.modalTextStyle}>
                    {'Are you sure you want to remove your image?'}
                  </Text>
                </View>
                <View style={Styles.flex}>
                  <Button
                    title="Yes"
                    onPress={() => {
                      this.setState({Popup1: false}, () => {
                        this.RemoveEmaratesIdFront();
                      });
                    }}
                    titleStyle={{textTransform: 'uppercase'}}
                    buttonStyle={[Styles.buttonStyle, {}]}
                    containerStyle={Styles.modalButtonContainer}
                  />
                  <Button
                    title="No"
                    onPress={() => {
                      this.setState({Popup1: false});
                    }}
                    titleStyle={{textTransform: 'uppercase'}}
                    buttonStyle={[Styles.buttonStyle, {}]}
                    containerStyle={Styles.modalButtonContainer}
                  />
                </View>
              </View>
            </View>
          </CustomModal>

        </ScrollView>
      </SafeAreaView>
    );
  }
}
const Styles = StyleSheet.create({
  modalMainContainer: {
    height: responsiveHeight(60),
    width: responsiveWidth(85),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(2),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: responsiveWidth(4),
  },
  modalImageContainer: {
    height: responsiveHeight(20),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageStyle: {
    height: '75%',
    width: '75%',
    resizeMode: 'contain',
  },
  modalTextContainer: {
    height: responsiveHeight(10),
    width: '90%',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  modalTextStyle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#006600',
    textAlign: 'center',
  },
  modalDecTextStyle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: '#006600',
    borderRadius: 8,
  },
  modalButtonContainer: {
    height: responsiveHeight(7),
    width: '48%',
    borderRadius: responsiveWidth(8),
    padding: 0,
  },
  flex: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Profile;