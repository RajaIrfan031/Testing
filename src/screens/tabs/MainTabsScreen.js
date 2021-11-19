import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

  const DetailsScreen = ({navigation}) => {
    return (
      <View style = {{flex:1, alignItems: 'center',justifyContent: 'center'}}>
        <Text>DetailsScreen</Text>
      </View>
    );
  }