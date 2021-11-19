import React, {} from 'react'
import { View, Image, SafeAreaView, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { 
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';

const ShowTaskComponent = ({remainingTasks}) => {
    
    return (
        <ScrollView>
            <View style={{justifyContent: 'center',alignItems: 'center',marginTop: 10,borderBottomWidth:1,marginBottom: 10,paddingBottom: 10}}>
                <Text style={styles.title}>Remaining Tasks</Text>
            </View>
            {
                remainingTasks.map(({icon, client, address,scheduled_at,client_image_uri,task}) => 
                <TouchableOpacity key={client} style = {styles.userInfoSection}>
                    <View style = {{flexDirection: 'row' }}>
                        <Avatar.Image source={{uri: client_image_uri}} style={{marginTop: 20}}/>
                        <View style={{marginLeft: 10,flex: 1}}>
                            <Title style={[styles.title, { 
                                marginBottom: 5
                            }]}>{client}</Title>
                            <View style={{flexDirection: 'row'}}>
                            <Caption style={styles.caption}><Text style={styles.subTitle}>Task: </Text>{task}</Caption>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            <Caption style={styles.caption}><Text style={styles.subTitle}>Address: </Text>{address}</Caption>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            <Caption style={styles.caption}><Text style={styles.subTitle}>Schedule At: </Text>{scheduled_at}</Caption>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>            
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
    
});

export default ShowTaskComponent;
