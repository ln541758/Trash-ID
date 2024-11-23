import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import PressButton from './PressButton'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firestore/firestoreSetup'


export default function Signup({navigation}) {
    // const navigation = useNavigation()
    const [valueVar, setValueVar] = useState('')
    const [passwordVar, setPasswordVar] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function handleNavigation() {
        navigation.replace('Login')
    }

    // check if
    const handleSignUp = async () => {
        try {
            if (valueVar.trim() === '' ||
                passwordVar.trim().length < 6 ||
                passwordVar.trim().length < 6) {
                alert('Please enter valid inputs');
            } else if (passwordVar.trim() !== confirmPassword.trim()) {
                Alert.alert('Passwords do not match');
            } else {
                const userCredential = await
                createUserWithEmailAndPassword(auth, valueVar, passwordVar);
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email address</Text>
            <TextInput style={styles.input}
                placeholder='Email'
                value={valueVar}
                onChangeText={setValueVar} />

            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
                value={passwordVar}
                onChangeText={setPasswordVar} />

            <Text style={styles.text}>Confirm Password</Text>
            <TextInput style={styles.input}
                placeholder='Confirm Password'
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword} />
            {/* button section */}
            <PressButton passedOnPress={handleSignUp}
                componentStyle={styles.buttonStyle}>
                <Text style={[styles.text, { fontSize: 15 }]}>Register</Text>
            </PressButton>

            <PressButton
                passedOnPress={handleNavigation}
                componentStyle={styles.buttonStyle}>
                <Text style={[styles.text, { fontSize: 15 }]}>Already registered? Login</Text>
            </PressButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgreen',
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
        backgroundColor: 'lightblue',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderRadius: 5,
        width: '60%',
        alignSelf: 'center',
    },
})