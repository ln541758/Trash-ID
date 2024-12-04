import { StyleSheet, Text, View, TextInput,
  TouchableOpacity, Modal} from 'react-native'
import React from 'react'
import { signInWithEmailAndPassword,
  sendPasswordResetEmail
 } from 'firebase/auth'
import { auth } from '../Firestore/firestoreSetup'
import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
  const [emailVar, setEmailVar] = useState('')
  const [passwordVar, setPasswordVar] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const navigation = useNavigation()

  const [modalVisible, setModalVisible] = useState(false);

  const handleLinkPress = () => {
    setModalVisible(true);
  };

  function handleNavigation() {
    navigation.replace('Signup')
  }
  const handleLogin = async () => {
    if (!emailVar || !passwordVar) {
      Alert.alert('Please enter email and password')
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, emailVar, passwordVar);
    } catch (error) {
      console.log('error', error)
      Alert.alert('Failed to login')
    }
  }
  const checkEmail = (email) => {
    if (!email) {
      Alert.alert("Please enter an email address.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }

  const resetPassword = (email) => {
    if (!checkEmail(email)) {
      Alert.alert("Please enter an valid email address.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("If the email exists, a password reset link will be sent to the email address provided.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error: ", errorCode, errorMessage);
      });
    setCurrentEmail('');
    setModalVisible(false);
  };

  const handleCancel = () => {
    setCurrentEmail('');
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TrashID</Text>
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

      <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: 'lightcoral' }]}
        onPress={handleNavigation}>
        <Text style={[styles.text, { fontSize: 15 }]}>New user? Create an account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLinkPress}>
        <Text style={styles.linkText}>Forget password? </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={[styles.input, {fontSize: 15}] }
              value={currentEmail}
              onChangeText={setCurrentEmail}
              placeholder="Enter your email address here"
              secureTextEntry={false}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => handleCancel()}>
                <Text style={styles.buttonText}>Cancel </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={() => resetPassword(currentEmail)}>
                <Text style={styles.buttonText}>Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 80,
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
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
})