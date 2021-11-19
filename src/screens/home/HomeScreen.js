import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, SafeAreaView,TouchableOpacity } from 'react-native';
import HomeProfileComponent from '../../components/HomeComponent/HomeProfileComponent';
import SubJobsComponent from '../../components/HomeComponent/SubJobsComponent';
import TotalJobsComponent from '../../components/HomeComponent/TotalJobsComponent';
import {url} from '../../constants/constant';
import styles from '../../styles/styles';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component{
    
    constructor() {
        super();
    
      this.state = {
        data: [''],
        isLoading: true,
        assignedTasks: [''],
        uId: '',
        jobSet: false,
        jobDetails: [''],
        totalJobs: '',
        completedJobs: '',
        remainingJobs: '',
        activeTasks: '',
        status: false,
        assignedJobs: '',
        countStartedJobs: '',
        startedJobs: [''],
        };
    } 

    componentDidMount = async () => {
            var id = '';
            try{
            id = await AsyncStorage.getItem('_id');
            }catch (e){
                console.log("....Error.... ",e)
            }
            await fetch(url+'/user/'+id)
            .then(res=>res.json())
            .then(async (data)=>{
                if(data[0]['accountStatus'] =='Active'){
                    try {
                        this.setState({
                            data: data[0],
                            assignedTasks: data[0],
                            status: true,
                        })
                    } catch (e) {
                    console.log("....Error.... ",e)
                    }
                }
                else{
                    this.setState({
                        status: false
                    })
                }
          })
          
            try{
            var agentId = await AsyncStorage.getItem('agentId');
            }catch (e){
                console.log("....Error.... ",e)
            }
            await fetch(url+'/countUserTasks/'+agentId)
            .then(res=>res.json())
            .then(async (data)=>{
                try {
                    this.setState({
                        totalJobs: data
                    })
                } catch (e) {
                console.log("....Error.... ",e)
                }
              })
                try{
                    var agentId = await AsyncStorage.getItem('agentId');
                }catch (e){
                    console.log("....Error.... ",e)
                }
                await fetch(url+'/countActiveTasks/'+agentId)
                .then(res=>res.json())
                .then(async (data)=>{
                    try {
                    this.setState({
                        activeTasks: data
                    })
                    } catch (e) {
                    console.log("....Error.... ",e)
                    }
                })  
                try{
                    var agentId = await AsyncStorage.getItem('agentId');
                }catch (e){
                    console.log("....Error.... ",e)
                }
                await fetch(url+'/countCompleteTasks/'+agentId)
                .then(res=>res.json())
                .then(async (data)=>{
                    this.setState({
                        isLoading: false,
                        completedJobs: data
                    })
                })

                // await fetch(url+'/countStartedTasks/'+agentId)
                // .then(res=>res.json())
                // .then(async (data)=>{
                //     this.setState({
                //         isLoading: false,
                //         countStartedJobs: data
                //     })
                // })

                // await fetch(url+'/startedTasks/'+agentId)
                // .then(res=>res.json())
                // .then(async (data)=>{
                //     this.setState({
                //         isLoading: false,
                //         startedJobs: data[0]
                //     })
                // })
};                

    handleCallBack = (navigateTo, jobId) => {
        if(navigateTo == 'ShowTaskScreen'){
            this.props.navigation.navigate(navigateTo, { jobId: jobId});
        }
        else{
            this.props.navigation.navigate(navigateTo);
        }
    }


render() {
    const profile_fields = [
        {
            profileimage: this.state.data['profileimage'], name: this.state.data['username'],phone_number: this.state.data['phone'],profession: this.state.data['profession'], joiningdate: this.state.data['joiningdate']
        },
    ]; 
    const total_jobs_fields = [
        {
            icon: 'clipboard-check-outline', total_jobs: this.state.totalJobs, date: '21/03/2021', time: '01:22:08'
        },
    ]; 
    const sub_jobs_fields = [
        {
            icon: 'check-outline', no_of_jobs: this.state.completedJobs, title: 'Completed Jobs', navigateTo: 'CompletedTasksScreen', type: true
        },
        {
            icon: 'account-hard-hat', no_of_jobs: this.state.activeTasks, title: 'Pending Jobs', navigateTo: 'RemainingTasksScreen', type: true
        },
        // {
        //     icon: 'clipboard-check-outline', no_of_jobs: this.state.countStartedJobs, title: 'Started Jobs', navigateTo: 'StartedTasksScreen', type: true
        // },
        // {
        //     icon: 'account-hard-hat', no_of_jobs: this.state.countStartedJobs, title: 'Current Job', navigateTo: 'StartedTasksScreen', type: false, startedJob: this.state.startedJobs
        // },
    ];
    return (
        <SafeAreaView style={styles1.homeMenuStyle}>
        <Header
            title='Home'
            isHome={true}
            navigation={this.props.navigation}
        /> 
                {
                this.state.isLoading ? 
                <View style={styles.buttonTouch}>
                    <ActivityIndicator size={'large'} color={'#fff'} />
                </View>
                :
                <ScrollView style={[styles1.column]}>
                    { this.state.status  && !this.state.isLoading  ?
                    <HomeProfileComponent profile_fields={profile_fields} style={{flex: 0.2}} />
                    :
                    null
                    }
                    { 
                   this.state.status && !this.state.isLoading ?
                    <View>
                        <TotalJobsComponent total_jobs_fields={total_jobs_fields} style={{flex: 0.3,}} /> 
                        <SubJobsComponent sub_jobs_fields={sub_jobs_fields} onPress={() =>{}}  style={{flex: 0.5,}} handleCallBack={this.handleCallBack}/>
                    </View>
                    :
                    <View>
                        <Text style={{marginHorizontal: 10}}>You need to wait until your account approves so that you can get orders.</Text>
                        <Text style={{marginHorizontal: 10}}>Once you submit your details you'll start getting orders.</Text>
                        <TouchableOpacity style={styles1.button} onPress={() =>{this.props.navigation.navigate('EditProfileScreen')}}>
                            <View style = {styles1.menuItem}>
                                <View style = {{flexDirection: 'row',marginLeft: 10}}>
                                    <View style={{marginLeft: 15,marginTop: 3}}>
                                        <Text style = {styles1.menuItemText}>Edit Your Details</Text>
                                    </View>
                                </View>
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles1.button} onPress={() =>{this.props.navigation.navigate('UploadDocumentsScreen')}}>
                            <View style = {styles1.menuItem}>
                                <View style = {{flexDirection: 'row',marginLeft: 10, }}>
                                    <View style={{marginLeft: 15,marginTop: 3}}>
                                        <Text style = {styles1.menuItemText}>Edit Your Documents</Text> 
                                    </View>
                                </View>
                            </View> 
                        </TouchableOpacity>
                    </View>
                    }
            </ScrollView> 
            }
        </SafeAreaView>   
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
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        height: 60,
        color: '#fff'
    },
    menuItemText: {
        color: '#ffffff',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    },
    button: {
        height: 60,
        backgroundColor: '#006600',
        borderRadius: 5,
        marginHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    }
    
});
export default HomeScreen;