import { Side } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from "./screens/DashboardScreen.js";
import CourseScreen from "./screens/CourseScreen.js";
import TimetableScreen from "./screens/TimetableScreen.js";
import Todo from './screens/Todo.js';
import Sidebar from './components/Sidebar';
import DrawerComponent from './components/DrawerComponent';
import Login from './screens/Login.js'
import Register from './screens/Register.js';

const DrawerNavigator = createDrawerNavigator();
function MyDrawer() {
  return (
    <DrawerNavigator.Navigator drawerContent={ props => <DrawerComponent {...props}/>}
      initialRouteName="Home"
    >
      <DrawerNavigator.Screen name="Dashboard" component={DashboardScreen} options={{ unmountOnBlur: true }} />
      <DrawerNavigator.Screen name="Courses" component={CourseScreen} />
      <DrawerNavigator.Screen name="Timetable" component={TimetableScreen} options={{ unmountOnBlur: true }}/> 
      <DrawerNavigator.Screen name="AddTodo" component={Todo} />     
    </DrawerNavigator.Navigator>
  );
}
export default function App() {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer>
    //   <MyDrawer />
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
