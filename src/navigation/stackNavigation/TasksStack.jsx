import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tasks from '../../screens/Tasks';
import TaskDetails from '../../screens/TaskDetails';

const TasksStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={Tasks} />
            <Stack.Screen name="TaskDetails" component={TaskDetails} />
        </Stack.Navigator>
    )
}

export default TasksStack

const styles = StyleSheet.create({})