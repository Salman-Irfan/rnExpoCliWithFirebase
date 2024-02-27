import React, { useState, useEffect } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import db from '../config/db/firebase';

const TaskDetails = (props) => {
    const { taskId } = props.route.params;
    const [taskDetails, setTaskDetails] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    const fetchTaskDetails = async () => {
        try {
            const taskDocRef = doc(db, 'tasks', taskId);
            const taskDocSnapshot = await getDoc(taskDocRef);
            if (taskDocSnapshot.exists()) {
                const data = taskDocSnapshot.data();
                setTaskDetails(data);
                setEditedName(data.name); // Populate editedName with existing user name
                setEditedEmail(data.email); // Populate editedEmail with existing user email
            } else {
                console.log('Task not found');
            }
        } catch (error) {
            console.error('Error fetching task details:', error);
        }
    };

    useEffect(() => {
        fetchTaskDetails();
    }, []);

    const openEditModal = () => {
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    // update function
    const closeUpdateTask = async (taskId) => {
        try {
            const taskDocRef = doc(db, 'tasks', taskId);
            await updateDoc(taskDocRef, {
                name: editedName,
                email: editedEmail,
            });
            alert('Task updated successfully');
            fetchTaskDetails(); // Fetch updated task details
            closeEditModal(); // Close the edit modal
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const taskDocRef = doc(db, 'tasks', taskId);
            await deleteDoc(taskDocRef);
            alert('Task deleted successfully');
            props.navigation.goBack();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Details</Text>
            {taskDetails ? (
                <View>
                    <Text>User ID: {taskId}</Text>
                    <Text>User Name: {taskDetails.name}</Text>
                    <Text>User Email: {taskDetails.email}</Text>
                    <Button title='Edit' color='green' onPress={openEditModal} />
                    <Button title='Delete' color='red' onPress={() => handleDeleteTask(taskId)} />
                </View>
            ) : (
                <Text>Loading task details...</Text>
            )}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showEditModal}
                onRequestClose={closeEditModal}
            >
                <View style={styles.modalContainer}>
                    <Text>Edit Modal</Text>
                    {/* Input fields for user name and email */}
                    <TextInput
                        style={styles.input}
                        value={editedName}
                        onChangeText={setEditedName}
                        placeholder='User Name'
                    />
                    <TextInput
                        style={styles.input}
                        value={editedEmail}
                        onChangeText={setEditedEmail}
                        placeholder='User Email'
                    />
                    {/* update btn */}
                    <Button
                        title='Update'
                        onPress={() => closeUpdateTask(taskId)}
                        color={'green'}
                    />
                    {/* close btn */}
                    <Button
                        title='Close'
                        onPress={closeEditModal}
                        color={'yellow'}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default TaskDetails;
