import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, ActivityIndicator } from 'react-native';
import RemainingTasksComponent from '../../components/TasksComponent/RemainingTasksComponent';
import {url} from '../../constants/constant';
import styles from '../../styles/styles';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AllTasksScreen extends Component{

    constructor() {
      super();
  
    this.state = {
      data: [],
      isLoading: false,
      assignedTasks: [''],
      aId: '',
      jobSet: false,
      jobDetails: ['']
      };
  }
   
    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })
      var agentId = '';
      try{
        agentId = await AsyncStorage.getItem('agentId');
        this.setState({
          aId: agentId,
        });
        }catch (e){
            console.log("....Error.... ",e)
        }
      await fetch(url+'/tasks/'+agentId)
      .then(res=>res.json())
      .then(async (data)=>{
          try {
            this.setState({
              assignedTasks: data,
              jobSet: true,
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
        <SafeAreaView style={styles1.homeMenuStyle}>
          <Header
            title='All Jobs'
            isHome={false}
            navigation={this.props.navigation}
          /> 
          { !this.state.isLoading && this.state.jobSet ?
              <RemainingTasksComponent remainingTasks={this.state.assignedTasks }/>
                    :
              <ActivityIndicator size={'large'} color={'#006600'} /> 
          }
        </SafeAreaView>
    )
}
}
const styles1 = StyleSheet.create({

    homeMenuStyle: {
        flex: 1,
    }, 
    column: {
        flex: 1,
        flexDirection: 'column'
    },
});

export default AllTasksScreen;
