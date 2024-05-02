import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
const date = [
    {weekday: 'Mo', date: new Date()},
    {weekday: 'Tu', date: new Date()},
    {weekday: 'We', date: new Date()},
    {weekday: 'Th', date: new Date()},
    {weekday: 'Fr', date: new Date()},
];
const WeeklyItem = ({item}) =>
{
    return (
        <View style={[styles.container]}>
            <View style={{backgroundColor: (item.id % 2 == 0) ? 'darkorange': 'red', flexDirection: 'column', padding: 10}}>
                    <View>
                        <Text style={styles.innerText}> {item.startTime} {item.title}</Text>
                        <Text style={styles.innerText}> {item.endTime}</Text>
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