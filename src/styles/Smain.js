import { StyleSheet, Dimensions} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
import {widthToDP,heightToDP} from '../screens/Responsive';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import normalize from 'react-native-normalize';
const {width, fontScale}=Dimensions.get("window");
const styles = StyleSheet.create({
    
      container:{
        flex:1,
        backgroundColor: 'white',
        
      },
      container1:{
        
        backgroundColor: 'white',
        height: normalize(80),
      },
      grdnlogo:{
        flex: 1,
        aspectRatio:1.8 , 
        resizeMode: 'contain',
        bottom:normalize(-20),
        left:normalize(30),
      },
      gtstrt1:{
        color:'#E93F1A',
        fontSize: 20,
        fontFamily:"arial",
        left:normalize(30),
        top:normalize(15),
      },
      gtstrt2:{
        color:'black',
        fontSize: 16,
        fontWeight:'300',
        left:normalize(30),
        top:normalize(25),
        maxWidth:normalize(320),
       
       },
       boxloginbtn:{

        top:normalize(15),
        maxWidth:normalize(400),
        
       },
      
       fbloginbtn:{
        marginTop:30,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10, 
        width: '100%',
        
        maxWidth:'85%',
      },
      googleloginbtn:{
        marginTop:15,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10, 
        width: '100%',
        
        maxWidth:'85%',
      },
      appleloginbtn:{
        marginTop:15,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10, 
        width: '100%',
        backgroundColor: 'black',
        maxWidth:'85%',
      },
      emailloginbtn:{
        marginTop:15,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10, 
        width: '100%',
        backgroundColor:'#357EC7',
        maxWidth:'85%',
        
      },
      mobileloginbtn:{
        marginTop:15,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10, 
        width: '100%',
        backgroundColor:'#348017',
        maxWidth:'85%',
        
      },
      signuptxt:{
        color:'black',
        fontSize: 16,
        fontWeight:'300',
        marginLeft:30,
        marginTop:10,
        maxWidth:'90%',
       },
       signuptxt1:{
        color:'#006600',
        fontSize: 16,
        fontWeight:'700',
        marginLeft:203,
        marginTop:-20,
        maxWidth:'90%',
       },
 });
 export default styles;