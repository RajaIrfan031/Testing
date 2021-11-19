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
    Alert
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../constants/constant';
import Header from '../../components/Header/Header';

class EditBankAccountScreen extends Component{

  constructor(props) {
    
    super(props);
    var agentId = props.route.params.agentId;
    var bankName = props.route.params.bankName;
    var ibanNumber = props.route.params.ibanNumber;
    var beneficiary = props.route.params.beneficiary;
    var branchAddress = props.route.params.branchAddress;
  this.state = {
    data: [],
    isLoading: false,
    imageSource: '',
    bankname: bankName,
    accountholdername: beneficiary,
    ibannumber: ibanNumber,
    bankaddress: branchAddress,
    profileimage: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
    agentId: agentId,
    isUploading: false,
    uId: ''
    };
}

 

  componentDidMount = async () => {
   
    var id = '';
    try{
      id = await AsyncStorage.getItem('_id');
      console.log(id);
      this.setState({
        uId: id,
      });
      }catch (e){
          console.log("....Error.... ",e)
    }

  }
 
  onChangeBankName = val => {
    this.setState({bankname: val});
  };
  onChangeAccountHolder= val => {
    this.setState({accountholdername: val});
  };
  onChangeIBAN = val => {
    this.setState({ibannumber: val});
  };
  onChangeBankAddress = val => {
    this.setState({bankaddress: val});
  };
  
  handleAddAccount =() => {

    if(this.state.bankname.length<=0){
      Alert.alert(
        "Inavalid Bank",
        "Please enter a valid Bank Name",
        [
            {
                text: "Okay",
                onPress: () => {},
                style: "cancel"
            },
            ]
    )
    }
    else if(this.state.accountholdername.length<=0){
      Alert.alert(
        "Inavalid Name",
        "Please enter a valid account holder name",
        [
            {
                text: "Okay",
                onPress: () => {},
                style: "cancel"
            },
            ]
    )
    }
    else if(this.state.ibannumber.length<=0){
      Alert.alert(
        "Inavalid Name",
        "Please enter a valid IBAN Number",
        [
            {
                text: "Okay",
                onPress: () => {},
                style: "cancel"
            },
            ]
    )
    }
    else if(this.state.bankaddress.length<=0){
      Alert.alert(
        "Inavalid Branch Address",
        "Please enter a valid Branch Address",
        [
            {
                text: "Okay",
                onPress: () => {},
                style: "cancel"
            },
            ]
    )
    }
    else {
      this.addBankAccount();
    }
  }


  addBankAccount = async () => {

    this.setState({
      isUploading: true
    })
    console.log("beneficiary_Name", this.state.accountholdername,
    "beneficiary_IBAN", this.state.ibannumber,
    "beneficiary_Bank_Name", this.state.bankname,
    "beneficiary_Bank_Address", this.state.bankaddress,);
    await fetch(url+'/updateBeneficiary/'+this.state.uId,{
      method:"POST",
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
     },
     body:JSON.stringify({
       "beneficiary_Name": this.state.accountholdername,
       "beneficiary_IBAN": this.state.ibannumber,
       "beneficiary_Bank_Name": this.state.bankname,
       "beneficiary_Bank_Address": this.state.bankaddress,
     })
    }).then((response) => {
      response.text().then((res) => {
        console.log(res);
        Alert.alert(
          "Beneficiary Updated",
          "Beneficiary details successfully added!",
          [
              {
                  text: "Okay",
                  onPress: () => {
                    this.props.navigation.navigate('ProfileScreen')
                  },
                  style: "cancel"
              },
              ]
      )
      });
    })
      this.setState({
        isUploading: false,
      })
  }

  render(){
    const { modalVisible } = this.state;
    return (
    <SafeAreaView style={styles.container}>
        <Header
        title='Edit Bank Account'
        isHome={false}
        navigation={this.props.navigation}
        />
        <ScrollView style={styles.editSection}> 
                <View style={styles.action}>
                    <View style={styles.titleSection}>
                        <Text style={styles.titleHeading}>Bank</Text>
                    </View>
                    <View style={styles.inputSection}>  
                        <TextInput
                            placeholder='Enter Bank Name'
                            placeholderTextColor='grey'
                            autoCorrect={false}
                            style={[
                            styles.textInput,{color: '#000000',},
                            ]}
                            value={this.state.bankname}
                            onChangeText={val => this.onChangeBankName(val)}
                        />
                    </View>
                </View>
                <View style={styles.action}>
                    <View style={styles.titleSection}>
                        <Text style={styles.titleHeading}>Account Holder Name</Text>
                    </View>
                    <View style={styles.inputSection}>  
                        <TextInput
                            placeholder='Account Holder Name'
                            placeholderTextColor='grey'
                            autoCorrect={false}
                            style={[
                            styles.textInput,{color: '#000000',},
                            ]}
                            value={this.state.accountholdername}
                            onChangeText={val => this.onChangeAccountHolder(val)}
                        />
                    </View>
                </View>
                <View style={styles.action}>
                    <View style={styles.titleSection}>
                        <Text style={styles.titleHeading}>Account Number</Text>
                    </View>
                    <View style={styles.inputSection}>  
                        <TextInput
                            placeholder='IBAN Number'
                            placeholderTextColor='grey'
                            autoCorrect={false}
                            style={[
                            styles.textInput,{color: '#000000',},
                            ]}
                            value={this.state.ibannumber}
                            onChangeText={val => this.onChangeIBAN(val)}
                        />
                    </View>
                </View>
                <View style={styles.action}>
                    <View style={styles.titleSection}>
                        <Text style={styles.titleHeading}>Bank Address</Text>
                    </View>
                    <View style={styles.inputSection}>  
                        <TextInput
                            placeholder='Enter Bank Address'
                            placeholderTextColor='grey'
                            autoCorrect={false}
                            style={[
                            styles.textInput,{color: '#000000',},
                            ]}
                            value={this.state.bankaddress}
                            onChangeText={val => this.onChangeBankAddress(val)}
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
            <TouchableOpacity style={styles.commandButton} onPress={ ()=> {this.handleAddAccount()}}>
                    { this.state.isUploading ? 
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
        paddingBottom: 100,
        borderColor: 'grey',
        marginHorizontal: '2%',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 5
    },
    titleHeading: {
        fontSize: 16,
        fontWeight: '600'
    },
    titleSection: { 
        marginHorizontal: '3.5%',
        width: '90%', 
        marginBottom: 10,        
    },
    inputSection: {
        marginHorizontal: '3%',
        width: '90%',  
        height: 50, 
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#AAAAAA',
        justifyContent: 'center', 
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
        marginTop: 15
    },
    actionError: {
      flexDirection: 'row',
      paddingBottom: 5,
    },
    textInput: {
      color: '#000',
      fontSize: 16, 
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

export default EditBankAccountScreen;