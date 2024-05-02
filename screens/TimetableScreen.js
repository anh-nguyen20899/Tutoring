import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, FlatList, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const date = [
    {weekday: 'Monday', date: new Date()},
    {weekday: 'Tuesday', date: new Date()},
    {weekday: 'Wednesday', date: new Date()},
    {weekday: 'Thursday', date: new Date()},
    {weekday: 'Friday', date: new Date()},
];
const todos = [
    {'id': 1, 'day': 'Monday', 'startTime': '7:00', 'title': 'Math', 'endTime': '8:20', 'details': 'Learning Algebra'},
    {'id': 2, 'day': 'Monday', 'startTime': '10:40', 'title': 'English', 'endTime': '13:20', 'details': 'Expanding Vocabularies'},
    {'id': 3, 'day': 'Tuesday', 'startTime': '13:00', 'title': 'Biology', 'endTime': '15:40', 'details': ''}
];
const Item = ({item}) => {
    return (
        <View key={item.id} style={[styles.itemRow, {padding: 10}]}> 
            <TouchableOpacity>
                {/* <Text style={styles.innerText}> {item.weekday}</Text> */}
                <View>
                        {todos.map((todo, index) => (
                            <TouchableOpacity key={index}>
                                <View key={todo.id} style={{backgroundColor: (todo.id % 2 == 0) ? 'darkorange': 'red', flexDirection: 'column', padding: 10}}>
                                    <Text>{todo.id}</Text>
                                    <View>
                                        <Text style={styles.innerText}> {todo.startTime} {todo.title}</Text>
                                        <Text style={styles.innerText}> {todo.endTime} {todo.details}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            
                        )             
                    )}
                </View>
            </TouchableOpacity>
        </View>
      )
};

const renderItem = ({item, index}) => (
    <Item item={item}/>
);

const TimetableScreen = ({navigation}) =>
{
    
    const flatListRef = useRef(null);
    const onPressBtn = (index) => {
        flatListRef.current.scrollToIndex({index, animated: true});
    };
    return (
        <View
                style={[
                styles.container
                ]}>
                <View style={{backgroundColor: 'white', height:50}} >
                    <Text style={styles.baseText}> My TimeTable </Text>                  
                </View>
                <View>
                {date.map((d, index) => (
                    <TouchableOpacity style={styles.datetime} key={index}  onPress={() => onPressBtn(index)}>
                        <Text style={styles.btnText}> {d.weekday}</Text>
                    </TouchableOpacity>
                )
                )}
                </View>
                <FlatList
                    data={date} 
                    ref={flatListRef}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
                {/* <Button onPress={() => navigation.navigate("Todo")}>
                    <Text>Add</Text>
                </Button> */}
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
        color: 'black',
        fontSize: 18
    },
    itemRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        marginHorizontal: -1,
    },
    datetime: {
        flexWrap: 'nowrap',
        justifyContent: 'center'
    },
    btnText: {

    },
    item: {
        flex: 1,
        height: 40,
        marginHorizontal: 4,
        paddingVertical: 4,
    }
    }
)
export default TimetableScreen;