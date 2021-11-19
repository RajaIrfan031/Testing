import React, { Component } from 'react';

import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
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
import { ActivityIndicator } from 'react-native';

class WalletScreen extends Component{

    constructor() {
      super();
  
    this.state = {
      data: [],
      data1: [],
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
              profileimage: data[0]['profileimage'] !== undefined ? data[0]['profileimage'] : 'https://cloudnine.com/wp-content/uploads/2016/03/upload-1.png',
              agentId: data[0]['agentId'],
            })
          } catch (e) {
            console.log("....Error.... ",e)
          }
      })

      await fetch(url+'/getAccountData/'+this.state.agentId)
      .then(res=>res.json())
      .then(async (data)=>{
        console.log(this.state.agentId);
          try {
            this.setState({
            currentBalance: data[0]['currentBalance'],
            isLoading: false,
            })
          } catch (e) {
            console.log("....Error.... ",e)
          }
      })

      await fetch(url+'/getAccountHistories/'+this.state.agentId)
      .then(res=>res.json())
      .then(async (data)=>{ 
          try {
            this.setState({
              data1: data,
              isLoading: false,
            })
          } catch (e) {
            console.log("....Error.... ",e)
          }
      })
      this.setState({
          isLoading: false,
      })

      this.setState({
          isLoading: false,
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
            title='Wallet'
            isHome={false}
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
                                <Text style={styles.caption}>Balance: {this.state.currentBalance} A.E.D</Text>
                            </View>
                        </View> 
                </View>
                <View>

                </View>
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
                        <ScrollView>
                <View style={styles.bankHeading}>
                    <Text style={styles.bankHeadingText}>Transaction History</Text>
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
                        this.state.data1.map((data, index)=> 
                        <View style={styles.mainView} key={index}>
                            <View style={styles.bankSection}>  
                                <View style={styles.bankAccount}>
                                    <TouchableOpacity style={styles.bankLeft}>
                                        <View style={styles.bankAccountText}>
                                            <View>
                                                <Text style={[styles.bankAccountTitle, {fontWeight: 'normal'}]}>{data.transactionDate}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.bankAccountTitle}>Bank Transfer</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.bankAccountNumber}>Transfer Type: {data.transactionType}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.bankAccountNumber}>Amount: {data.transactionAmount}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity> 
                                    <View style={styles.bankRight}>
                                        {/* <Text style={styles.bankAccountTitle}>Amount: {data.transactionAmount}</Text>
                                        <TouchableOpacity style={styles.addBank} onPress={() => {}}>
                                            <Text style={styles.addButton}>View</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                    </View>
                </View>
                        )} 
            </ScrollView>
                        
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
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addBank: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: '35%', 
        backgroundColor: '#006600',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 10,
        width: 150,
        marginBottom: 20
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
    mainView: {
        marginHorizontal: '2.5%',
        backgroundColor: '#fff',
        marginTop: 5,
    },
    bankSection: {
    },
    bankHeadingText: {
        marginLeft: 16,
        fontSize: 24,
        fontWeight: '600'
    },
    bankAccount: {
        // flexDirection: 'row',
        backgroundColor: '#fff', 
        paddingBottom: 5
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
        marginTop: 4,
        fontSize: 16
    },
    bankLeft: {
        width: '70%',
        flexDirection: 'row'
    },
    bankRight: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addBank: {   
        backgroundColor: '#006600',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 10,
        width: 80,
        marginTop: 10,
        borderRadius: 20
    },
    addButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default WalletScreen;