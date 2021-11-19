import React, {Component} from 'react'
import { View, Image, SafeAreaView, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

class StartTimer extends Component{
    
    goCallBack = (event) => {
        
        Alert.alert(
        "Start Timer?",
        "Are you sure you want to start this timer?",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => this.props.parentCallBack(true) }
        ]
        );
        
        event.preventDefault();
    }
    render() {
        const { selected_task } = this.props;
        return (
            <View>
                {
                selected_task.map(({task_title, client, address, jobId, agentId})=>
                    <View key={client} style={styles.timerHeader}>
                        <TouchableOpacity style={styles.timer} onPress={ this.goCallBack }>
                            <MaterialCommunityIcons name="play" color="#ffffff" size={32}/>
                            <Text style={{fontSize: 26,color: '#ffffff',fontWeight: 'bold',alignSelf: 'center',}}>Start Timer</Text>
                        </TouchableOpacity>
                    </View>
                    )
                }
            </View> 
        );
        }
}

const styles = StyleSheet.create({

    timerHeader: {
        height: 130,
        backgroundColor: '#006600',
        alignItems: 'center'
        },
    timerTitle: {
        alignSelf: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 10,
    },
    timer: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 50,
        borderColor: '#fff',
        height: 64,
        borderWidth: 2, 
    }
    
});

export default StartTimer;
