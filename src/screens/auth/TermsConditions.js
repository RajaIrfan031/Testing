import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Text} from 'native-base';
import styles from '../../styles/styles';
import Header from '../../components/Header/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
class TermsConditions extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }
  render() {
    const {screenName} = this.props.route.params;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          title="Terms and Conditions"
          isHome={screenName === 'CreatePassword' ? false : true}
          navigation={this.props.navigation}
        />
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={styles.textView}>
              <Text
                style={[
                  styles.contentText,
                  {
                    color: '#000',
                    fontSize: responsiveFontSize(4),
                    fontWeight: 'bold',
                  },
                ]}>
                {'Terms of Use'}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: 'bold',
                  color: 'grey',
                }}>
                {'LAST UPDATED: APRIL 2020'}
              </Text>
              <Text style={{color: '#212121'}}>
                {'Thank you for choosing GRDN'}
              </Text>
              <Text style={{color: '#212121', marginTop: responsiveHeight(5)}}>
                {
                  'By subscribing to our services, you hereby consent to the following Terms of Service.'
                }
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginTop: responsiveHeight(5),
                }}>
                {'1. CONTRACTUAL RELATIONSHIP'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Summary'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'These terms constitute a binding agreement. Please read this Agreement carefully before you use GRDN. By using our site and/or mobile application you agree to be bound by everything in this Agreement and to the collection and use of the information set forth in the GRDN Privacy Policy, if you are a registered user of our Services. If you do not agree, please do not use GRDN.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Contractual Relationship'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'This is a contract (“Agreement”) between you and GRDN. GRDN is a company wholly owned by BlancRock LTD.. GRDN (“GRDN,” “we,” or “us”), applicable when you use or access the site, services and mobile application by GRDN, in existence now or in the future (“GRDN Services,” “GRDN,” or “Services”). In this Agreement, the words “including” and “include” mean “including, but not limited to.” Your access and use of the Services constitute your consent to be bound by this Agreement, which establishes a contractual relationship between you and GRDN. If you do not agree to any of the terms of this Agreement, you may not access or use the Services. This Agreement expressly supersedes any prior agreements or arrangements with you. GRDN may immediately terminate these Terms or any Services with respect to you, or generally cease offering or deny access to the Services or any portion thereof, at any time for any reason. Supplemental Terms may apply to certain Services, such as policies for a particular event, activity or promotion, and such supplemental terms will be disclosed to you in connection with the applicable Services (“Supplemental Terms”). Supplemental Terms are in addition to, and shall be deemed a part of, the Agreement for the purposes of the applicable Services. Supplemental Terms shall prevail over this Agreement in the event of a conflict with respect to the applicable Services. GRDN may amend the terms related to the Services from time to time. Amendments will become effective upon the publication of an amended Agreement. From time to time, the Agreement may change. If/When this occurs, GRDN will notify you by revising the date at the top of the Agreement, and/or by providing you with an additional notice. '
                }
              </Text>
              <Text
                style={{
                  marginTop: responsiveHeight(5),
                  color: '#212121',
                  textAlign: 'justify',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.2),
                }}>
                {
                  'Your continued access or use of the Services after such posting or notification constitutes your consent to be bound by the amended Agreement. If you do not agree with the amended Agreement, please stop using the Services as the amended Agreement will apply starting the date of posting or notification of the amendment.'
                }
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginTop: responsiveHeight(5),
                }}>
                {'2. THE SERVICES'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Summary'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You must upload the GRDN app on your smart device, follow the steps instructions and provide all required information in order to create your account to allow GRDN to provide you Services. You must be 18 years of age or older and provide a certain amount of personal information to create an account. You hereby allow GRDN to collect your personal information and your precise geolocation. GRDN may send you informational and marketing text messages. You own your personal information and User Content, permitting GRDN to use your User Content. We own our company and intellectual property information. You alone are responsible for keeping your account secure. You may not have more than one account.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Services'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'The Services constitute a technology platform that enables users of GRDN’s applications or websites (each, an “Application”) to arrange and schedule maintenance services, including grass maintenance, plant maintenance, irrigation maintenance, pool maintenance and other products and services. Unless otherwise agreed by GRDN in a separate written agreement with you, the Services are made available solely for your personal and noncommercial use.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'User Eligibility & Accounts'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'In order to use most aspects of the Services, you must register for and maintain an active personal user Services account (“Account”). You must be at least 18 years of age to obtain an Account. You must upload the GRDN app on your smart device, follow the steps instructions and provide all required information in order to create your account to allow GRDN to provide you Services. Account registration requires you to submit to GRDN certain personal information, such as your name, address, mobile phone number, password, makani number as well as at least one valid payment method (either a credit card or accepted payment partner). You agree to maintain accurate, complete, and up-to-date information in your Account. Your failure to maintain accurate, complete, and up-to-date Account information, including having an invalid or expired payment method on file, may result in your inability to access and use the Services or GRDN’s termination of this Agreement with you. You are responsible for all activity that occurs under your Account, and you agree to maintain the security and secrecy of your Account username and password at all times. Unless otherwise permitted by GRDN in writing, you may only possess one Account.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'User Conduct'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You may not authorize third parties to use your Account. You may not assign or otherwise transfer your Account to any other person or entity. You agree to comply with all applicable laws in the United Arab Emirates when using the Services, and you may only use the Services for lawful purposes. You will not use the Services to cause any nuisance, annoyance, inconvenience, or property damage, whether to GRDN or any other party. In certain Emirates and with certain services, GRDN’s emergency service may only be used when there is an emergency. In certain instances, you may be asked to provide proof of identity to access or use the Services, and you agree that you may be denied access to use of the Services if you refuse to provide proof of identity.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Network Access & Devices'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You are responsible for obtaining the data network access necessary to use the Services. Your mobile network’s data and messaging rates and fees may apply if you access or use the Services from a wireless-enabled device. You are responsible for acquiring and updating compatible hardware or devices necessary to access and use the Services and Applications and any updates thereto. GRDN does not guarantee that the Services, or any portion thereof, will function on any particular hardware or devices. In addition, the Services may be subject to malfunctions and delays inherent in the use of the Internet and electronic communications.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'License'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'Subject to your compliance with this Agreement, GRDN grants you a limited, non-exclusive, non-sublicensable, revocable, non-transferrable license to:'
                }
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    '• access and use the Applications on your personal device solely in connection with your use of the Services; and' }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    '• access and use any content, information and related materials that may be made available through the Services, in each case solely for your personal and non-commercial use. Any rights not expressly granted herein are hereby reserved by GRDN and GRDN’s licensors.'  }
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Prohibited Activities'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {'You may not:'}
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'have more than one active Account'}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'remove any copyright, trademark or other proprietary notices from any portion of the Services'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'reproduce, modify, prepare derivative works based upon, distribute, license, lease, sell, resell, transfer, publicly display, publicly perform, transmit, stream, broadcast or otherwise exploit the Services except as expressly permitted by GRDN'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'decompile, reverse engineer or disassemble the Services except as may be permitted by applicable law'
                  }{' '}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'link to, mirror or frame any portion of the Services'}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    '	cause or launch any programs or scripts for the purpose of scraping, indexing, surveying, or otherwise data mining any portion of the Services or unduly burdening or hindering the operation and functionality of any aspect of the Services '
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'attempt to gain unauthorized access to or impair any aspect of the Services or its related systems or networks.'
                  }
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Third Party Services & Content'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
           'The Services may be made available or accessed in connection with third party services and content (including advertising) that GRDN does not control. You acknowledge that different terms of use and privacy policies may apply to your use of such third-party services and content. GRDN does not endorse such third-party services and content, and in no event shall GRDN be responsible or liable for any products or services of such third-party providers. Additionally, Apple Inc., Google, Inc., Microsoft Corporation or BlackBerry Limited will be a third-party beneficiary to this contract if you access the Services using Applications developed for Apple iOS, Android, Microsoft Windows, or Blackberry-powered mobile devices, respectively. These third-party beneficiaries are not parties to this contract and are not responsible for the provision or support of the Services in any manner. Your access to the Services using these devices is subject to terms set forth in the applicable third-party beneficiary’s terms of service. You agree to comply with any applicable third-party terms when using the Services.'
           }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Ownership'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                 'The Services and all rights therein are and shall remain GRDN’s property or the property of GRDN’s licensors. Neither this Agreement nor your use of the Services convey or grant to you any rights:'
                 }
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'in or related to the Services except for the limited license granted above'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'to use or reference in any manner GRDN\'s company names, logos, product and service names, trademarks or services marks or those of GRDN’s licensors'
                  }
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Text Messaging'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                'You agree to allow GRDN to send you informational text (SMS) messages. We send you messages for the purpose of delivering the service and improving your customer experience - for example, if we need to contact you if we are not able to locate your property. You can opt out of receiving the text messages by replying “STOP” after any text message received, but be advised this may impact Services from GRDN to you.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Referral Program & Promotional Codes'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                 'GRDN may, in GRDN’s sole discretion, create referral and/or promotional codes (“Promo Codes”) that may be redeemed for Account credit, or other features or benefits related to the Services and, subject to any additional terms that GRDN establishes on a per promotional code basis. You agree that Promo Codes:'
                 }{' '}
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'must be used for the intended audience and purpose, and in a lawful manner'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                 'may not be duplicated, sold or transferred in any manner, or made available to the general public (whether posted to a public form or otherwise), unless expressly permitted by GRDN;'
                 }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'may only be used for new customers and Accounts, unless expressly permitted by GRDN'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'may be disabled by GRDN at any time for any reason without liability to GRDN'
                  }{' '}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'may only be used pursuant to the specific terms that GRDN establishes for such Promo Code'
                  }{' '}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'are not valid for cash'}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'may expire prior to your use'}
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                'GRDN reserves the right to withhold or deduct credits or other features or benefits obtained through the use of Promo Codes by you or any other user in the event that GRDN determines or believes that the use or redemption of the Promo Code was in error, fraudulent, illegal, or in violation of the applicable Promo Code terms or this Agreement.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'User Provided Content'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                 'GRDN may, in GRDN’s sole discretion, permit you from time to time to submit, upload, publish or otherwise make available to GRDN through the Services textual, audio, and/or visual content and information, including commentary and feedback related to the Services, initiation of support requests, and submission of entries for competitions and promotions (“User Content”). Any User Content provided by you remains your property. By providing User Content to GRDN, however, you grant GRDN a worldwide, perpetual, irrevocable, transferable, royalty-free license, with the right to sublicense, use, copy, modify, create derivative works, distribute, publicly display, publicly perform, and otherwise utilize in any manner such User Content in all formats and distribution channels now known or hereafter devised (including in connection with the Services and GRDN’s business and on third-party sites and services), without further notice to or consent from you, and without the requirement of payment to you or any other person or entity. You represent and warrant that:'
                 }
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'you either are the sole and exclusive owner of all User Content or you have all rights, licenses, consents and releases necessary to grant GRDN the license to the User Content as set forth above'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'neither the User Content nor your submission, uploading, publishing or otherwise making available of such User Content nor GRDN’s use of the User Content as permitted herein will infringe, misappropriate or violate a third party’s intellectual property or proprietary rights, rights of publicity or privacy, or result in the violation of any applicable law or regulation. You agree to not provide User Content that is defamatory, libelous, hateful, violent, obscene, pornographic, unlawful, or otherwise offensive, as determined by GRDN in its sole discretion, whether or not such material may be protected by law. GRDN may, but shall not be obligated to, review, monitor, or remove User Content, at GRDN’s sole discretion and at any time and for any reason, without notice to you.'
                  }
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Beta Services'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  "GRDN sometimes release products and features that we are still testing and evaluating (“Beta Services”). GRDN will inform you of any Beta Services that may become available by identifying them as “beta”, “preview”, “early access”, or “evaluation” (or with words or phrases with similar meanings) and may not be as reliable as GRDN's other services, so please keep that in mind"
                }
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginTop: responsiveHeight(5),
                }}>
                {'3. PAYMENT'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Summary'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You are responsible for all fees associated with your use of GRDN’s Services. We are responsible for communicating those fees to you clearly and accurately. You agree to receive a receipt via email or text or through the GRDN App itself. If a modification or cancellation of Services is necessary, GRDN will notify you of this. You are under no obligation to tip your driver for Services, though we would appreciate it you provided feedback about your experience.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Charges'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You understand that use of the Services may result in charges to you for the services or goods you receive from GRDN (“Charges”). Charges will be inclusive of applicable taxes where required by law. Charges paid by you are final and non-refundable, unless otherwise determined by GRDN. All Charges are due immediately and payment will be facilitated by GRDN using the preferred payment method designated in your Account. If your primary Account payment method is determined to be expired, invalid, or otherwise not able to be charged, you agree that GRDN may use the secondary payment method from your Account, if available. You agree that GRDN will send you a receipt by email or text message, and/or through the application. This electronic receipt is sufficient for all purposes, including any specific requirements under applicable law. If you prefer to receive a paper receipt, please contact support@grdn.online within 30 days of each fill, to request a physical receipt which will be mailed to you at our earliest convenience.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Modifications & Cancellations'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN, at its sole discretion, reserves the right to create, modify, and remove Charges for any or all services or goods obtained through the use of the Services. GRDN may from time to time provide certain users with Promo Codes and discounts that may result in different amounts charged for the same or similar services or goods obtained through the use of the Services. You agree that such Promo Codes and discounts, unless also made available to you, shall have no bearing on your use of the Services or the Charges applied to you. You may elect to cancel your request for Services at any time prior to provision of the Services, in which case you may be charged a cancellation fee.GRDN may, at its sole discretion, elect to not provide a service if GRDN deems it unsafe to do so, or if the requested service would violate an applicable law, code, standard, or procedure. In such an event, the request may be cancelled by GRDN. If the request is cancelled by GRDN, no payment will be charged. The Account holder will be notified'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Gratuities'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'Gratuities are voluntary. You understand and agree that, while you are free to provide additional payment as a gratuity to any driver who provides you with services or goods obtained through the Services, you are under no obligation to do so. After your Services have been completed, we would appreciate that you rate and leave additional feedback about your experience, but you are under no obligation to do so.'
                }
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginTop: responsiveHeight(5),
                }}>
                {'4. DISCLAIMERS, OPERATIONS, SAFETY & LIMITATION OF LIABILITY'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Summary'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'We will not be liable for damages or losses arising from your use or inability to use the Services, or otherwise arising under this Agreement. Please read this section carefully as it limits our obligations to you'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'DISCLAIMERS'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'YOU USE THE GRDN SERVICES AT YOUR OWN RISK. THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” GRDN DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN ADDITION, GRDN MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE REGARDING THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, OR AVAILABILITY OF THE SERVICES OR ANY SERVICES OR GOODS REQUESTED THROUGH THE USE OF THE SERVICES, OR THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE. GRDN DOES NOT GUARANTEE THE QUALITY, SUITABILITY, SAFETY OF SERVICES PROVIDED TO YOU. YOU AGREE THAT THE ENTIRE RISK ARISING OUT OF YOUR USE OF THE SERVICES, AND ANY SERVICE OR GOOD REQUESTED IN CONNECTION THEREWITH, REMAINS SOLELY WITH YOU, TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Ordering Services'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN reserves the right to deliver services to the areas specified by us. Your order will not always be prioritized and will be assigned to a list. GRDN do not commit to a certain time period to fulfil orders. GRDN will maintain to best effort to provide the requested services in a timely manner. We do not commit to fulfilling a specific order based on various reasons. GRDN reserves the right to reject an order.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Service Delivery'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You agree that there could be a variation in quantity ordered and quantity supplied. You will always be billed based on the quantity supplied.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(0.5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN will not be liable for any damage to your property outside of the insurance scope.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(0.5),
                  textAlign: 'justify',
                }}>
                {
                  "GRDN's employees reserve the right to contact you through various channels during the order process"
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(0.5),
                  textAlign: 'justify',
                }}>
                {
                  "GRDN's employees reserve the right to contact you through various channels during the order process"
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(0.5),
                  textAlign: 'justify',
                }}>
                {
                  "GRDN's employees reserve the right to contact you through various channels during the order process"
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(0.5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN will not be liable for any damage to your property outside of the insurance scope.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(0.5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN reserves the right not to service a customer if property details are incorrect and GRDN will reserve the right charge delivery cost.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(0.5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN reserves the right to not deliver if equipment is faulty.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Complete Order'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN reserves the right to send invoice and collect payment for product and service for up to 14 days after service delivery has taken place.'
                }
              </Text>

              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Promotions'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'We reserve the right to cancel or modify a promotion at any time.'
                  }
              </Text>


              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Prices'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'We reserve the right to cancel or modify a price at any time of the product or service.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Cancellation'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'If you cancel a now order ten minutes or more after ordering, GRDN will reserve the right to charge you a cancellation charge up to the delivery charge amount.If you cancel a scheduled or recurrent order two hours or less before delivery, GRDN will reserve the right to charge you a cancellation charge up to the delivery charge amount.In case of multiple cars when cancelling an order the entire order would be cancelled for all the cars within that order and GRDN reserves the right to charge you a cancellation charge up to the delivery charge amount applicable on each service. In case the cancellation is due to a reason from GRDN or GRDN driver, you will not be charged any amount.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Safety'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  "Before any service delivery, it is the sole responsibility of GRDN's driver to ensure that all safety measures are in place and there are no risks to safety. This control must be constant to prevent dangerous situations from arising. To achieve this, GRDN request that you:"
                }
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'Agree to abide by all safety instruction as indicated by the GRDN staff'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'Do not enter a designated exclusion zone as indicated by the GRDN staff (the Designated Exclusion Zone)'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'Make no attempt to operate or handle any of the equipment being used either to deliver the service, or provide a safe environment for the process'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'Do not smoke within the Designated Exclusion Zone;'}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'Do not use a mobile phone or other electronic device within the Designated Exclusion Zone'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'Ensure children and pets are kept under control and do not interfere with equipment or distract the GRDN staff during the maintenance process;'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'Do not interfere in the staff operations in any way as GRDN will reserve the right to lodge a formal complaint.'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'Be respectful to our employees.'}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'GRDN reserves the right to charge delivery charge if the service is not deliverable due to non-compliance to safety requirements'
                  }
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'LIMITATION OF LIABILITY'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, LOST DATA, PERSONAL INJURY, OR PROPERTY DAMAGE RELATED TO, IN CONNECTION WITH, OR OTHERWISE RESULTING FROM ANY USE OF THE SERVICES, EVEN IF GRDN HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. GRDN SHALL NOT BE LIABLE FOR ANY DAMAGES, LIABILITY OR LOSSES ARISING OUT OF YOUR USE OF OR RELIANCE ON THE SERVICES OR YOUR INABILITY TO ACCESS OR USE THE SERVICES. GRDN SHALL NOT BE LIABLE FOR DELAY, FAILURE IN PERFORMANCE, OR OTHER INJURIES RESULTING FROM CAUSES BEYOND GRDN’S REASONABLE CONTROL. FURTHERMORE, GRDN IS NOT LIABLE FOR ANY OTHER INTANGIBLE LOSSES RESULTING FROM:'
                }
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'THE USE OF OR RELIANCE ON THE SERVICES OR YOUR INABILITY TO USE THE SERVICE;'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION OR SERVICES PURCHASED OR OBTAINED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE SERVICE;'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR ACCOUNT OR DATA;'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE'}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'ANY OTHER MATTER RELATING TO GRDN SERVICES.'}
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN ALSO ASSUMES NO LIABILITY OR RESPONSIBILITY FOR A DELAY, FAILURE IN PERFORMANCE, ANY BUGS, VIRUSES, TROJAN HORSES OR THE LIKE THAT BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY AND/OR ANY USER CONTENT OR THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY, OR ANY OTHER INJURY RESULTING FROM CAUSES BEYOND GRDN’S REASONABLE CONTROL.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'THE LIMITATIONS AND DISCLAIMER IN THIS SECTION DO NOT PURPORT TO LIMIT LIABILITY OR ALTER YOUR RIGHTS AS A CONSUMER THAT CANNOT BE EXCLUDED UNDER APPLICABLE LAW.'
                }
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginTop: responsiveHeight(5),
                }}>
                {'5. INDEMNIFICATION'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Summary'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {'You are responsible for your use of the Services.'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Indemnification'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You are responsible for your use of the Services, and you will indemnify and hold GRDN and its officers, directors, employees, consultants, affiliates, subsidiaries, and agents (together, the “GRDN Entities”) from and against any and all claims, demands, losses, liabilities, and expenses (including attorneys’ fees), arising out of or in any way connected with:'
                }
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'your access to, use of, or alleged use of, the Services or services or goods obtained through your use of the Services'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'your breach or violation of any of these Terms, any representation, warranty, or agreement referenced in these Terms, or any applicable law or regulation;'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'GRDN’s use of your User Content;'}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {
                    'your violation of the rights of any third party, including any intellectual property right or publicity, confidentiality, other property, or privacy, right'
                  }
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'any dispute or issue between you and any third party.'}
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you (without limiting your indemnification obligations with respect to that matter), and in that case, you agree to cooperate with our defense of that claim.'
                }
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginTop: responsiveHeight(5),
                }}>
                {'6.  DATA PRIVACY AND SECURITY'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You hereby consent to the collection and/or processing of your personal data by GRDN. GRDN is committed to protecting the personal data that GRDN receives from you, or otherwise processes, in the course of or in connection with the Services. GRDN will take commercially reasonable and appropriate technical and organizational measures to protect your personal data against unauthorized access, accidental loss or damage and unauthorized destruction. The security provided by GRDN shall be in accordance with good industry practices relating to protection of the types of data typically processed in the Services by GRDN customers. You shall act as the data controller in respect of any and all personal data contained in the account. GRDN shall act as the data processor in respect of any processing by it of personal data contained within the account on your behalf, and shall process such personal data in accordance with this Agreement. You hereby consent to the processing of your data by GRDN. You acknowledge and agree that GRDN may in connection with the Services engage third party sub-processors, who may be based in, or may process, access or have access to personal data in or from, jurisdictions outside the UAE. GRDN will execute written contracts with such sub-processors which impose on sub-processors data privacy and security terms and obligations materially equivalent to the terms and obligations hereof. '
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN agrees to comply and have adequate measures in place to ensure that its staff comply at all times with the provisions and obligations contained in local and international privacy laws that may apply including the Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons (General Data Protection Regulation), if and where applicable. '
                }
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginTop: responsiveHeight(5),
                }}>
                {'7.  DISPUTE RESOLUTION'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Summary'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You agree to binding arbitration which means that you waive your right to have a judge potentially hear your claim and instead agree to neutral third party, an arbitrator, hear both sides and decide upon the claim. You also waive your right to be in a class action suit.Please read this section carefully as it limits the manner in which you can seek relief from GRDN.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Process'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  "You and GRDN ('Parties') agree that we will attempt in good faith to resolve any dispute or claim arising out of or in relation to this Agreement through negotiations between a director of each of the Parties with authority to settle the relevant dispute. If the dispute cannot be settled amicably within fourteen (14) days from the date on which either Party has served written notice on the other of the dispute then the remaining provisions of this arbitration clause shall apply."
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  "Any dispute, conflict, claim or controversy arising out of or broadly in connection with or relating to the GRDN Platform, or this Agreement, including those relating to its validity, its construction or its enforceability (any “Dispute”) shall be exclusively and finally resolved by arbitration under the Rules of Arbitration of the International Chamber of Commerce (“ICC Arbitration Rules”). The ICC Rules' Emergency Arbitrator provisions are excluded. The Dispute shall be resolved by one (1) arbitrator to be appointed in accordance with the ICC Rules. The place of arbitration shall be Dubai, UAE. The language of arbitration shall be English. The existence and content of the arbitration proceedings, including documents and briefs submitted by the parties, correspondence from and to the International Chamber of Commerce, correspondence from the arbitrator, and correspondence, orders and awards issued by the sole arbitrator, shall remain strictly confidential and shall not be disclosed to any third party without the express written consent from the other party unless: (i) the disclosure to the third party is reasonably required in the context of conducting the arbitration proceedings; and (ii) the third party agrees unconditionally in writing to be bound by the confidentiality obligation stipulated herein.              "
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Governing Law'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'This Agreement is governed by and construed in accordance with the laws of the federal laws of the United Arab Emirates and the local laws as applicable in a specific Emirate where the Services are provided.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'NO CLASS ACTION'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'YOU AND GRDN AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you and GRDN agree otherwise in writing, the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of a representative or class proceeding.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Changes'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'If GRDN makes any future change to this arbitration provision, other than a change to GRDN’s address for Notice, you may reject the change by sending us written notice within 30 days of the change to GRDN’s address for Notice, in which case your account with GRDN will be immediately terminated and this arbitration provision, as in effect immediately prior to the changes you rejected will survive.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Survival'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'This arbitration clause shall survive the termination or expiry of this Agreement'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Notice'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'GRDN may give notice by means of a general notice on the Services, electronic mail to your email address in your Account, or by written communication sent by first class mail or pre-paid post to your address in your Account. Such notice shall be deemed to have been given upon the expiration of 48 hours after mailing or posting (if sent by first class mail or pre-paid post) or 12 hours after sending (if sent by email). You may give notice to GRDN, with such notice deemed given when received by GRDN, at any time by first class mail or pre-paid post to GRDN LTD., Attn: Legal, One Mayfair Place, London W1A 8AJ, UK.'
                }
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginTop: responsiveHeight(5),
                }}>
                {'8.  GENERAL PROVISIONS'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Summary'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'Neither you nor GRDN may transfer your obligations under this Agreement to anyone else without written consent'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Provisions'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'You may not assign this Agreement without GRDN’s prior written approval. GRDN may assign these Terms without your consent to:'
                }
              </Text>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'a subsidiary or affiliate;'}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'an acquirer of GRDN’s equity, business or assets; '}
                </Text>
              </View>
              <View
                style={{marginTop: responsiveHeight(5), flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(1.4),
                    width: responsiveHeight(1.4),
                    borderRadius: responsiveHeight(1.4),
                    backgroundColor: '#000',
                  }}
                />
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    color: '#212121',
                    textAlign: 'justify',
                  }}>
                  {'a successor by merger.'}
                </Text>
              </View>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'Any purported assignment in violation of this section shall be void. No joint venture, partnership, employment, or agency relationship exists between you, GRDN as a result of this Agreement or use of the Services. If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law. GRDN’s failure to enforce any right or provision in these Terms shall not constitute a waiver of such right or provision unless acknowledged and agreed to by GRDN in writing.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Entire Agreement'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'This Agreement contains the entire agreement between you and GRDN regarding the use of the Service. If any provision of this Agreement is held invalid, the remainder of this Agreement shall continue in full force and effect. The failure of the Company to exercise or enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision. You agree that your GRDN account is non-transferable and all of your rights to your account and its Content terminate upon your death. No agency, partnership, joint venture or employment is created as a result of this Agreement and you may not make any representations or bind GRDN in any manner.'
                }
              </Text>
              <Text
                style={{
                  color: '#212121',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                  marginTop: responsiveHeight(5),
                }}>
                {'Contacting GRDN'}
              </Text>
              <Text
                style={{
                  color: '#212121',
                  marginTop: responsiveHeight(5),
                  textAlign: 'justify',
                }}>
                {
                  'If you have any questions about these Terms of Service, the practices of GRDN, or your dealings with GRDN, you may contact us at  legal@grdn.online'
                }
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default TermsConditions;
