import React from "react";
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
export default Sidebar = props => (
    <ScrollView>
        <View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}></DrawerItemList>
                <Image source={require("../assets/icon.png")} style={styles.profile}>
                </Image>
        <Text style={styles.name}> ANNE</Text>
        <Text style={styles.name}> Student</Text>
            </DrawerContentScrollView>
        </View>
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "FFF"
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    }
    }
)