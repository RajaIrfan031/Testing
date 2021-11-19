import React from 'react';
import {View , Text, Button, StyleSheet} from 'react-native';

const DetailsScreen = ({navigation}) => {
    return(
        <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}}> 
        <Text>HomeScreen</Text>
            <Button 
            title = "Go to Home Screen"
            onPress = {()=>{navigation.navigate("HomeScreen")}}
            />
        </View>
    );
};

export default DetailsScreen;