import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
class SettingsComponent extends Component {


    signOut = async () => {

        const token = await AsyncStorage.removeItem('token');
        const uId = await AsyncStorage.removeItem('_id');
        navigation.navigate('AuthStack');
    }
    goToCallBack = (index) => {
        if(index==0){
            this.props.parentCallBack(index);
        }
    }
    
render() {  
    const { settingsOptions } = this.props;
    return (
        <ScrollView>
            {
                settingsOptions.map(({icon, title},index) => 
                <TouchableRipple key={title}  onPress={()=> {this.goToCallBack(index)}}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center',height: 60,borderBottomColor: '#dddddd',borderBottomWidth: 1,}}>
                        <MaterialCommunityIcons name={icon} color='#006600' size={26} />
                        <Text style={{marginLeft: 20,fontSize: 16}}>{title}</Text>                    
                    </View>
                </TouchableRipple>
                )
            }
        </ScrollView>
    );
}
}

export default SettingsComponent;
