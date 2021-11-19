import React, { Component } from 'react';

import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../constants/constant';
import Header from '../../components/Header/Header';

class ProfileScreen extends Component{

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
      isEmpCardFrontImage: false,
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
      profileimage: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      };
  }
   
    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })
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
              profileimage: data[0]['profileimage'] !== undefined ? data[0]['profileimage'] : 'https://cloudnine.com/wp-content/uploads/2016/03/upload-1.png',
              isLoading: false,
            })
          } catch (e) {
            console.log("....Error.... ",e)
          }
      })
      this.setState({
          isLoading: false,
      })
    }

  openWhatsApp = () => {
    let url = "whatsapp://send?text=" +
    "Send us your message for what you need help" +
    "&phone=97" + 142980535;
  Linking.openURL(url)
    .then(data => {
      console.log("WhatsApp Opened successfully " + data);  //<---Success
    })
    .catch(() => {
      alert("Make sure WhatsApp installed on your device");  //<---Error
    });

  }


render() {
    return (
        <SafeAreaView style={styles.container}>
            <Header
            title=''
            isHome={true}
            navigation={this.props.navigation}
            />
            <ScrollView>
                <View style = {styles.userInfoSection}>
                    <View style = {{flexDirection: 'row',marginHorizontal: 10,}}>
                            <View style = {{marginTop: 10}}>
                                <Avatar.Image 
                                source = {{
                                    uri: this.state.data['profileimage']
                                }}
                                size = {80}
                                />
                            </View>
                            <View style={{marginLeft: 20}}>
                                <Title style={[styles.title, {
                                    marginTop: 10,
                                    marginBottom: 5
                                }]}>{this.state.data['username']}</Title>
                                <Caption style={styles.caption}>{this.state.data['phone']}</Caption>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() =>{this.props.navigation.navigate('EditProfileScreen')}} style={{justifyContent: 'center'}}>
                            <Icon
                                name="account-edit"
                                size={20}
                                color="#006600"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#006600',
                                    height: 40,
                                    borderRadius: 10,
                                    padding: 10
                                }}
                            /> 
                        </TouchableOpacity>
                </View>
            <View styles = {styles.menuWrapper}> 
            <TouchableRipple onPress={() =>{this.props.navigation.navigate('UploadDocumentsScreen')}}>
                <View style = {styles.menuItem}>
                    <View style = {{flexDirection: 'row',marginLeft: 10}}>
                    <MaterialCommunityIcons name="file-document" color='#006600' size={26} />
                                <View style={{marginLeft: 15,marginTop: 3}}>
                                    <Text style={styles.itemText}>My Documents</Text> 
                                </View> 
                        </View>
                    </View> 
            </TouchableRipple>
            <TouchableRipple onPress={() =>{this.props.navigation.navigate('BankAccountScreen', { agentId: this.state.data['agentId']})}}>
                <View style = {styles.menuItem}>
                    <View style = {{flexDirection: 'row',marginLeft: 10}}>
                    <MaterialCommunityIcons name="bank" color='#006600' size={26} />
                                <View style={{marginLeft: 15,marginTop: 3}}>
                                    <Text style={styles.itemText}>Bank Account Information</Text>
                                </View> 
                        </View>
                    </View> 
            </TouchableRipple>
            <TouchableRipple onPress={() =>{this.props.navigation.navigate('WalletScreen')}}>
                <View style = {styles.menuItem}>
                    <View style = {{flexDirection: 'row',marginLeft: 10}}>
                    <MaterialCommunityIcons name="wallet" color='#006600' size={26} />
                                <View style={{marginLeft: 15,marginTop: 3}}>
                                    <Text style={styles.itemText}>My Wallet</Text> 
                                </View> 
                        </View>
                    </View> 
            </TouchableRipple>            
            <TouchableRipple onPress={() =>{ this.openWhatsApp()}}>
                <View style = {styles.menuItem}>
                    <View style = {{flexDirection: 'row',marginLeft: 10}}>
                    <MaterialCommunityIcons name="handshake" color='#006600' size={26} />
                        <View style={{marginLeft: 15,marginTop: 3}}>
                            <Text style={styles.itemText}>Get Support</Text> 
                        </View> 
                    </View>
                    </View> 
            </TouchableRipple>
            </View>
            </ScrollView>
        </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F3F3F6'
    },
    userInfoSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        backgroundColor: '#FFFFFF',
        paddingBottom: 10,
        paddingRight: 20
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500'
    },
    tinyImage: {
        width: 80,
        height: 50,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 100
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuWrapper: {
        marginTop: 30,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    },
    itemText: {
        fontSize: 16
    },
    
});

export default ProfileScreen;