import React, {Component} from 'react';
import {
  LayoutAnimation,
  Platform,
  View,
  ScrollView,
  UIManager,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {Text} from 'native-base';
import Accordion from '../component/accordion';
import styles from '../styles/styles';
import CustomHeader from '../component/CustomHeader';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Snackbar} from 'react-native-paper';
import {url} from '../constants/constant';
import axios from 'axios';
class BOBYM extends Component {
  constructor() {
    super();
   // StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      Services: [],
      isLoading: true,
      Total: 0,
      visible: false,
    };
  }


  UNSAFE_componentWillMount = () => {
    this.navigation = this.props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    let routeName = this.props.route.name;
    if (routeName === 'BOBYM') {
      BackHandler.exitApp();
      return true;
    }
  };
  RemoveListener = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  componentDidMount = () => {
    this.navigation = this.props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    });
    this.getServices();
    this.setState({
      Services: [],
      isLoading: true,
      Total: 0,
      visible: false,
    });
    StatusBar.setBarStyle('dark-content');
  };
  closeAccordians = () => {
    let newServices = [...this.state.Services];
    for (let i = 0; i < newServices.length; i++) {
      newServices[i].expanded = false;
    }
    this.setState({Services: newServices});
  };
  verify = async () => {
    // if (this.state.Total !== 0) {
    //   await this.closeAccordians();
    //   await this.RemoveListener();
      await this.props.navigation.navigate('getLocation')
      //, {
        // Services: this.state.Services,
        // Total: this.state.Total,
      //});
    // } else {
    //   this.setState({
    //     visible: true,
    //   });
    // }
  }
  getTotal = () => {
    let x = [...this.state.Services];
    let total = 0;
    for (var item = 0; item < x.length; item++) {
      total =
        total +
        x[item].SelectedDaysCount * x[item].Area * x[item].maintenancePrice;
    }
    this.setState({Total: total});
  };
  getServices = async () => {
    await axios
      .get(url + '/customerMaintenance/getMaintenanceType')
      .then(async Response => {
        let services = await Response.data.data;
        let Errors = await Response.data.error;
        if (!Errors) {
          let DuplicateServices = [];
          services.map(async item => {
            await axios
              .get(url + '/customerfrequency/getFrequency')
              .then(async Responses => {
                let Errors = await Response.data.error;
                let days = await Responses.data.data;
                let dupDays = [];
                days.map(item2 => {
                  dupDays.push({...item2, checked: false});
                });
                if (!Errors) {
                  DuplicateServices.push({
                    ...item,
                    expanded: false,
                    Area: 0,
                    SelectedDaysCount: 0,
                    Days: dupDays,
                  });
                }
              })
              .catch(error => {
                // console.log(error);
              });
          });

          setTimeout(async () => {
            let SortedArray = await DuplicateServices.sort(
              (a, b) => a.maintenanceID - b.maintenanceID,
            );
            this.setState({
              Services: SortedArray,
              isLoading: false,
            });
          }, 3000);
        } else {
          this.setState({isLoading: false});
        }
      })
      .catch(error => {
        // console.log(error);
      });
  };
  AddArea = index => {
    let newArr = [...this.state.Services];
    if (newArr[index].Area === 0) {
      newArr[index].Area += 10;
    } else {
      newArr[index].Area += 10;
    }
    this.setState({Services: newArr}, () => {
      this.getTotal();
    });
  };
  subArea = index => {
    let newArr = [...this.state.Services];
    if (newArr[index].Area > 0) {
      if (newArr[index].Area > 10) {
        newArr[index].Area -= 10;
      } else if (newArr[index].Area === 10) {
        newArr[index].Area -= 10;
      }
      // newArr[index].Area -= 50;
      this.setState({Services: newArr}, () => {
        this.getTotal();
      });
    }
  };
  SelectDay = (ItemIndex, ArrayIndex) => {
    let newArr = [...this.state.Services];
    newArr[ItemIndex].Days.map((item2, index2) => {
      if (ArrayIndex === index2) {
        item2.checked = !item2.checked;
      }
    });
    let SelectedNumOFDays = newArr[ItemIndex].Days.filter(
      item3 => item3.checked === true,
    ).length;
    newArr[ItemIndex].SelectedDaysCount = SelectedNumOFDays;
    this.setState({Services: newArr}, () => {
      this.getTotal();
    });
  };
  SelectAll = ItemIndex => {
    let newArray = [...this.state.Services];
    newArray[ItemIndex].Days.map((item, index) => {
      item.checked = true;
    });
    newArray[ItemIndex].SelectedDaysCount = 7;
    this.setState({Services: newArray}, () => {
      this.getTotal();
    });
  };
  UnCheckAll = ItemIndex => {
    let newArray = [...this.state.Services];
    newArray[ItemIndex].Days.map((item, index) => {
      item.checked = false;
    });
    newArray[ItemIndex].SelectedDaysCount = 0;
    this.setState({Services: newArray}, () => {
      this.getTotal();
    });
  };
  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newArray = [...this.state.Services];
    newArray[index].expanded = !newArray[index].expanded;
    this.setState({Services: newArray});
  };
  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <SafeAreaView style={styles.IndicatorView}>
    //       <ActivityIndicator
    //         animating={this.state.isLoading}
    //         size={'large'}
    //         color={'#006600'}
    //       />
    //     </SafeAreaView>
        
    //   );
    // } else {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle={'light-content'} backgroundColor={'#006600'} />
          <CustomHeader
            title='GRDN'
            isHome={true}
            navigation={this.props.navigation}
          />
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => this.setState({visible: false})}
            duration={3000}
            action={{
              label: 'ok',
              onPress: () => this.setState({visible: false}),
            }}>
            Please Select Service First.
          </Snackbar>
          <View
            style={{
              height: responsiveHeight(8),
              justifyContent: 'center',
              width: '85%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#212121',
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2.5),
              }}>
              {'Welcome to GRDN Agent!'}
            </Text>
          </View>
          <View style={[styles.contain]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingTop: responsiveHeight(1),
                paddingBottom: responsiveHeight(10),
              }}>
              {this.state.Services.map((item, index) => (
                <Accordion
                  key={index}
                  onClickFunction={this.updateLayout.bind(this, index)}
                  item={item}
                  indexItem={index}
                  AddArea={this.AddArea}
                  subArea={this.subArea}
                  SelectDay={this.SelectDay}
                  SelectAll={this.SelectAll}
                  UnCheckAll={this.UnCheckAll}
                />
              ))}

              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderColor: '#CDCFD1',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '100%',
                  height: responsiveHeight(7.5),
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    fontSize: 14,
                    color: '#006600',
                  }}>
                  Please enter your information
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.buttonTouch, {width: '100%'}]}
                onPress={() => this.verify()}>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    fontSize: 14,
                    color: 'white',
                    textTransform: 'uppercase',
                  }}>
                  Enter info
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
  }
//}

export default BOBYM;