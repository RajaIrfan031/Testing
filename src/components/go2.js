import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// import Icon from 'react-native-ionicons';
import {CheckBox} from 'react-native-elements';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Getorder extends React.Component {
  state = {
    Area: 0,
    checked: false,
    checkedVisit: true,
  };
  sub = (base, exponent) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontSize: 16, color: '#006600'}}>{base}</Text>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 13, color: '#006600'}}>{exponent}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              marginBottom: 20,
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                color: '#006600',
                textTransform: 'uppercase',
              }}>
              Area
            </Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.subArea(this.props.indexItem)}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#006600',
                  borderRadius: 5,
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <FontAwesome
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 19,
                  }}

                  color='#fff'
                  name="minus"
                />
              </TouchableOpacity>
              <Text>{this.props.ITEM.Area}</Text>
              <TouchableOpacity
                onPress={() => this.props.AddArea(this.props.indexItem)}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#006600',
                  borderRadius: 5,
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                }}>
                  
                  <FontAwesome
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 19,
                  }}
                  color='#fff'
                  name="plus"
                />
              </TouchableOpacity>
              <View style={{marginLeft: responsiveWidth(1)}}>
                {(() => this.sub('m', '2'))()}
              </View>
            </View>
          </View>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '40%'}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  color: '#006600',
                  textTransform: 'uppercase',
                }}>
                Visit / Week
              </Text>
            </View>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.checkedVisit}
              onPress={() =>
                this.setState({checkedVisit: true, checked: false}, () => {
                  this.props.UnCheckAll(this.props.indexItem);
                })
              }
              checkedColor={'#006600'}
              uncheckedColor={'#212121'}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            {this.state.checked ? (
              <View
                style={{
                  width: '90%',
                }}>
                <FlatList
                  data={this.props.Days}
                  keyExtractor={item => item.frequencyID}
                  numColumns={7}
                  renderItem={({item, index}) => (
                    <View
                      style={[
                        styles.Day,
                        item.checked ? {backgroundColor: '#006600'} : null,
                      ]}>
                      <Text
                        style={[
                          {color: 'white', fontSize: responsiveFontSize(1.5)},
                          item.checked ? {color: 'white'} : null,
                        ]}>
                        {item.day}
                      </Text>
                    </View>
                  )}
                />
              </View>
            ) : (
              <View
                style={{
                  width: '90%',
                }}>
                <FlatList
                  data={this.props.Days}
                  keyExtractor={item => item.frequencyID}
                  numColumns={7}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.SelectDay(this.props.indexItem, index);
                      }}
                      style={[
                        styles.Day,
                        item.checked ? {backgroundColor: '#006600'} : null,
                      ]}>
                      <Text
                        style={[
                          {color: 'white', fontSize: responsiveFontSize(1.5)},
                          item.checked ? {color: 'white'} : null,
                        ]}>
                        {item.day}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                color: '#006600',
                textTransform: 'uppercase',
              }}>
              Everyday
            </Text>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.checked}
              onPress={() =>
                this.setState({checkedVisit: false, checked: true}, () => {
                  this.props.SelectAll(this.props.indexItem);
                })
              }
              checkedColor={'#006600'}
              uncheckedColor={'#212121'}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                color: '#006600',
                textTransform: 'uppercase',
              }}>
              Price/meter sq.
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(1.7),
                color: '#006600',
                textTransform: 'uppercase',
              }}>
              {this.props.ITEM.maintenancePrice}
              {' AED'}
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: responsiveHeight(2),
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                color: '#006600',
                textTransform: 'uppercase',
              }}>
              Total
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(1.7),
                color: '#006600',
                textTransform: 'uppercase',
              }}>
              {this.props.ITEM.Area *
                this.props.ITEM.maintenancePrice *
                this.props.ITEM.SelectedDaysCount}
              {' AED'}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,

    width: 280,
    marginLeft: 30,
  },

  tabContent: {
    color: '#006600',
    fontSize: 18,
    margin: 24,
  },
  Seperator: {
    marginHorizontal: -10,
    alignSelf: 'stretch',
    borderTopWidth: 0,
    borderTopColor: '#888888',
    marginTop: 24,
  },
  tabStyle: {
    borderColor: '#006600',
  },
  activeTabStyle: {
    backgroundColor: '#006600',
  },
  Day: {
    width: responsiveWidth(8.5),
    height: responsiveHeight(5),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#57A846',
    marginRight: responsiveWidth(1),
    marginBottom: responsiveHeight(1),
  },
});
export default Getorder;
