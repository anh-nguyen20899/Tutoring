import React from 'react';
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
const DrawerComponent = (props) =>
{
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: "#6599FF"}}>
                <DrawerItemList {...props}></DrawerItemList>
            </DrawerContentScrollView>
            <View>
            <Image source={require("../assets/avatar.png")} style={styles.profile} />
                <Text> ANNE Student</Text>
            </View>
        </View>
        
    )
};
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
export default DrawerComponent;