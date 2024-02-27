// TaskItem.jsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const TaskItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.taskItem} onPress={() => onPress(item.id)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default TaskItem;
