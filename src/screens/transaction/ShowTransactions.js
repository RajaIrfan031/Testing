import React, { Component } from 'react';

import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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

class ShowTransactions extends Component{

    constructor(props) {
        
    super(props);
    
    var agentId = props.route.params.agentId;
    this.state = {
      data: [],
      isLoading: false,
      agentId: agentId
      };
  }
   
    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })
      
      await fetch(url+'/getAccountHistories/'+this.state.agentId)
      .then(res=>res.json())
      .then(async (data)=>{
          try { 
            this.setState({
              data: data,
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
  
render() {
    return (
        <SafeAreaView style={styles.container}>
            <Header
            title='Transaction History'
            isHome={false}
            navigation={this.props.navigation}
            />
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
                        this.state.data.map((data, index)=> 
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
        </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

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

export default ShowTransactions;