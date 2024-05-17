import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
const date = [
    {weekday: 'Mon', date: new Date()},
    {weekday: 'Tue', date: new Date()},
    {weekday: 'Wed', date: new Date()},
    {weekday: 'Thu', date: new Date()},
    {weekday: 'Fri', date: new Date()},
    {weekday: 'Sat', date: new Date()},
];
const formatTime = (timestamp) => {
    // Parse the timestamp string into a Date object
    const date = new Date(timestamp);
  
    // Get the hours, minutes, and seconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // Format the time string
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return formattedTime;
  }
const WeeklyItem = ({item}) =>
{
    return (
        <View style={[styles.container]}>
            <View style={{backgroundColor: (item.id % 2 == 0) ? 'darkorange': 'red', flexDirection: 'column', padding: 10}}>
                    <View>
                    <Text style={styles.innerText}> {formatTime(item.startTime)} {item.title}</Text>
                    <Text style={styles.innerText}> {formatTime(item.endTime)} {item.description}</Text>
                    </View>
                </View>
        </View>
        
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "FFF",
    },
    innerText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 18
    },
    }
)
export default WeeklyItem;