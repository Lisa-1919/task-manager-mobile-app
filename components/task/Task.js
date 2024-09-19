import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const Task = ({ task }) => {

    //Edit button
    const renderRightActions = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
            <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
    );

    // Delete button
    const renderLeftActions = () => (
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(task)}>
            <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
    );


    return (
        <Swipeable
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{task.title}</Text>
                <Text>{task.date}</Text>
                <Text>Status: {task.status}</Text>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
    },
    deleteButton: {
        backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Task;