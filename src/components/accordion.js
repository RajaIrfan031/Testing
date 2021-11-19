import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Getorder from './go2';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
export default class Accordion extends Component {
  constructor() {
    super();
    this.state = {updated_Height: 0};
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.accordionButtonText}>
            {this.props.item.typeName}
          </Text>
          <FontAwesome
            name={ this.props.item.expanded ? "chevron-down" : "chevron-right"}
            size={responsiveFontSize(2.5)}
            color={'#212121'}
          />
        </TouchableOpacity>
        {this.props.item.expanded ? (
          <View style={[styles.NestedContentCard]}>
            <Text style={styles.accordionText} />
            <Getorder
              SelectDay={this.props.SelectDay}
              subArea={this.props.subArea}
              AddArea={this.props.AddArea}
              indexItem={this.props.indexItem}
              ITEM={this.props.item}
              Days={this.props.item.Days}
              SelectAll={this.props.SelectAll}
              UnCheckAll={this.props.UnCheckAll}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accordionText: {
    fontSize: 18,
    color: '#006600',
    padding: 0,
    marginVertical: 0,
  },
  accordionButtonText: {
    color: '#006600',
    fontSize: responsiveFontSize(1.8),
  },
  accordionHolder: {
    borderWidth: 90,
    borderColor: 'transparent',
    marginVertical: -80,
    marginRight: -50,
  },
  header: {
    borderRadius: 8,
    backgroundColor: '#f4f5f7',
    elevation: 5,
    paddingVertical: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(2),
    //  marginBottom:responsiveHeight(2)
  },
  container: {
    marginBottom: responsiveHeight(2),
    width: '100%',
  },
  NestedContentCard: {
    marginTop: responsiveHeight(1),
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
