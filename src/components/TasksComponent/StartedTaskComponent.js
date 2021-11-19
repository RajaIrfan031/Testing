import React, {useState} from 'react'
import { View, Image, SafeAreaView, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { 
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import {url} from '../../constants/constant'; 

const StartedTaskComponent = ({remainingTasks}) => {
    
    const navigation = useNavigation();
    const navigateTo = (task) => {
            navigation.navigate('ShowTaskScreen', { jobId: task.jobId});
        }

    return (
        <ScrollView>
            {
                remainingTasks.map(({clientName, _id, jobName, jobId, clientPhoto, clientAddress, assignDate, jobStatus, jobValue}) =>
                <View key={_id}>
                <TouchableOpacity key={_id} style = {styles.userInfoSection}
                    onPress={() => {
                        navigateTo({jobStatus: jobStatus, jobId: jobId, title: jobName, assignDate: assignDate, jobValue: jobValue, clientAddress: clientAddress})
                        }}>
                    <View style = {{flexDirection: 'row' }}>
                        <Avatar.Image source={{uri: clientPhoto}} style={{marginTop: 20}}/>
                        <View style={{marginLeft: 10,flex: 1}}>
                            <Title style={[styles.title, { 
                                marginBottom: 5
                            }]}>{clientName}</Title>
                            <View style={{flexDirection: 'row'}}>
                                <Caption style={styles.caption}><Text style={styles.subTitle}>Task: </Text>{jobName}</Caption>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Caption style={styles.caption}><Text style={styles.subTitle}>Address: </Text>{clientAddress}</Caption>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Caption style={styles.caption}><Text style={styles.subTitle}>Schedule At: </Text>{assignDate}</Caption>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Caption style={styles.caption}><Text style={styles.subTitle}>Job Status: </Text>{jobStatus}</Caption>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
                )
            }
        </ScrollView> 
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 10,
        paddingVertical: 5, 
        borderBottomWidth: 1
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    subTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    caption: { 
        flex: 1,
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500', 
        flexWrap: 'wrap',
        marginBottom: 5
    },
    tinyImage: {
        width: 80,
        height: 50,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
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
        fontSize: 22
      },
      taskDetailsArea: {
          paddingTop: 15,
          paddingLeft: 35,
          width: '90%'
      },
      detailGroup: {
          flexDirection: 'row',
          marginTop: 10,
          width: '100%'
      },
      detailTitle: {
          fontSize: 22,
          fontWeight: 'bold'
      },
      detailText: {
        fontSize: 22,
    },
});

export default StartedTaskComponent;
