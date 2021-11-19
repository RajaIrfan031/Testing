import React, {Component} from 'react';
import {Text,View} from 'react-native';
import {Icon, Button} from 'native-base';
import styles from '../styles/styles';
import {responsiveFontSize,responsiveWidth} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class CustomHeader extends Component {
  render() {
    let {title, isHome} = this.props;
    return (
      <View style={styles.Header}>
        {isHome ? (
          <Button
            transparent
            onPress={() => this.props.navigation.openDrawer()}>
               <FontAwesome
                  name="navicon"
                  style={{marginLeft: responsiveWidth(3), alignItems: 'center'}}
                  color={'#fff'}
                  size={responsiveFontSize(2.5)}
                />
          </Button>
        ) : (
          <Button transparent onPress={() => this.props.navigation.goBack()}>
         
           <FontAwesome
                  name="arrow-left"
                  style={{marginLeft: responsiveWidth(3), alignItems: 'center'}}
                  color={'#fff'}
                  size={responsiveFontSize(2.5)}
                />
          </Button>
        )}
        <Text style={styles.headerTexts}>{title}</Text>
        <Entypo name={'dot-single'} color={'#006600'} size={responsiveFontSize(2.8)} />
      </View> 
    );
  }
}

export default CustomHeader;
