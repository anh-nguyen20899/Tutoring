import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Alert, SafeAreaView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Login = () =>
{
  const navigation = useNavigation();
  const [account, setAccount] = useState('');
  const [accountVerify, setAccountVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const handleName = (e) => {
    const name = e.nativeEvent.text;
    setAccount(name);
    setAccountVerify(false);
    if(name.length > 1) {
      setAccountVerify(true);
    }
  }
  const handlePassword = (e) => {
    const password = e.nativeEvent.text;
    setPassword(password);
    setPasswordVerify(false);
    if(password.length > 1) {
      setAccountVerify(true);
    }
  }
  const handleSubmit = async () => {
    try {
      const data = {
        "email": account,
        "password": password
      }
        const response = await fetch('https://ict729.fly.dev/api/auth/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        navigation.navigate('Home');
        if(json == 'Wrong password!'){
            Alert.alert('Incorrect username or password');
            navigation.navigate('Login');
        } else if(json.info && json.token) {
            Alert.alert('Logged In succesfully');
            AsyncStorage.setItem("token", json.token)
            // const result = json.filter((a) => a === account)
            navigation.navigate('Home');
        }
        
      }
    catch (error) {
      console.error(error);
    } finally {
      
    }
  }
    return(  
        <GestureHandlerRootView>
            <View style={styles.loginContainer}>
            <Text style={styles.text_header}>
                Login
            </Text>
            <SafeAreaView>
                <TextInput
                    style={styles.textInput}
                    editable
                    value={account}
                    maxLength={40}
                    placeholder='Email'
                    onChange={e => handleName(e)}
                />
                {accountVerify && <Text>Email is required</Text>}
                <Text>{account}
                  </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter Password'
                    value={password}
                    returnKeyType="next"
                    secureTextEntry
                    onChange={(e) => {handlePassword(e)}}
                />
                
                <Text>{password}
                  </Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.textSign}> Log In </Text>
                    </TouchableOpacity>
                      <Text> Not a member yet? </Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
                        <Text style={styles.textSign}>Sign Up</Text>
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
export default Login;