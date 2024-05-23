import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Register = () =>
{
    return(
        
        <GestureHandlerRootView>
            <View style={styles.loginContainer}>
            <Text style={styles.text_header}>
                Register
            </Text>
            <SafeAreaView>
                <TextInput
                    style={styles.textInput}
                    editable
                    maxLength={40}
                    placeholder='Name'
                />
                <TextInput
                    style={styles.textInput}
                    editable
                    maxLength={40}
                    placeholder='Email'
                />

                <TextInput
                    style={styles.textInput}
                    editable
                    multiline
                    placeholder='Password'
                />
                <View style={styles.button}>
                    <TouchableOpacity>
                        <Text style={styles.textSign}> Register </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </View>
        </GestureHandlerRootView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
      },
      text_header: {
        color: '#420475',
        fontWeight: 'bold',
        fontSize: 30,
      },
      action: {
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom: 3,
        marginTop: 15,
    
        paddingHorizontal: 15,
    
        borderWidth: 1,
        borderColor: '#420475',
        borderRadius: 50,
      },
      textInput: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
      },
      textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
      },
      button: {
        alignItems: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
      },
    }
)
export default Register;