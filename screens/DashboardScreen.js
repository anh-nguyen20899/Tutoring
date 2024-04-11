import React from 'react';
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import Screens from "./Screens";
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
const DashboardScreen = ({navigation}) =>
{
    return (
            <View
            style={[
            styles.container,
            {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: 'column',
            },
            ]}>
            <View style={{flex: 1, backgroundColor: 'white'}} >
                <Text style={styles.baseText}> Today </Text>
            </View>
            <View style={{flex: 2, backgroundColor: 'red', flexDirection: 'column'}}> 
                <View>
                    <Text style={styles.innerText}> 07:00 Math </Text>
                </View>
                <View>
                    <Text style={styles.innerText}> 08:20 Learning Algebra </Text>
                </View>
                
            </View>
            
            <View style={{flex: 2, backgroundColor: 'darkorange'}}>
                <View>
                    <Text style={styles.innerText}> 07:00 Math </Text>
                </View>
                <View>
                    <Text style={styles.innerText}> 08:20 Learning Algebra </Text>
                </View>
             </View>

             <View
                style={[
                styles.container,
                {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: 'row',
                },
                ]}>
                    <View style={{flex: 1, backgroundColor: 'white'}} >
                        <Text> This week plan </Text>
                    </View>
                    <View style={{flex: 1, backgroundColor: 'white'}} >
                        <Text> Last week </Text>
                    </View>
            </View>
             
                {/* <View style={{flex: 1, backgroundColor: 'white'}} >
                    <Text> Today </Text>
                </View>
                <View style={{flex: 2, backgroundColor: 'red'}}> 
                    <Text> 7 Math
                    8:20 Learning Algebra
                    </Text>
                </View>
                
                <View style={{flex: 3, backgroundColor: 'darkorange'}}>
                <Text> 7 English
                    8:20 Expanding Vocabulary
                    </Text>
                </View>
                <View style={{ backgroundColor: 'white'}} >
                    <Text> Today </Text>
                </View> */}
        </View>
        
    )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    baseText: {
        fontWeight: 'bold',
      },
      innerText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 20
      },
  });
export default DashboardScreen;