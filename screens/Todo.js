import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const Todo = (props) =>
{
    
    return (
        <Text></Text>
    );
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
export default Todo;