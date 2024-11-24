import {
  StyleSheet, Text, TextInput,
  View, ScrollView, TouchableOpacity,
  Modal, Alert
} from 'react-native';
import React, { useState } from 'react';
import { reauthenticateWithCredential,
  EmailAuthProvider, updatePassword } from 'firebase/auth';
import { registerUserInfo } from '../Firestore/firestoreHelper';
import { auth } from '../Firestore/firestoreSetup'
import { onSnapshot, doc } from 'firebase/firestore';
import { database } from '../Firestore/firestoreSetup';
import { useEffect } from 'react';

export default function Profile({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);


  const handleSave = async () => {
    if (!isEmailValid) {
      Alert.alert('Invalid email address', 'Please enter a valid email address');
      return;
    }
    let data = { username, email, phone, city, street, zip };
    console.log('Data:', data);
    const uploadData = await registerUserInfo(auth.currentUser.uid, data);
    navigation.navigate('Home');
  };

  const handleCancel = () => {
    // Logic to clear the input values
    setUsername('');
    setEmail('');
    setPhone('');
    setCity('');
    setStreet('');
    setZip('');
  };

  const handleEmailInput = (text) => {
    setEmail(text);
    if (text.includes('@') && text.includes('.')) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const isPasswordValid = (password) => {
    if (password.length < 6) {
      return false;
    }
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    return hasLetters && hasNumbers;
  };


  const handleResetPassword = async () => {
    if (newPassword === confirmPassword) {
      if (isPasswordValid(newPassword)) {
        try {
          // Re-authenticate the user
          if (auth.currentUser && auth.currentUser.email) {
            const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);

            // Now update the password
            await updatePassword(auth.currentUser, newPassword);
            console.log('Password reset successfully');
            setModalVisible(false);
            setNewPassword('');
            setConfirmPassword('');
            setCurrentPassword('');
          } else {
            console.error('Current user is not defined or does not have an email');
          }
        } catch (error) {
          console.error('Error re-authenticating or updating password:', error);
        }
      } else {
        Alert.alert('Invalid Password', 'Password must be at least 6 characters long and cannot be all letters or all numbers.', [{ text: 'OK' }]);
      }
    } else {
      console.error('Passwords do not match');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.currentUser ? onSnapshot(doc(database, 'trashData', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setCity(data.city);
        setStreet(data.street);
        setZip(data.zip);
      }
    }) : () => {};

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={[styles.input, !isEmailValid && { borderColor: 'red' }]}
        value={email}
        onChangeText={handleEmailInput}
        placeholder="Enter your email address"
        keyboardType="email-address"
      />
      {!isEmailValid && (
        <Text style={{ color: 'red' }}>Please enter a valid email address</Text>
      )}


      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter your city"
      />

      <Text style={styles.label}>Street:</Text>
      <TextInput
        style={styles.input}
        value={street}
        onChangeText={setStreet}
        placeholder="Enter your street address"
      />

      <Text style={styles.label}>Zip Code:</Text>
      <TextInput
        style={styles.input}
        value={zip}
        onChangeText={setZip}
        placeholder="Enter your zip code"
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 10,
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
});
