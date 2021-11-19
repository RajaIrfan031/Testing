import React, {} from 'react'
import { View, Image, SafeAreaView, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
 
const TotalTimeComponent = ({total_time}) => {
    
    return (
        <View style={{borderBottomWidth: 1,borderBottomColor: '#dddddd'}}> 
                <View>
                    <View style={styles.mainRow}>
                        <Text style={{alignSelf: 'center',fontWeight: 'bold',fontSize: 16}}>Total Timer: </Text>
                        <Text style={{alignSelf: 'center',fontSize: 16}}>{total_time}</Text>
                    </View>
                </View>            
        </View> 
    );
}

const styles = StyleSheet.create({
    mainRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,102,0,0.2)',
        height: 60,
        paddingHorizontal: 5
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

export default TotalTimeComponent;
