import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ClientInfoComponent from '../../components/TasksComponent/ClientInfoComponent'; 
import TaskTimer from '../../components/TasksComponent/TaskTimer';
import StartTimer from '../../components/TasksComponent/StartTimer';
import TotalTimeComponent from '../../components/TasksComponent/TotalTimeComponent';
import SubTimeComponent from '../../components/TasksComponent/SubTimeComponent';
import Header from '../../components/Header/Header';
import {url} from '../../constants/constant';

class ShowCompletedTaskScreen extends Component{

    constructor(props) {
        
    super(props);
    
    var jobId = props.route.params.jobId;
    if(jobId != null){
        this.state = {
            data: [],
            isLoading: false,
            taskDetail: [''],
            aId: '',
            jobSet: false,
            jobDetails: [''],
            allLogs: [''],
            jobId: jobId,
            isCurrentTimer: false,
            currentTimer: '',
            totalTimer: '',
            isTimerSet: true,
            taskId: ''
            };
        }
    }

    componentDidMount = async () => {
    this.setState({
        isLoading: true,
    })
    await fetch(url+'/getTasksByJobId/'+this.state.jobId)
      .then(res=>res.json())
      .then(async (data)=>{
          try {
            this.setState({
              taskDetail: data[0],
              taskId: data[0]._id,
              jobSet: true,
            })
          } catch (e) {
            console.log("....Error.... ",e)
          }
      })
      await fetch(url+'/getEndJobValue/'+this.state.jobId)
            .then(res=>res.text())
            .then(async (data)=>{
                console.log("value"+data)
                try {
                    this.setState({
                        totalTimer: data,
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
        const selected_task = [
            {
                task_title: this.state.taskDetail.jobName,client: 'Client 1',address: 'Palace#1, Jumairah Road, Dubai',currentTimer: this.state.currentTimer, jobId: this.state.taskDetail.jobId, agentId: this.state.taskDetail.agentId, },
             ]; 
        const client_info = [
            {
                client_name: 'Alex Make',client_image_uri: this.state.taskDetail.clientPhoto,client_address: this.state.taskDetail.clientAddress, jobValue: this.state.taskDetail.jobValue},
            ];  
        return (
            <View style={{flex: 1}}>
                <Header
                title='Completed Task'
                isHome={false}
                navigation={this.props.navigation}
                navigateTo='HomeScreen'
            /> 
            {this.state.isLoading ? 
            <ActivityIndicator size={'large'} color={'#006600'} /> 
            :
            <ScrollView>
                <View style={styles.top1}>
                    <View style={styles.dateView}>
                            <Text style={styles.dateHeading}>{this.state.taskDetail.jobAssignDate}</Text>
                        </View>
                        <View style={styles.dateView}>
                            <Text style={styles.dateHeading}>{this.state.taskDetail.clientAddress}</Text>
                        </View>
                        <View style={styles.jobValueView}>
                            <Text style={styles.jobValueHeading}>{this.state.taskDetail.jobName}</Text>
                        </View>
                        <View style={styles.jobValueView}>
                            <Text style={styles.jobValueHeading}>{this.state.taskDetail.jobValue} A.E.D</Text>
                        </View>                    
                        <View style={styles.jobValueView}>
                            <Text style={styles.jobValueHeading}>{this.state.totalTimer}</Text>
                        </View>                    
                    </View>
            </ScrollView>
            }
            </View>
        );
    }
}
styles = StyleSheet.create(
  {
      top1: {
          backgroundColor: '#EEF1F2',
          alignItems: 'center',
          justifyContent: 'center',
      },
      dateView: {
          height: 40,
          marginTop: 20
      },
      jobValueView: {
        height: 60,
        marginTop: 20
      },
      dateHeading: {
        fontSize: 16
      },
      jobValueHeading: {
          fontSize: 24
      }
}
);
export default ShowCompletedTaskScreen;
