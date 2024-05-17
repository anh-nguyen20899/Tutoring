import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchBar from './SearchBar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CourseScreen = () =>
{
    const [courses, setCourses] = useState([
        {subjectCode: 'Math203', courseName: 'Math Algebra'},
        {subjectCode: 'Math204', courseName: 'Math Geometry'},
        {subjectCode: 'Math205', courseName: 'Math Subtraction'},
    ]);
    const Item = ({item, index}) => (
        <View key={item._id} style={[styles.itemRow, {padding: 10}]}> 
            <TouchableOpacity style={styles.item} key={index}>
                <Text style={styles.innerText}> {item.subjectCode}: {"\n"} </Text>
                <Text style={styles.innerText}> {item.courseName}: {"\n"} </Text>
            </TouchableOpacity>
        </View>
      );
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
                    <SearchBar />
                </View>
                <FlatList
                    data={courses} 
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
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
    }
    }
)
export default CourseScreen;