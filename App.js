import { Side } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

import {Feather} from '@expo/vector-icons';

import {DashboardScreen, CoursesScreen, TimetableScreen} from './screens';
import Sidebar from './components/Sidebar';

const DrawerNavigator = createDrawerNavigator();
function MyDrawer() {
  return (
    <DrawerNavigator.Navigator initialRouteName="Home"
    >
      <DrawerNavigator.Screen name="Dashboard" component={DashboardScreen} />
      <DrawerNavigator.Screen name="Courses" component={CoursesScreen} />
      <DrawerNavigator.Screen name="Timetable" component={TimetableScreen} />    
    </DrawerNavigator.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
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
