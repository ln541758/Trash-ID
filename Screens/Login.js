import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firestore/firestoreSetup'
import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    const [emailVar, setEmailVar] = useState('')
    const [passwordVar, setPasswordVar] = useState('')
    const navigation = useNavigation()
    function handleNavigation() {
        navigation.replace('Signup')
    }
    const handleLogin = async () => {
        if ( !emailVar || !passwordVar ) {
            Alert.alert('Please enter email and password')
            return;
        }
        try{
            const userCred = await signInWithEmailAndPassword(auth, emailVar, passwordVar);
        } catch (error) {
            console.log('error', error)
            Alert.alert('Failed to login')
        }
    }
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Email address</Text>
      <TextInput style={styles.input}
      placeholder='Email'
      value={emailVar}
      secureTextEntry={false}
      onChangeText={setEmailVar} />

      <Text style={styles.text}>Password</Text>
      <TextInput style={styles.input}
      secureTextEntry={true}
      placeholder='Password'
      value={passwordVar}
      onChangeText={setPasswordVar} />

      {/* button section */}
      <TouchableOpacity style={styles.buttonStyle}
      onPress={handleLogin}>
        <Text style={[styles.text, { fontSize: 15 }]}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle}
      onPress={handleNavigation}>
        <Text style={[styles.text, { fontSize: 15 }]}>New user? Create an account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
},
text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    margin: 0,
    paddingLeft: 10,
},
input: {
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    padding: 10,
    margin: 10,
    fontSize: 20,
},
buttonStyle: {
    backgroundColor: 'lightgreen',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '70%',
    alignSelf: 'center',
},
})