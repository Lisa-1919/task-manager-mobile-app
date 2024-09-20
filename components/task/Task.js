import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const Task = ({ task, handleChangeStatus, handleDeleteTask }) => {

    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const toggleExpand = (id) => {
        setExpandedTaskId(id === expandedTaskId ? null : id);
    };

    return (
        <View style={styles.taskContainer}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.date}>Date: {task.date}</Text>
            <Text style={styles.status}>Status: {task.status}</Text>

            <View style={styles.buttonsContainer}>
                <Button title="Delete" onPress={() => handleDeleteTask(task.id)} />
                <Button 
                    title={task.status === "Completed" ? "Mark as In Progress" : "Complete Task"} 
                    onPress={() => handleChangeStatus(task.id, task.status === "Completed" ? "In Progress" : "Completed")} 
                />
                <Button title="More" onPress={() => toggleExpand(task.id)} />
            </View>

            {expandedTaskId === task.id && (
                <View style={styles.expandedInfo}>
                    <Text>Description: {task.description}</Text>
                    <Text>Location: {task.location}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
    },
    status: {
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    expandedInfo: {
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
});

export default Task;