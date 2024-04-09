import React from "react";
import Screens from "./Screens";

export const DashboardScreen = ({navigation}) => <Screens navigation={navigation} name ="Profile"></Screens>
export const CoursesScreen = ({navigation}) => <Screens navigation={navigation} name ="Courses">  </Screens>
export const TimetableScreen = ({navigation}) => <Screens navigation={navigation} name ="Timetable"> </Screens>