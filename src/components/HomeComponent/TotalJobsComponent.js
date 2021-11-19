import React, {} from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const TotalJobsComponent = ({total_jobs_fields}) => {
    
    const navigation = useNavigation();

    return (
        <View style={styles.head}>
            {
                total_jobs_fields.map(({icon, total_jobs, date, index}) => 
                <TouchableOpacity key={{ index }}  style={styles.container}  onPress={ () => navigation.navigate('AllTasksScreen')}>
                    <View style={ styles.initial_section }>
                        <View style={styles.image_section} 
                            onPress={() =>{ }}>
                                <MaterialCommunityIcons name={icon} size={100} color="white"/>
                        </View>
                    </View>
                    <View style={styles.mid_section} onPress={() =>{ }}> 
                        <View style={styles.tag} >
                            <Text style={{color: '#006600',fontSize: 18,alignSelf: 'center',}}>Total Jobs</Text>
                            <Text style={styles.title}>{total_jobs}</Text>
                        </View>
                    </View> 
                </TouchableOpacity>
            )
        }
    </View>
    );
}

const styles = StyleSheet.create({

    head: {
        
    },
    container: {
        backgroundColor: '#006600',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20,
        borderRadius: 20,
    },
    initial_section: {
        width: '25%',
        justifyContent: 'center',
        paddingVertical: 10
    },
    mid_section: {
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    tag: {
        backgroundColor: '#ffffff',
        width: 125,
        height: 30,
        marginHorizontal: 10,
        borderRadius: 4,
    },
    tagText: {

    },
    title: {
        color: 'yellow',
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    
});

export default TotalJobsComponent;
