import React, {Component} from 'react';
import {Text,View, Image} from 'react-native';
import {Icon, Button} from 'native-base';
import styles from '../../styles/styles';
import {responsiveFontSize,responsiveWidth} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Header extends Component {
  render() {
    let {title, isHome} = this.props;
    return (
      <View style={styles.Header}>
        {isHome ? (
          <Button
            transparent
            onPress={()=> {}}>
               <Image source={require('../../../assets/logo.jpeg')} style={styles.icon} />
          </Button>
        ) : (
          <Button transparent onPress={() => this.props.navigation.goBack()}>
         
           <FontAwesome
                  name="arrow-left"
                  style={{marginLeft: responsiveWidth(3), alignItems: 'center'}}
                  color={'#006600'}
                  size={responsiveFontSize(2.5)}
                />
          </Button>
        )}
        <Text style={styles.headerTexts}>{title}</Text>
        <Entypo name={'dot-single'} color={'#ffffff'} size={responsiveFontSize(2.8)} />
      </View> 
    );
  }
}

export default Header;