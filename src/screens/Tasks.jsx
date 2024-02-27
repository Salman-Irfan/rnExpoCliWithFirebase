// Tasks.jsx

import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../config/db/firebase';
import TaskItem from '../components/TaskItem'; // Import TaskItem component
import { useFocusEffect } from '@react-navigation/native';

const Tasks = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);

    const fetchAllTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            const taskArray = [];
            querySnapshot.forEach((doc) => {
                taskArray.push({ id: doc.id, ...doc.data() });
            });
            setTasks(taskArray);
        } catch (error) {
            console.log("Error fetching tasks: ", error);
        }
    }

    useEffect(() => {
        console.log(`use effect hook called`)
        fetchAllTasks();
    }, []);
    console.log(tasks)
    
    // after navigation
    useFocusEffect(
        React.useCallback(() => {
            fetchAllTasks();
        }, [])
    );
    const handleTaskPress = (taskId) => {
        // Navigate to TaskDetails screen with taskId as parameter
        navigation.navigate('TaskDetails', { taskId });
    };

    return (
        <View style={{ backgroundColor: 'green', flex: 1 }}>
            <Text style={styles.title}>Tasks</Text>
            <FlatList
                data={tasks}
                renderItem={({ item }) => <TaskItem item={item} onPress={handleTaskPress} />} // Use TaskItem component
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Tasks;
