import React, {} from 'react'
import { View, Image, SafeAreaView, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SubTimeComponent = ({allLogs}) => {
    return (
        <View style={{borderBottomWidth: 1,borderBottomColor: '#dddddd'}}> 
            {
            allLogs.map( (log, index)=>
            <View style={styles.mainRow} key={index}>
                <View style={{width: '15%',}}>
                    <Text style={{alignSelf: 'center',fontWeight: 'bold',fontSize: 16}}>{index + 1}</Text>
                </View>
                <View style={{width: '70%',}}>
                    <Text style={{alignSelf: 'center',fontSize: 16}}>{log.stopTimer}</Text>
                </View> 
            </View>
            )
            }
        </View> 
    );
}

const styles = StyleSheet.create({
    mainRow: {
        flexDirection: 'row', 
        height: 40,
        paddingHorizontal: 20,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd'
    },
    row: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    mapButton: {
        marginVertical: 10
    }
}
);

export default SubTimeComponent;
