import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, Modal, Pressable} from 'react-native';
import SearchBar from './SearchBar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CourseScreen = () =>
{
    const [courses, setCourses] = useState([
        {subjectCode: 'Math203', courseName: 'Math Algebra'},
        {subjectCode: 'Math204', courseName: 'Math Geometry'},
        {subjectCode: 'Math205', courseName: 'Math Subtraction'},
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const Item = ({item, index}) => (
        <View key={item._id} style={[styles.itemRow, {padding: 10}]}> 
            <TouchableOpacity style={styles.item} key={index} onPress={() => openSettingsModal(item) }>
                <Text style={styles.innerText}> {item.subjectCode}: {"\n"} </Text>
                <Text style={styles.innerText}> {item.courseName}: {"\n"} </Text>
            </TouchableOpacity>
        </View>
      );
      const openSettingsModal = (todo) => {
        setModalVisible(true);
    }
    const renderItem = ({item, index}) => (
        <Item item={item} index={index}/>
      );
    const getCourses = async () => {
        try {
          const response = await fetch('http://192.168.97.168:3000/api/courses');
          const json = await response.json();
        //   console.log(todosWithDay);
        setCourses(json);
          }
        catch (error) {
          console.error(error);
        } finally {
          
        }
    };
    useEffect(() => {
        getCourses();
    }, []);
    return (
        <View
                style={[
                styles.container
                ]}>
                <View style={{backgroundColor: 'white'}} >
                    <Text style={styles.baseText}> My Courses </Text>
                    {/* <SearchBar /> */}
                </View>
                <FlatList
                    data={courses} 
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare at felis ac dictum. Curabitur vitae rutrum lectus, in egestas ex. Etiam ornare bibendum nisl, id lobortis odio volutpat at.
                                </Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Hide</Text>
                                </Pressable>
                            </View>
                        </View>
                </Modal>
        </View>
        
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',

    },
    innerText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    itemRow: {
        alignItems: 'flex-start',
        justifyContent:'space-between',  
        height: 250,
    },
    item: {
        flex: 1,
        marginHorizontal: 4,
        padding: 4,
        width: 200,
        borderWidth: 1,
        backgroundColor: '#4d79ff',
        borderColor: '#b3d1ff',
        borderRadius: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
    }
)
export default CourseScreen;