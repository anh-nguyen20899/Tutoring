import React, {useRef,useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, SafeAreaView, TextInput, FlatList, Button, Modal, Pressable, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const date = [
    {weekday: 'Monday', date: new Date()},
    {weekday: 'Tuesday', date: new Date()},
    {weekday: 'Wednesday', date: new Date()},
    {weekday: 'Thursday', date: new Date()},
    {weekday: 'Friday', date: new Date()},
    {weekday: 'Saturday', date: new Date()},
];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimetableScreen = ({}) =>
{
    const [todos, setTodos] = useState([]);
    const navigation = useNavigation();
    const fetchSchedules = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://ict729.fly.dev/api/schedules', {
                    headers: {
                    "Authorization": `Bearer ${token}`,
                }
              });
            const json = await response.json();
            
              // Filter
            const allowed = ['mon', 'tue', 'wed', 'thu','fri', 'sat'];
            const filtered = Object.keys(json)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                return {
                ...obj,
                [key]: json[key]
                };
            }, {});

            // Second filter
            var result = [];
            for (let key in filtered) {
                if (filtered.hasOwnProperty(key)) {
                  const obj = {};
                  obj[key] = filtered[key];
                  result.push(obj);
                }
              }
            
            // Third filter 
            const daysToFilter = ["mon", "tue", "wed", "thu", "fri", "sat"];
    
            // Filter the array to get only the elements starting from index 1 for the specified days
            const filteredData = result.filter((item) => {
            const key = Object.keys(item)[0]; // Get the key (e.g., "mon", "tue", etc.)
            return daysToFilter.includes(key); // Check if the key is in the specified days
            }).map((item) => {
            const key = Object.keys(item)[0]; // Get the key again
            return { [key]: item[key].slice(1) }; // Return a new object with the key and value starting from index 1
            });
            
    
            // Final filter
            // Flatten the array and map it to the desired format
            let idCounter = 0; 
            const transformedData = filteredData.flatMap((item, index) => {
            const key = Object.keys(item)[0]; // Get the day name (e.g., "mon", "tue", etc.)
            const day = daysToFilter[index]; // Get the corresponding day name
            const objects = item[key].map((obj, id) => ({ id: ++idCounter, day, startTime: obj.startTime, endTime: obj.endTime,
                title: obj.title, description: obj.description, _id: obj._id
            }));
                return objects;
            });
            // console.log(typeof transformedData);
            
            // Convert to Array
            const dataArray = Object.values(transformedData);
            const todosWithDay = dataArray.map((todo) => {
                if (typeof todo.startTime === 'string') {
                    var dayOfWeek = new Date(todo.startTime);
                    return {
                        ...todo,
                        day:  weekdays[dayOfWeek.getDay()]
                        // startTime: (new Date(todo.startTime)).toLocaleTimeString(),
                        // endTime: (new Date(todo.endTime)).toLocaleTimeString()
                    };
                }
                return todo;
            });
            // console.log(todosWithDay);
            setTodos(todosWithDay);
            
            }
            catch (error) {
            console.error(error);
            } finally {
            
            }
    }
    useEffect(() => {
        fetchSchedules();
    }, []);
    const flatListRef = useRef(null);
    const [modalData, setModalData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [name, setName] = useState();
    const [details, setDetails] = useState();
    const [id, setId] = useState(0);
    const [count, setCount] = useState(0);
    const onChangeStartTime = (e, selectedDate) => {
        if (e.type === "set") {  // Only set the date if the user confirmed
            const currentDate = selectedDate || startTime;
            setShowStartTimePicker(false);
            if (currentDate >= endTime) {
            Alert.alert("Validation Error", "Start time must be less than end time.");
            } else {
            setStartTime(currentDate);
            }
        } else {
            setShowStartTimePicker(false);
        }

    };
    const onChangeEndTime = (e, selectedDate) => {
        if (e.type === "set") {  // Only set the date if the user confirmed
            const currentDate = selectedDate || endTime;
            setShowEndTimePicker(false);
            if (currentDate <= startTime) {
            Alert.alert("Validation Error", "End time must be greater than start time.");
            } else {
            setEndTime(currentDate);
            }
        } else {
            setShowEndTimePicker(false);
        }
    };
    const handleSubmit = () => {
        if (startTime >= endTime) {
          Alert.alert("Validation Error", "Start time must be less than end time.");
        } else if (!name.trim() || !details.trim()) {
            Alert.alert("Validation Error", "Name and Detail fields cannot be empty.");
          } else {
            sendTodo();
            // Alert.alert("Success", `Form submitted!\nName: ${name}\nDetail: ${details}\nStart Time: ${formatTime(startTime)}\nEnd Time: ${formatTime(endTime)}`);         
          }
    };
    const handleDelete = async () => {
        try {   
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`https://ict729.fly.dev/api/schedules/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                });
                const json = await response.json();
                // console.log(updatedTodo);
                const updatedTodos = todos.map((todo) =>
                    todo._id == id ? {} : todo
                  );
                // console.log(updatedTodos);
                setTodos(updatedTodos);
                if(json) {
                    Alert.alert("Success", `Delelted!\nName: ${name}\nDetail: ${details}\nStart Time: ${startTime}\nEnd Time: ${endTime}`);
                    setModalVisible(false);
                }
        }
        catch (error) {
            console.error(error);
        } finally {               
        }
    };
    const sendTodo = async() => {
        try {
            const start = new Date(startTime);
            const end = new Date(endTime);
            const startTimeISO = start.toISOString();
            const endTimeISO = end.toISOString();
            const token = await AsyncStorage.getItem('token');
            const data = {
                "title": name,
                "startTime": startTimeISO,
                "endTime": endTimeISO,
                "status": "planned",
                "description": details
            }   
                const response = await fetch(`https://ict729.fly.dev/api/schedules/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
                });
                const json = await response.json();
                // console.log(json);
                const dayOfWeek = new Date(json.startTime);
                const updatedTodo = {
                     "_id": json._id,
                     "day": weekdays[dayOfWeek.getDay()],
                     "description": json.description,
                      "endTime": json.endTime,
                      "id": count,
                      "startTime": json.startTime,
                       "title": json.title
                }
                // console.log(updatedTodo);
                const updatedTodos = todos.map((todo) =>
                    todo._id == updatedTodo._id ? updatedTodo : todo
                  );
                // console.log(updatedTodos);
                setTodos(updatedTodos);
                if(json) {
                    Alert.alert("Success", `Form Updated!\nName: ${name}\nDetail: ${details}\nStart Time: ${startTime}\nEnd Time: ${endTime}`);
                    setModalVisible(false);
                }
        }
        catch (error) {
            console.error(error);
        } finally {               
        }
    }
    const formatTime = (date) => {
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      };
    const handleName = (text) => {
        setName(text);
    };
    const handleDetails = (text) => {
        setDetails(text);
    };
    const onPressBtn = (index) => {
        flatListRef.current.scrollToIndex({index, animated: true});

    };
    const openSettingsModal = (todo) => {
        setModalVisible(true);
        setModalData(todo);
        setName(todo.title);
        setName(todo.title);
        setDetails(todo.description);
        setStartTime(todo.startTime);
        setEndTime(todo.endTime);
        setId(todo._id);
        setCount(todo.id);
    }
    const Item = ({weekday, date}) => {
        return (
            <View key={weekday} style={[styles.itemRow, {padding: 10}]}> 
                <TouchableOpacity>
                    <Text style={styles.innerText}> {weekday}</Text>
                    <View>
                            {todos.map((todo, index) => (
                                <TouchableOpacity key={index} onPress={() => openSettingsModal(todo) }>
                                    <View key={todo.id} style={{backgroundColor: (todo.id % 2 == 0) ? 'darkorange': 'red', 
                                        flexDirection: 'column', 
                                        width: 350,
                                        padding: 6,
                                        display: (todo.day === weekday) ? 'block': 'none'}}>
                                        {/* <Text>{todo.eventID}</Text> */}
                                        <View>
                                            <Text style={styles.innerText}> {(new Date(todo.startTime)).toLocaleTimeString()} {todo.title}</Text>
                                            <Text style={styles.innerText}> {(new Date(todo.endTime)).toLocaleTimeString()}</Text>
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
    const renderItem = ({item}) => (
        <Item key={item.date} weekday={item.weekday} startTime={item.startTime} endTime={item.endTime}/>
    );
    return (
        <View
                style={[
                styles.container
                ]}>
                <View style={{backgroundColor: 'white', height:50}} >
                    <Text style={styles.baseText}> My TimeTable </Text>                  
                </View>
                <View style={styles.datetime}>
                {date.map((d, index) => (
                    <TouchableOpacity style={styles.datetime} key={index}  onPress={() => onPressBtn(index)}>
                        <Text style={styles.btnText}>{d.weekday}</Text>
                    </TouchableOpacity>
                )
                )}
                </View>
                <FlatList
                    data={date} 
                    ref={flatListRef}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.weekday}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
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
                        <View style={styles.displayTime}>
                            <SafeAreaView style={styles.time}>
                                <Text style={styles.text} >Start Time: {(new Date(startTime)).toLocaleTimeString()}</Text>
                                <Button onPress={() => setShowStartTimePicker(true)} title="Pick Start Time" />
                                {showStartTimePicker && (
                                    <DateTimePicker
                                        value={new Date(startTime)}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeStartTime}
                                    />
                                )}
                            </SafeAreaView>
                                <Text> - </Text>
                            <SafeAreaView style={styles.time}>              
                                <Text style={styles.text} >End Time: {(new Date(endTime)).toLocaleTimeString()}</Text>
                                <Button onPress={() => setShowEndTimePicker(true)} title="Pick End Time" />
                                {showEndTimePicker && (
                                    <DateTimePicker
                                    value={new Date(endTime)}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeEndTime}
                                    />
                                )}
                            </SafeAreaView>
                        </View>
                            <SafeAreaView>
                                <Text style={styles.modalText}> Activity Name: </Text>
                                <TextInput
                                    style={styles.modalText}
                                    onChangeText={handleName}
                                    value={name}
                                />
                            </SafeAreaView>
                            <SafeAreaView>
                                <Text style={styles.modalText}> Activity Details: </Text>
                                <TextInput
                                    style={styles.modalText}
                                    onChangeText={handleDetails}
                                    value={details}
                                />
                            </SafeAreaView>
                            <Pressable style={[styles.button, styles.buttonClose]}onPress={handleSubmit} >
                                <Text style={styles.text}>Update</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.buttonClose]}onPress={handleDelete} >
                                <Text style={styles.text}>Delete</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
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
    text: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
      },
    datetime: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    time: {
        flexDirection: 'column', 
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginVertical: 20,
    },
    displayTime: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 15,
        textAlign: 'center',
    },
    item: {
        flex: 1,
        height: 40,
        marginHorizontal: 4,
        paddingVertical: 4,
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
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
    }
)
export default TimetableScreen;