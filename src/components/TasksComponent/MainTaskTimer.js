import React, {Component} from 'react'
import { View, Image, SafeAreaView, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Stopwatch } from 'react-native-stopwatch-timer';

class MainTaskTimer extends Component{
    
    goCallBack = (event) => {
        
        Alert.alert(
        "Stop Timer?",
        "Are you sure you want to stop this timer?",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => this.props.parentCallBack(false) }
        ]
        );
        
        event.preventDefault();
    }
    render() {
        const { selected_task } = this.props;
        return (
            <View>
                {
                selected_task.map(({task_title, client, address, currentTimer})=>
                    <View key={client} style={styles.timerHeader}>
                        <Text style={styles.timerTitle}>{currentTimer}</Text>
                        <Text style={styles.timerTitle}>{task_title}</Text>
                        {/* <View style={styles.timer}>
                            <Stopwatch laps start={true}
                                options={options}
                                startTime={Number(currentTimer)}
                            />
                        </View> */}
                        {/* <View style={styles.stopTimer} >
                            <TouchableOpacity onPress={ this.goCallBack }>
                                <Text style={{fontSize: 26,color: '#ffffff',fontWeight: 'bold',alignSelf: 'center',}}>Stop</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    )
                }
            </View> 
        );
    }
}
const options = {
    container: {
      backgroundColor: '#006600',
      padding: 5,
      borderRadius: 5, 
    },
    text: {
      fontSize: 30,
      color: '#FFF',
      marginLeft: 7,
    }
  };
const styles = StyleSheet.create({

    timerHeader: {
        height: 160,
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
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        width: '100%'
    },
    stopTimer: {
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 50,
            marginTop: 5,
            borderColor: '#fff',
            height: 50,
            borderWidth: 2,
            width: 80,
            width: '25%'
    }
});

export default MainTaskTimer;
