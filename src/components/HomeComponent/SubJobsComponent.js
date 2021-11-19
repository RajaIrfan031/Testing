import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class SubJobsComponent extends Component {
    
    goCallBack = (navigateTo, jobId) => {
        this.props.handleCallBack(navigateTo, jobId)
    }

    render() {
        const {sub_jobs_fields} = this.props;
        const {navigation} = this.props;
        return (
            <View style={{flexDirection: 'row',flexWrap: 'wrap',flex: 1}}>
                {
                    sub_jobs_fields.map(({type, icon, title, no_of_jobs, onPress, navigateTo, index, startedJob}) => 
                    type== true ? 
                        <View key={title} style={{ padding: 20}}>
                            <TouchableRipple style={styles.component} onPress={ () => {this.goCallBack(navigateTo, '1')}}>
                                <>
                                <View style={styles.tag} >
                                    <Text style={styles.tagText}>{title}</Text>
                                </View>
                                <View style={styles.row}>
                                    <MaterialCommunityIcons name={icon} size={60} style={{color: '#ffffff'}}/>
                                    <Text style={styles.jobText}>{no_of_jobs}</Text>
                                </View>
                                </>
                            </TouchableRipple>
                        </View>
                        : <View></View>
                    // :
                    // <View key={title} style={{ padding: 20}}>
                    //         <TouchableRipple style={styles.component} onPress={() => {this.goCallBack("ShowTaskScreen", startedJob.jobId)}}>
                    //             <>
                    //             <View style={styles.tag} >
                    //                 <Text style={styles.tagText}>{title}</Text>
                    //             </View>
                    //             <View style={{}}>
                    //                 <Text style={styles.currentJobText}>Client ID: {startedJob.jobId}</Text>
                    //                 <Text style={styles.currentJobNameText}>Task: {startedJob.jobName}</Text>
                    //                 <Text style={styles.currentJobText}>Schedule: <Text style={styles.currentJobNameText}>{startedJob.startDate}</Text></Text>
                    //             </View>
                    //             </>
                    //         </TouchableRipple>
                    //     </View>
                    )
                }
            </View>
            );
        }
    }
const styles = StyleSheet.create({
 
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        borderRadius: 20,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    component: {
        backgroundColor: '#006600', 
        width: 160,
        borderRadius: 10,
        padding: 10
    },
    tag: {
        backgroundColor: '#ffffff',
        height: 30,
        justifyContent: 'center',
        borderRadius: 4,
    },
    tagText: {
        color: '#006600',
        fontSize: 16,
        alignSelf: 'center',
    },
    jobText: {
        color: '#ffffff',
        fontSize: 36,
        marginLeft: 10
    },
    title: {
        color: 'yellow',
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 5
    },
    currentJobText: {
        color: '#ffffff',
        fontSize: 16,
       
    },
    currentJobNameText: {
        color: '#ffffff',
        fontSize: 12,
       
    }
});

export default SubJobsComponent;
