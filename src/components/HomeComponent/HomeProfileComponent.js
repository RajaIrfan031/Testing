import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
    Avatar, 
} from 'react-native-paper';

const HomeProfileComponent = ({profile_fields}) => {
    
    return (
        <View style={styles.head}>
            {
                profile_fields.map(({profileimage, name, phone_number, profession, joiningdate, index}) => 
                <View key={{ index }}  style={styles.container}>
                    <View style={{width: '30%'}}>
                        <View style={styles.image_section} >
                               <Avatar.Image source={{uri: profileimage}}
                               size = {80}
                               />
                        </View>
                    </View>
                    <View key={{ index }} style={{width: '70%'}}>
                        <View style={styles.info_section}   
                            onPress={() =>{ }}>
                            <View style={{backgroundColor: '#ffffff',width: 50,height: 20,justifyContent: 'center',alignItems: 'center',borderRadius: 4,marginBottom: 2}} >
                                <Text style={{color: '#006600',fontSize: 13}}>Profile</Text>                         
                            </View>
                            <Text style={styles.title}>{name}</Text>
                            <Text style={styles.title}>Phone: {phone_number}</Text>
                            <Text style={styles.title}>{profession}</Text>
                            <Text style={styles.title1}>Joining Date: {joiningdate}</Text>
                        </View>
                    </View> 
                </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({

    head: { 
        marginBottom: 20
    },
    container: {
        backgroundColor: '#006600',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20,
        borderRadius: 20,
        marginTop: 5, 
    },
    image_section: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center" 
    },
    info_section: {
        marginTop: 10,
        flexDirection: 'column',
        
    },
    title: {
        color: '#ddd',
    },
    title1: {
        color: '#ddd',
        marginBottom: 10
    },

});

export default HomeProfileComponent;
