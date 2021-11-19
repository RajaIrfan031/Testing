import React, {} from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeMenuComponent = ({settingsOptions}) => {
    
    return (
        <View style={{flexDirection: 'row',flexWrap: 'wrap',flex: 1}}>
            {
                settingsOptions.map(({icon, title, onPress}) => 
                <View key={title}   style={{ padding: 20,}}>
                    <TouchableRipple style={{backgroundColor: 'rgba(0, 102, 0, 0.65)',padding: 10,width: 150,borderRadius: 10,alignItems: 'center',justifyContent: 'center'}} 
                    onPress={() =>{ }}>
                        <>
                        <MaterialCommunityIcons name={icon} size={100}/>
                        <Text style={{fontWeight: 'bold',fontSize: 16}}>{title}</Text>
                        </>
                    </TouchableRipple>
                </View>
                )
            }
        </View>
    );
}

export default HomeMenuComponent;
