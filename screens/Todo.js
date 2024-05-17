import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TextInput, Button, Pressable, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Todo = (props) =>
{
    const date = new Date();
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');

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
    const sendTodo = async() => {
        try {
            const startTimeISO = startTime.toISOString();
            const endTimeISO = endTime.toISOString();
            const token = await AsyncStorage.getItem('token');
            const data = {
                "title": name,
                "startTime": startTimeISO,
                "endTime": endTimeISO,
                "status": "planned",
                "description": details
            }   
            // console.log(startTimeISO, endTimeISO); 
                const response = await fetch('https://ict729.fly.dev/api/schedules', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
                });
                const json = await response.json();
                if(json) {
                    Alert.alert("Success", `Form submitted!\nName: ${name}\nDetail: ${details}\nStart Time: ${formatTime(startTime)}\nEnd Time: ${formatTime(endTime)}`);
                    setName('');
                    setDetails('');
                    setStartTime(new Date());
                    setEndTime(new Date());
                }
        }
        catch (error) {
            console.error(error);
        } finally {               
        }
    }
    const handleName = (text) => {
        setName(text);
    };
    const handleDetails = (text) => {
        setDetails(text);
    };
    const formatTime = (date) => {
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      };
    return (
        <View>
            <Text style={styles.baseText}>{date.toDateString()}</Text>
            <View style={styles.displayTime}>
                <SafeAreaView style={styles.dateTime}>
                    <Text style={styles.text} >Start Time: {formatTime(startTime)}</Text>
                    <Button onPress={() => setShowStartTimePicker(true)} title="Pick Start Time" />
                    {showStartTimePicker && (
                        <DateTimePicker
                            value={startTime}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeStartTime}
                        />
                    )}
                </SafeAreaView>
                    <Text> - </Text>
                <SafeAreaView style={styles.dateTime}>              
                    <Text style={styles.text} >End Time: {formatTime(endTime)}</Text>
                    <Button onPress={() => setShowEndTimePicker(true)} title="Pick End Time" />
                    {showEndTimePicker && (
                        <DateTimePicker
                        value={endTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeEndTime}
                        />
                    )}
                </SafeAreaView>
            </View>
            
            <SafeAreaView>
                <Text style={styles.text}> Activity Name: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleName}
                    value={name}
                />
            </SafeAreaView>
            <SafeAreaView>
                <Text style={styles.text}> Activity Details: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleDetails}
                    value={details}
                />
            </SafeAreaView>
            <Pressable style={styles.submitBtn}onPress={handleSubmit} >
                <Text style={styles.text}>Submit</Text>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "FFF",
    },
    dateTime: {
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
    button: {
        width: 120,
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
      },
      text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
      },
    baseText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        marginHorizontal: 20,
        marginVertical: 10

    },
    picker: {
        border: 'solid', 
        color: '#99c2ff',
        borderRadius: 2,
    },
    itemRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        marginHorizontal: -1,
    },
    item: {
        flex: 1,
        height: 40,
        marginHorizontal: 4,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#b3d1ff',
        borderRadius: 8
    },
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
      },
    submitBtn: {
        width: 120,
        height: 50,
        paddingVertical: 12,
        margin: 5,
        paddingHorizontal: 25,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#00ffaa',
    }
    }
)
export default Todo;