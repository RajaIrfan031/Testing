import React, {useState} from 'react'
import { View, Image, SafeAreaView, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Linking, Modal, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from "react-native-image-viewing";
import { 
    Avatar,
    Title,
    ActivityIndicator,
    
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {url} from '../../constants/constant';

const ClientInfoComponent = ({client_info}) => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [imagesList, setImagesList] = useState([]);
    const [isImage, setIsImage] = useState(false);
    const [visible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUpoading] = useState(false);
    const [isCamera, setIsCamera] = useState(false);

    const openMap = (url) => {
    try{
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          });
        }
        catch (e){
            console.log("errrr...!");
        }
    }

    const handleUplaodFromGallery = () => {
      ImagePicker.openPicker({
        multiple: true
      }).then(images => {
            let tempImages = [];
            images.forEach(image => {
              tempImages.push(image.path)
            });
            setImagesList(tempImages);
            setModalVisible(false);
            setIsImage(true);
        });
      }
    
    const handleUplaodFromCamera = () => {
        launchCamera({maxWidth: 500, maxHeight: 500, mediaType: 'photo'}, response=>{
          if(response.didCancel){
            return;
          }
          else {
            let tempImages = [];
            tempImages.push(response.uri);
            setIsCamera(true);
            setImagesList(tempImages);
            setModalVisible(false);
            setIsImage(true);
            console.log(imagesList);
        }
        });
      }

    showAlert = () => {
      console.log("shwo alert!");
      Alert.alert(
        "Uploaded",
        "Image is successfully uploaded.",
        [
            {
            text: "Okay",
            onPress: () => console.log("Okay Pressed"),
            style: "cancel"
            },
        ]
        );
    }

    const uploadImages = async(agentId, jobId) => {

      const form = new FormData();

      setIsLoading(true);

      form.append("agentId", agentId);
      form.append("jobId", jobId);

      imagesList.forEach(element => {
        console.log("upl", element);
        form.append("image_path",{
          uri: element,
          type: 'image/jpg',
          name: 'image.jpg',
        })
      });
      setIsUpoading(true);
      console.log(form);

      await fetch(url+'/uploadTasksImages',{
        headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        },
        method: 'POST',
        body: form
    }).then((response) => {
        response.text().then((res) => {
          setIsUpoading(false);
          showAlert();
          });
        })
        .catch((error) => {
          setIsUpoading(false);          
        console.log(error, "Image is not uploaded");
        });
    }

      const showImages = () => {
      return imagesList.map((img, index) => {
          return <Image source={{uri: img }} key={index} style={styles.image}/>;
        });
      }

    return (
        <View style={{borderBottomWidth: 1,borderBottomColor: '#dddddd', marginBottom: 5}}>
            {
            client_info.map(({client_name, client_image_uri, client_address, jobValue, index, clientGoogleMapAddress,jobDescription, agentId, jobId})=>
                <ScrollView key={index}>
                    <View style={styles.mainRow}>
                        <View style={[styles.row],{width: '25%',marginLeft: 5}}>
                            <Avatar.Image source={{
                                uri: client_image_uri
                            }}
                            />
                            <Text style={{fontWeight: 'bold' }}>{client_name}</Text>
                        </View>
                        <View style={[styles.column],{width: '75%'}}>
                            <Title>Client's Address: </Title>
                            <Text>{client_address}</Text>
                            <Title>Task Value: </Title>
                            <Text style={{ fontSize: 16}}>{jobValue} Dirham</Text>
                            <Title>Task Description: </Title>
                            <Text style={{ fontSize: 16,marginBottom: 5}}>{jobDescription}</Text>
                        </View>
                    </View>
                    <View style={[styles.container]}>
                        <View style={{marginLeft: 10,paddingTop: 24,paddingLeft: 16,alignItems: 'center', marginBottom: 20}}>
                            <TouchableOpacity style={styles.mapButton} onPress={()=> {
                              openMap(clientGoogleMapAddress)
                              }}>
                                <View style={{flexDirection: 'row'}}>
                                  <Icon name="google-maps" size={24} color="#ffffff"/>
                                  <Text style={styles.mapText}>Open Address</Text>                                  
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft: 10,paddingTop: 24,paddingLeft: 16,alignItems: 'center', marginBottom: 20}}>
                            <TouchableOpacity style={styles.mapButton} onPress={()=> setModalVisible(true)}>
                                {/* <Text style={styles.mapText}>Upload Photos</Text> */}
                                <View style={{flexDirection: 'row'}}>
                                  <Icon name="image-multiple" size={24} color="#ffffff"/>
                                  <Text style={styles.mapText}>Upload Photos</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Text style={styles.modalText}>Upload From!</Text>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleUplaodFromCamera}
                          >
                            <Text style={styles.textStyle}>Camera</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleUplaodFromGallery}
                          >
                          <Text style={styles.textStyle}>Gallery</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(false)}
                          >
                            <Text style={styles.textStyle}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                        {/* <View style={{marginLeft: 5,width: '45%'}}>
                            <TouchableOpacity style={styles.mapButton}>
                                <Text style={styles.mapText}>Upload Photos of this Task</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                  {isImage ? 
                  <View>
                    {/* <Text>HelloDarling</Text>
                    <ImageView
                    images={imagesList}
                    imageIndex={0}
                    visible={visible}
                    onRequestClose={() => setIsVisible(false)}
                  /> */}
                  <ScrollView horizontal={true}>
                    {
                      showImages()
                    }
                  </ScrollView>
                  <View style={{marginLeft: 10,paddingTop: 8,paddingLeft: 16,alignItems: 'center', marginBottom: 20}}>
                            <TouchableOpacity style={[styles.mapButton]} onPress={()=> uploadImages(agentId, jobId)}>
                            { isUploading ? 
                              <ActivityIndicator size={24} color='#ffffff' style={{width: 80}} />
                              :
                              <View style = {{flexDirection: 'row',marginLeft: 10}}>
                                  <MaterialCommunityIcons name="cloud-upload" color='#ffffff' size={24} />
                                      <View style={{marginLeft: 15,marginTop: 3}}>
                                          <Text style={styles.itemText}>Upload</Text>
                                      </View> 
                              </View>
                            }
                            </TouchableOpacity>
                        </View>
                  </View>
                  : <Text></Text>
                  }
                </ScrollView>
            )
            }
        </View> 
    );
}

const styles = StyleSheet.create({
    mainRow: {
        flexDirection: 'row', 
        marginTop: 5,
        paddingHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        marginTop: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    mapButton: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#006600',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16
    },
    mapText: {
        color: '#fff',
        fontSize: 16,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        color: '#006600',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        margin: 5,
        width: 150,
        },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      image: {
        width: 80,
        height: 80,
        margin: 16,
        resizeMode: 'contain',
      },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
      },
      itemText: {
          fontSize: 16,
          color: '#ffffff',
          fontWeight: 'bold'
      },
      
}
);

export default ClientInfoComponent;
