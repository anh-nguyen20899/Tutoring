import React from "react";
import Screens from "./Screens";
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
export const DashboardScreen = ({navigation}) => <Screens navigation={navigation} name ="Profile">
    <View>
      <View style={{flex: 1}} />
      <View style={{flex: 2}} />
      <View style={{flex: 3}} />
    </View>
</Screens>
export const CoursesScreen = ({navigation}) => <Screens navigation={navigation} name ="Courses">  </Screens>
export const TimetableScreen = ({navigation}) => <Screens navigation={navigation} name ="Timetable"> </Screens>