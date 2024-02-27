import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import db from '../config/db/firebase';

const AddTask = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                name: name,
                email: email
            });
            console.log(docRef)
            Alert.alert("Success", "Task added successfully with ID: " + docRef.id);
            // Reset form fields after successful addition
            setName('');
            setEmail('');
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert("Error", "Failed to add task. Please try again later.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
            />
            <Button
                title="Add Task"
                onPress={handleAddUser}
            />
        </View>
    );
}

export default AddTask;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
