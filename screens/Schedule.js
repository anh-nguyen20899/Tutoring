import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
const date = [
    {weekday: 'Mo', date: new Date()},
    {weekday: 'Tu', date: new Date()},
    {weekday: 'We', date: new Date()},
    {weekday: 'Th', date: new Date()},
    {weekday: 'Fr', date: new Date()},
]
const Schedule = (props) =>
{
    return (
        <View style={{flex:1}}>
            <View style={styles.picker}>
                <View style={styles.itemRow}>
                    {date.map((item, dateIndex) => {
                        return(
                            <TouchableWithoutFeedback>
                                <View style={styles.item}>
                                    <Text>
                                        {item.weekday}
                                    </Text>
                                    {/* <Text>
                                        {item.date.getDate()}
                                    </Text> */}
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
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
    }
    }
)
export default Schedule;