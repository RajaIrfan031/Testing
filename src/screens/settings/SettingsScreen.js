import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, Pressable, Alert } from 'react-native';
import SettingsComponent from '../../components/SettingsComponent/SettingsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header/Header'; 

class Settings extends Component{

    constructor(props) {
        
        super(props);
          
        this.state = { 
            isModalVisible: false,
        } 
    }
    handleCallBack = (index) => {
        if(index==0){
            Alert.alert(
                "Logout",
                "Are you sure you want to Sign Out?",
                [
                {
                    text: "No",
                    onPress: () => console.log("Okay Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        this.signOut()
                    },
                    style: "cancel"
                    },
                ]
            )
        }
    }
    toggleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
      };

      signOut = async () => {

        const token = await AsyncStorage.removeItem('token');
        const uId = await AsyncStorage.removeItem('_id');
        this.props.navigation.navigate('AuthStack');
    }

render() {  
    const settingsOptions = [
        // {icon: 'information-variant', title: 'About Us'},
        // {icon: 'account', title: 'Edit Your Profile'},
        // {icon: 'book-account', title: 'Terms and Conditions'},
        // {icon: 'book-multiple', title: 'Privacy Policy'},
        // {icon: 'handshake', title: 'Get Support'},
        {icon: 'logout', title: 'Logout'},
    ];

    return (
        <ScrollView style={[styles1.homeMenuStyle,styles1.column]}>
            <Header
            title='Settings'
            isHome={true}
            navigation={this.props.navigation}
            />
            <SettingsComponent settingsOptions={settingsOptions}  parentCallBack={this.handleCallBack}/>
            <Modal 
                transparent={true}
                visible={this.state.isModalVisible}
                onRequestClose={() => {
                    toggleModal(!this.state.isModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}> 
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => this.toggleModal(!this.state.isModalVisible)}
                        >
                        <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
}
const styles1 = StyleSheet.create({

    homeMenuStyle: {
        flex: 1,
        backgroundColor: '#F3F3F6'
    }, 
    column: {
        flex: 1,
        flexDirection: 'column'
    }, 
    centeredView: {
        flex: 1, 
        marginTop: 32,
        justifyContent: 'center'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10, 
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
      },
      button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: 60,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        height: 40,

      },
      
});

export default Settings;