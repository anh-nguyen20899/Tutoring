import React from "react";
import Screens from "./Screens";
import DashboardScreen from "./DashboardScreen";
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
export const Dashboard = ({navigation}) => <Screens navigation={navigation} name ="Profile">
    <View>
      <DashboardScreen>
        abc
      </DashboardScreen>
    </View>
</Screens>
export const CoursesScreen = ({navigation}) => <Screens navigation={navigation} name ="Courses">  </Screens>
export const TimetableScreen = ({navigation}) => <Screens navigation={navigation} name ="Timetable"> </Screens>