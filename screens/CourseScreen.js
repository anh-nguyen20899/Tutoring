import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchBar from './SearchBar';
const subjects = [
    {subjectCode: 'Math203', courseName: 'Math Algebra'},
    {subjectCode: 'Math204', courseName: 'Math Geometry'},
    {subjectCode: 'Math205', courseName: 'Math Subtraction'},
];
const Item = ({item}) => (
    <View key={item.id} style={[styles.itemRow, {padding: 10}]}> 
        <View style={styles.item}>
            <Text style={styles.innerText}> {item.subjectCode}: {"\n"} </Text>
            <Text style={styles.innerText}> {item.courseName} {"\n"} </Text>
        </View>
    </View>
  );
const renderItem = ({item}) => (
    <Item item={item}/>
  );
const CourseScreen = () =>
{
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
                    data={subjects} 
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
        height: 300,
    },
    item: {
        flex: 1,
        marginHorizontal: 4,
        padding: 4,
        borderWidth: 1,
        backgroundColor: '#4d79ff',
        borderColor: '#b3d1ff',
        borderRadius: 8
    }
    }
)
export default CourseScreen;