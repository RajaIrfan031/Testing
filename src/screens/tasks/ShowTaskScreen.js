import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import ClientInfoComponent from '../../components/TasksComponent/ClientInfoComponent'; 
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {url} from '../../constants/constant';
import styles from '../../styles/styles.js'

class ShowTaskScreen extends Component{

    constructor(props) {
        
    super(props);
    
    var jobId = props.route.params.jobId;
    if(jobId != null){
        this.state = {
            data: [],
            isLoading: false,
            isUpLoading: false,
            taskDetail: [''],
            imageList: [''],
            aId: '',
            jobSet: false,
            jobDetails: [''],
            allLogs: [''],
            jobId: jobId,
            isCurrentTimer: false,
            currentTimer: '',
            totalTimer: '',
            isTimerSet: true,
            taskId: '',
            jobStatus: false,
            mainCurrentTimer: '',
            isMainCurrentTimer: false,
            clientData: [''],
            agentId: '',
            isImage: false,
            selfieImage: '',
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
              jobStatus: data[0].jobStatus == "Started" ? true : false,
              jobSet: true,
              clientId: data[0].clientId
            })
          } catch (e) {
            console.log("....Error.... ",e)
          }
      })
    
    this.setState({
        isLoading: false,
    })

    this.getClientData();
    }

    getClientData = () => {
        fetch(url+'/getClientData/'+this.state.clientId)
            .then(res=>res.text())
            .then(async (data)=>{
                try {
                    this.setState({
                        clientData: data,
                        isLoading: false,
                    })
                } catch (e) {
                console.log("....Error.... ",e)
                }
            })
    }

    handleUplaodFromCamera = () => {

        launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
          if(response.didCancel){
            return;
          }
          else { 
            let tempImage = [];
            tempImage.push(response);
            this.setState({
                imageList: tempImage,
                selfieImage: response.uri,
                isImage: true
            });
        }
        });
        
    }

    showAlert = () => {
        Alert.alert(
            "Uploaded",
            "Image is successfully uploaded.",
            [
                {
                text: "Okay",
                onPress: () => console.log("Okay Pressed"),
                style: "cancel"
                },
            ]
            );
    }

    uploadSelfie = () => {
        this.setState({
            isUpLoading: true
        })

        let uploadData = new FormData();

        uploadData.append("agentId", this.state.taskDetail.agentId);
        uploadData.append("jobId", this.state.jobId);
        this.state.imageList.forEach((element, i) => {
            console.log(element);
           uploadData.append("image_path", {
            uri: element.uri,
            type: "image/jpeg",
            name: "image.jpg",
          });
        });
        
        fetch(url+'/uploadTasksImages',{
        headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        },
        method: 'POST',
        body: uploadData,
    }).then((response) => {
        response.text().then((res) => {
            this.showAlert();
        this.setState({
            isUpLoading: false,
        })
        });
        })
        .catch((error) => {
            this.setState({
            isUpLoading: false,
        })    
        console.log(error, "Image is not uploaded");
        });
    }


    render() {    
        const selected_task = [
            {
                task_title: this.state.taskDetail.jobName,client: 'Client 1',address: 'Palace#1, Jumairah Road, Dubai',currentTimer: this.state.currentTimer, jobId: this.state.taskDetail.jobId, agentId: this.state.taskDetail.agentId, },
             ]; 
        const selected_main_task = [
        {
            task_title: this.state.taskDetail.jobName,client: 'Client 1',address: 'Palace#1, Jumairah Road, Dubai',currentTimer: this.state.mainCurrentTimer, jobId: this.state.taskDetail.jobId, agentId: this.state.taskDetail.agentId, },
            ]; 
        const client_info = [
            {
                client_name: this.state.taskDetail.clientName,client_image_uri: this.state.taskDetail.clientPhoto,client_address: this.state.taskDetail.clientAddress, jobValue: this.state.taskDetail.jobValue, clientGoogleMapAddress: this.state.taskDetail.clientGoogleMapAddress, jobDescription: this.state.taskDetail.jobDescription, agentId: this.state.taskDetail.agentId, jobId: this.state.taskDetail.jobId },
            ];  
        return (
            <View style={{flex: 1}}>
                <Header
                title='Job Details'
                isHome={false}
                navigation={this.props.navigation}
            /> 
            {this.state.isLoading ? 
            <ActivityIndicator size={'large'} color={'#006600'} /> 
            :
                <ScrollView>
                    <View style={styles1.mainTitle}>
                        <Text style={styles1.timerTitle}>{selected_task[0].task_title}</Text>
                        <View style={{marginLeft: 10,paddingTop: 8,paddingLeft: 16,alignItems: 'center', marginBottom: 20}}>
                            <TouchableOpacity style={styles.mapButton} onPress={()=> this.handleUplaodFromCamera()}>
                                <View style={{flexDirection: 'row'}}>
                                  <Icon name="camera-plus" size={40} color="#006600"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                    <ClientInfoComponent client_info={client_info}/>                
                    
                {this.state.isImage ? 
                  <View>  
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: this.state.selfieImage }} style={styles1.image}/>
                        <TouchableOpacity style={[styles1.mapButton]} onPress={()=> this.uploadSelfie()}>
                                    { this.state.isUpLoading ? 
                                    <ActivityIndicator size={24} color='#ffffff' style={{width: 80}} />
                                    :
                                    <View style = {{flexDirection: 'row',marginLeft: 10}}>
                                        <MaterialCommunityIcons name="cloud-upload" color='#ffffff' size={24} />
                                            <View style={{marginLeft: 15,marginTop: 3}}>
                                                <Text style={styles1.itemText}>Upload</Text>
                                            </View> 
                                    </View>
                                    }
                                </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 10,paddingTop: 8,paddingLeft: 16,alignItems: 'center', marginBottom: 20}}>
                                
                            </View>
                    </View>
                  : null
                  }
                  </ScrollView>
            }
            </View>
        );
    }
} 

const styles1 = StyleSheet.create({

    mainTitle: {
        backgroundColor: 'rgba(0,102,0,0.2)',
        height: 100,
        paddingTop: 10,
        alignItems: 'center'
    },
    timerTitle: {
        alignSelf: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 22,
    },
    mapButton: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#006600',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16
    },
    image: {
        width: 80,
        height: 80,
        margin: 16,
        resizeMode: 'contain',
      },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    },
    itemText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    },   
});
export default ShowTaskScreen;