import React, { useState } from 'react';
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import Screens from "./Screens";
import {FlatList, View, Text, StyleSheet} from 'react-native';
import WeeklyItem from './WeeklyItem';
import Schedule from './Schedule';

const DashboardScreen = ({navigation}) =>
{
    const todos = [
        {'id': 1, 'day': 'Monday', 'startTime': '7:00', 'title': 'Math', 'endTime': '8:20', 'details': 'Learning Algebra'},
        {'id': 2, 'day': 'Monday', 'startTime': '10:40', 'title': 'English', 'endTime': '13:20', 'details': 'Expanding Vocabularies'},
        {'id': 3, 'day': 'Tuesday', 'startTime': '13:00', 'title': 'Biology', 'endTime': '15:40', 'details': ''}
    ];
const Item = ({ id, day, startTime, endTime, title, details }) => (
    <View key={id} style={{backgroundColor: (id % 2 == 0) ? 'darkorange': 'red', flexDirection: 'column', padding: 10, display: (day === 'Monday') ? 'block': 'none'}}> 
        <Text> {id} </Text>
        <View>
            <Text style={styles.innerText}> {startTime} {title}</Text>
            <Text style={styles.innerText}> {endTime} {details}</Text>
        </View>
    </View>
  );
const renderItem = ({ item }) => (
    <Item id={item.id} day={item.day} startTime={item.startTime} endTime={item.endTime} title={item.title} details={item.details} />
  );
  
const renderWeeklyPlan = ({ item }) => (
    <WeeklyItem item={item} />
  );
    return (
            <View
                style={[
                styles.container,
                {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: 'column',
                    alignContent: 'center'
                },
                ]}>
                <View style={{backgroundColor: 'white', height:50}} >
                    <Text style={styles.baseText}> Today </Text>
                </View>
                <FlatList
                    data={todos} 
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />

                <View
                    style={[
                    styles.container,
                    {
                        // Try setting `flexDirection` to `"row"`.
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        
                    },
                    ]}>
                        <View style={{flex: 1, backgroundColor: 'white', border: 'solid', borderRadius: 10, margin: 5}} >
                            <Text style={styles.baseText}> This week's plan </Text>
                            <FlatList
                                data={todos} 
                                renderItem={renderWeeklyPlan}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={{flex: 1, backgroundColor: 'white', border: 'solid', borderRadius: 10,  margin: 5}} >
                            <Text style={styles.baseText}> Last week </Text>
                            <Text style={styles.fontText}>
                                    You studied {"\n"} 
                                    <Text style={styles.hightlight}>71.2</Text> hrs {"\n"}
                                    {"\n"}
                                    Your most {"\n"}
                                    productive {"\n"}
                                    day was
                                    {"\n"} {"\n"}
                                    <Text style={styles.hightlight}>Wednesday</Text>
                            </Text>
                            <Schedule />
                        </View>
                </View>
        </View>
        
    )
};
const styles = StyleSheet.create({
    container: {
      flex: 6,
      padding: 10,
      backgroundColor: '#0066ff',
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',

    },
    hightlight: {
        fontWeight: 'bold',
        fontSize: 30,
    },
      innerText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 18
    },
    fontText: {
        textAlign: 'center',
        paddingBottom: 6
    }
  });
export default DashboardScreen;