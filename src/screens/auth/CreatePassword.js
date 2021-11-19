import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Modal,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import {Text} from 'native-base';
import styles from '../../styles/styles';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {url} from '../../constants/constant';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'

class CreatePassword extends Component {
  state = {
    showPass: false,
    Password: '',
    error: false,
    errorText: '',
    Name: '',
    NameErrorText: '',
    NameError: false,
    imageError: false,
    isLoading: false,
    profileimage: 'https://cloudnine.com/wp-content/uploads/2016/03/upload-1.png',
    isImage: false,
    modalVisible: false,
    imageSource: '',
  };
  VerifyPassword = val => {
    let passwordRegix = /^(?=.*\d).{8,100}$/;
    if (passwordRegix.test(val)) {
      this.setState({error: false, errorText: '', Password: val});
    } else if (val === '') {
      this.setState({error: false, errorText: '', Password: val});
    } else {
      this.setState({
        error: true,
        errorText:
          'Password must be atleast 8 digits long and include atleast one numeric digit',
        Password: val,
      });
    }
  };

  handleUplaodFromGallery = () => {
    launchImageLibrary({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
      if(response.didCancel){
        return;
      }
      else {
        this.setState({
          imageSource: response.uri,
          isImage: true,
        })
        this.setModalVisible(false)
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
        this.setModalVisible(false)
    }
    });
  }
  Navigate = () => {
    this.setState({
      isLoading: true,
    })
    const {Password, error, Name, NameError, NameErrorText, profileimage, imageError, imageSource} = this.state;
    const {PhoneNo} = this.props.route.params;

    if (imageSource === '') {
      Alert.alert(
        "Select Image",
        "Please select Profile Image First",
        [
          { text: "OK", onPress: () => { console.log(' ok pressed !') } },
        ]
      );    
  
    }
    else if (Name === '') {
      this.setState({NameErrorText: 'Name cannot be Empty.', NameError: true});
    }
    else if (Password === '') {
      this.setState({error: true, errorText: 'Please Enter Valid Password.'});
    }
    else if (!error && !NameError && !imageError) {
      this.uploadProfilePhoto();
        fetch(url+'/signup',{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "username":Name,
        "password":Password,
        "phone": PhoneNo,

      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              this.uploadProfilePhoto();
            } catch (e) {
              console.log("....Error.... ",e)
            }
     })
        .catch(error => {
          console.log("Phone number is already registered.");
          this.setState({NameErrorText: 'You are already registered', NameError: true});
        });
    }
    this.setState({
      isLoading: false
    })
  };
  setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }
    
  uploadProfilePhoto() {
    const {PhoneNo} = this.props.route.params;
    let uploadData = new FormData();

    uploadData.append( 'profileimage',  {
        uri: this.state.imageSource,
        type: 'image/jpg',
        name: 'image.jpg',
      })
    
        fetch(url+'/uploadProfilePhoto/'+"+92123456789",{
        headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        },
        method: 'POST',
        body: uploadData,
    }).then((response) => {
        response.text().then(async (data) => {
          // await AsyncStorage.setItem('first',data.token)
          this.props.navigation.navigate("Login")
          console.log(data)
        });
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
          })
        console.log(error, "Image is not uploaded");
        });
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={styles.createpass}>Complete Profile</Text>
        <Text style={styles.enterpass}>
          Please provide below fields to complete
        </Text>
        <Text style={styles.youraccount}>your profile</Text>
        <View
         style = {styles.selectProfile}
         onPress={()=>{this.setModalVisible(true)}}
         >
        {!this.state.isImage ? 
        <ImageBackground
            source={{
            uri: this.state.profileimage,
            }}
          style={[
            styles.selectProfile
          ],
            {
            marginTop: 10,
            height: 100,
            width: 100,   
            resizeMode: 'contain'
          }}
          imageStyle={{borderRadius: 15}}>
            <View
            style={{
                position: 'absolute',
                bottom: 0,
            }}>
            <TouchableOpacity style={styles.uploadBar} onPress={() => this.setModalVisible(true)}>
              <Text style={{color: '#ffffff',fontWeight: 'bold',opacity: 1}}>Upload</Text>
            </TouchableOpacity>
            </View>
        </ImageBackground> 
        : 
        <ImageBackground
            source={{
            uri: this.state.imageSource,
            }}
          style={[
            styles.selectProfile
          ],
            {
            marginTop: 10,
            height: 100,
            width: 100,   
            resizeMode: 'contain'
          }}
          imageStyle={{borderRadius: 15}}>
            <View
            style={{
                position: 'absolute',
                bottom: 0,
            }}>
            <TouchableOpacity style={styles.uploadBar} onPress={() => this.setModalVisible(true)}>
              <Text style={{color: '#ffffff',fontWeight: 'bold',opacity: 1}}>Upload</Text>
            </TouchableOpacity>
            </View>
        </ImageBackground> 
        }
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
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputsStyles}
            placeholder={'Name'}
            placeholderTextColor={'#7D9678'}
            value={this.state.Name}
            onChangeText={val => {
              this.setState({Name: val, NameError: false, NameErrorText: ''});
            }}
          />
        </View>
        {this.state.NameError ? (
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{this.state.NameErrorText}</Text>
          </View>
        ) : null}

        <View style={[styles.inputView]}>
          <View
            style={[
              styles.inputsStyles,
              {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <TextInput
              style={{width: '80%', height: '100%', padding: 0, margin: 0}}
              placeholder="Password"
              secureTextEntry={!this.state.showPass}
              value={this.state.Password}
              onChangeText={val => {
                this.VerifyPassword(val);
              }}
            />
            <TouchableOpacity
              onPress={() => this.setState({showPass: !this.state.showPass})}
              style={{right: responsiveWidth(2)}}>
              <Entypo
                name={'eye'}
                size={responsiveFontSize(2.8)}
                color={this.state.showPass ? '#000' : 'grey'}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.error ? (
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{this.state.errorText}</Text>
          </View>
        ) : null}

        <View style={{flexDirection: 'row', width: '80%', alignSelf: 'center'}}>
          <Text style={styles.terms}>By signing up, you agree to the</Text>
          <Text
            onPress={() =>
              this.props.navigation.navigate('TermsConditions', {
                screenName: this.props.route.name,
              })
            }
            style={{
              color: '#5DC7D1',
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'center',
              marginTop: 10,
              marginLeft: 3,
            }}>
            Terms and Conditions.
          </Text>
        </View>
        <View style={{height: '30%', justifyContent: 'flex-end'}}>
          {this.state.isLoading ? (
            <View style={styles.buttonTouch}>
              <ActivityIndicator size={'large'} color={'#fff'} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.buttonTouch}
              onPress={() =>
                this.setState({isLoading: true}, () => {
                  this.Navigate();
                })
              }>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontSize: 16,
                  color: 'white',
                  textTransform: 'uppercase',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default CreatePassword;