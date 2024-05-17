import React, { useState, useEffect  } from 'react';
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import Screens from "./Screens";
import {FlatList, View, Text, StyleSheet, Touchable} from 'react-native';
import WeeklyItem from './WeeklyItem';
import Schedule from './Schedule';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DashboardScreen = ({navigation}) =>
{
    // Create a new Date object
    const today = new Date();

    // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const dayOfWeek = today.getDay();

    // Define an array to map day numbers to day names
    const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat"];

    // Get the name of the day using the day number
    const dayName = daysOfWeek[dayOfWeek - 1];
    
    const [todos, setTodos] = useState([
        {'id': 1, 'day': 'Monday', 'startTime': '7:00', 'title': 'Math', 'endTime': '8:20', 'details': 'Learning Algebra'},
        {'id': 2, 'day': 'Monday', 'startTime': '10:40', 'title': 'English', 'endTime': '13:20', 'details': 'Expanding Vocabularies'},
        {'id': 3, 'day': 'Tuesday', 'startTime': '13:00', 'title': 'Biology', 'endTime': '15:40', 'details': ''}
    ]);
    const [weekDuration, setweekDuration] = useState(0);
const Item = ({item}) => (
    <View key={item.id} style={{backgroundColor: (item.id % 2 == 0) ? 'darkorange': 'red', flexDirection: 'column', padding: 10, display: (item.day == 'thu') ? 'block': 'none'}}> 
        <Text> {item.id} </Text>
        <View>
            <Text style={styles.innerText}> {new Date(item.startTime).toLocaleTimeString()} {item.title}</Text>
            <Text style={styles.innerText}> {formatTime(item.endTime)} {item.description}</Text>
        </View>
    </View>
    
  );
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
const renderItem = ({ item}) => (
    <Item key={item.id} item ={item}/>
  );
  
const renderWeeklyPlan = ({ item }) => (
    <WeeklyItem item={item} />
  );
  const getSchedules = async () => {
        try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('https://ict729.fly.dev/api/schedules', {
                headers: {
                "Authorization": `Bearer ${token}`,
            }
          });
        const json = await response.json();
        setweekDuration(json.weekDuration);
        
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

        // console.log(filtered);
        
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
        // console.log(filteredData);

        // Final filter
        // Flatten the array and map it to the desired format
        let idCounter = 0; 
        const transformedData = filteredData.flatMap((item, index) => {
        const key = Object.keys(item)[0]; // Get the day name (e.g., "mon", "tue", etc.)
        const day = daysToFilter[index]; // Get the corresponding day name
        const objects = item[key].map((obj, id) => ({ id: ++idCounter, day, startTime: obj.startTime, endTime: obj.endTime,
            title: obj.title, description: obj.description
        }));
            return objects;
        });
        
        setTodos(transformedData);
        // const jsonValue = JSON.stringify(todos);
        // AsyncStorage.setItem("newVal", jsonValue);
        }
        catch (error) {
        console.error(error);
        } finally {
        
        }
    };
    useEffect(() => {
        getSchedules();
    }, []);
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
                    <TouchableOpacity>
                        <Text style={styles.baseText}> Today </Text>
                    </TouchableOpacity>
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
                                    <Text style={styles.hightlight}>{weekDuration}</Text> hrs {"\n"}
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