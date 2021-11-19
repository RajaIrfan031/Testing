import React, { Component } from 'react';

import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../constants/constant';
import Header from '../../components/Header/Header';
import { ActivityIndicator } from 'react-native';

class BankAccountScreen extends Component{

    constructor() {
      super();
  
    this.state = {
      data: [],
      isLoading: false,
      imageSource: '', 
      phone: '',
      username: '',
      agentlanguage: [],
      skills: [],
      address: '',
      profession: '',
      joiningDate: '',
      skill: '',
      agentId: '',
      uId: '',
      profileimage: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      benificaryData: [''],
      isAmountLoading: true,
      currentBalance: '',
      currentTask: [''],
      isModalVisible: false
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
      await fetch(url+'/user/'+id)
      .then(res=>res.json())
      .then(async (data)=>{
          try {
            this.setState({
              data: data[0],
              //profileimage: data[0]['profileimage'] !== undefined ? data[0]['profileimage'] : 'https://cloudnine.com/wp-content/uploads/2016/03/upload-1.png',
              agentId: data[0]['agentId'],
            })
          } catch (e) {
            console.log("....Error.... ",e)
          }
      })

      this.getBenificaries();

      this.setState({
          isLoading: false,
      })
    }

    getBenificaries = async() => {

        await fetch(url+'/getBeneficiary/'+this.state.agentId)
            .then(res=>res.json())
            .then(async (data)=>{
                try {
                this.setState({
                    benificaryData: data,
                    isLoading: false,
                })
                } catch (e) {
                console.log("....Error.... ",e)
                }
            })
    }

    handleRemoveBank = async(_id) => {

        Alert.alert(
            "Remove Beneficary",
            "Are you sure you want to remove this bank account?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Okay Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        this.removeBank(_id)
                    },
                    style: "cancel"
                    },
                ]
        )
        
    }

    removeBank = async(_id) => {
        console.log(_id)
        await fetch(url+'/delete_beneficiary/'+_id)
        .then(res=>res.text())
        .then(async (data)=>{
            try {
                console.log(data);
                Alert.alert(
                    "Beneficary Removed",
                    "Beneficiary was successfully removed!",
                    [
                        {
                            text: "Okay",
                            onPress: () => {
                                this.setState({
                                    isLoading: true
                                })
                                this.getBenificaries();
                            },
                            style: "cancel"
                        },
                    ]
                )
            } catch (e) {
              console.log("....Error.... ",e)
            }
        })
    }

    toggleModal = (task) => {
        this.setState({
            currentTask: task,
            isModalVisible: !this.state.isModalVisible
        })
      };
  
render() {
    return (
        <SafeAreaView style={styles.container}>
            <Header
            title='Account Information'
            isHome={false}
            navigation={this.props.navigation}
            />
            <ScrollView>
                <View style={styles.bankSection}> 
                
                <Modal 
                                transparent={true}
                                visible={this.state.isModalVisible}
                                onRequestClose={() => {
                                    toggleModal(!this.state.isModalVisible);
                                }}
                            >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.modalHeading}>
                                        <Text style={styles.modalTextHeading}>Bank Account</Text>
                                    </View>
                                    <View style={styles.taskDetailsArea}>
                                        <View style={styles.detailGroup}>
                                                <Text style={styles.detailTitle}>. Bank Name: </Text>
                                                <Text style={styles.detailText}>{this.state.currentTask.bankName}</Text>
                                            </View>
                                            <View style={styles.detailGroup}>
                                                <Text style={styles.detailTitle}>. IBAN Number: </Text>
                                                <Text style={styles.detailText}>{this.state.currentTask.ibannumber}</Text>
                                            </View>
                                            <View style={styles.detailGroup}>
                                                <Text style={styles.detailTitle}>. Branch Address: </Text>
                                                <Text style={[styles.subTitle, {fontSize: 16,width: 220, fontWeight: '500'}]}>{this.state.currentTask.branchAddress}</Text>
                                            </View>
                                            <View style={styles.detailGroup}>
                                                <Text style={styles.detailTitle}>. Account Holder Name: </Text>
                                                <Text style={styles.detailText}>{this.state.currentTask.beneficiary}</Text>
                                        </View>
                                    </View>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => this.toggleModal(!this.state.isModalVisible)}
                                    >
                                    <Text style={styles.textStyle}>OK</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <View style={styles.bankHeading}>
                            <Text style={styles.bankHeadingText}>Payment Methods</Text>
                        </View>
                        {
                            this.state.isLoading ? 
                            <View style={{height: 60, backgroundColor: '#fff', justifyContent: 'center'}}>
                                <ActivityIndicator color='#006600' size={24} />
                            </View>
                            : null
                        }
                        { 
                        this.state.isLoading
                        ? null
                        :
                        this.state.benificaryData.map((data, index,)=>
                            <View style={styles.bankAccount} key={index}>
                           
                                <TouchableOpacity style={styles.bankLeft} 
                                onPress={() => {
                                    this.toggleModal({bankName: data.beneficiary_Bank_Name, ibannumber: data.beneficiary_IBAN, beneficiary: data.beneficiary_Name, branchAddress: data.beneficiary_Bank_Address })
                                }}>
                                    <View style={styles.bankAccountIcon}>
                                        <MaterialCommunityIcons name="bank" color='#006600' size={60} />
                                    </View>
                                    <View style={styles.bankAccountText}>
                                        <View>
                                            <Text style={styles.bankAccountTitle}>{data.beneficiary_Bank_Name}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.bankAccountNumber}>{data.beneficiary_IBAN}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bankRight} onPress={
                                    () => this.props.navigation.navigate('EditBankAccountScreen',
                                    {
                                        agentId: this.state.agentId,
                                        bankName: data.beneficiary_Bank_Name,
                                        ibanNumber: data.beneficiary_IBAN,
                                        beneficiary: data.beneficiary_Name,
                                        branchAddress: data.beneficiary_Bank_Address
                                    }
                                    )}>
                                    <MaterialCommunityIcons name="circle-edit-outline" color='#006600' size={24} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bankRight} onPress={() => {this.handleRemoveBank(data._id)}}>
                                    <MaterialCommunityIcons name="trash-can" color='#006600' size={24} />
                                </TouchableOpacity>
                            </View>
                         )}
                            <View>
                                <TouchableOpacity style={styles.addBank} onPress={() => {this.props.navigation.navigate('CreateNewBankAccount',  { agentId: this.state.agentId})}}>
                                    <MaterialCommunityIcons name="plus-circle" color='#006600' size={56} />
                                    {/* <Text style={styles.addButton}> Add Account</Text> */}
                                </TouchableOpacity>
                            </View>
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
        fontSize: 24,
        fontWeight: '500', 
    }, 
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },  
    menuWrapper: {
        marginTop: 30,
    },
    bankSection: {
        marginTop: 20
    },
    bankHeadingText: {
        marginLeft: 16,
        fontSize: 24,
        fontWeight: '600'
    },
    bankAccount: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 80,
        marginTop: 20
    },
    bankAccountIcon: {
        justifyContent: 'center',
        marginLeft: 20, 
    },
    bankAccountText: {
        marginTop: 10,
        marginLeft: 10
    },
    bankAccountTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    bankAccountNumber: {
        marginTop: 4
    },
    bankLeft: {
        flexDirection: 'row',
        width: '80%'
    },
    bankRight: {
        width: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addBank: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: '35%', 
        //backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingHorizontal: 10,
        width: 150,
        //marginBottom: 20
    },
    addButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
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
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        textAlign: "center",
        color: '#fff'
      },
      modalHeading: {
        width: '100%',
        backgroundColor: '#006600',
        height: 60,
        alignItems: 'flex-start',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 10,
        paddingTop: 10
      },
      modalTextHeading: {
        textAlign: "center",
        color: '#fff',
        fontSize: 24
      },
      taskDetailsArea: {
          paddingTop: 15,
          paddingHorizontal: 5,
          width: '90%'
      },
      detailGroup: {
          flexDirection: 'row',
          marginTop: 10,
          width: '100%'
      },
      detailTitle: {
          fontSize: 16,
          fontWeight: 'bold'
      },
      detailText: {
        fontSize: 16,
    },
});

export default BankAccountScreen;