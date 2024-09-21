import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Task = ({ task, handleChangeStatus, handleDeleteTask }) => {
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [rotateValue] = useState(new Animated.Value(0));

    const toggleExpand = (id) => {
        const isExpanded = id === expandedTaskId;
        setExpandedTaskId(isExpanded ? null : id);

        Animated.timing(rotateValue, {
            toValue: isExpanded ? 0 : 1, // route from 0 to 180
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const rotateIcon = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'], // route from 0 to 180
    });

    // delete confirmation before deleting task
    const confirmDelete = () => {
        Alert.alert(
            'Delete Task',
            `Are you sure you want to delete the task "${task.title}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => handleDeleteTask(task.id),
                },
            ]
        );
    };

    return (
        <View style={styles.taskContainer}>
            <View style={styles.taskHeader}>
                <View style={styles.taskInfo}>
                    <Icon name="circle" style={task.status === 'In Progress' ? styles.inprogress : styles.completed} />
                    <Text style={styles.title}>{task.title}</Text>
                </View>
                <Pressable onPress={() => toggleExpand(task.id)}>
                    <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
                        <Icon name="chevron-down" size={20} />
                    </Animated.View>
                </Pressable>
            </View>

            <Text style={styles.date}>Date: {task.date}</Text>
            <Text style={styles.status}>Status: {task.status}</Text>

            {expandedTaskId === task.id && (
                <View style={styles.expandedInfo}>
                    <Text>Description: {task.description}</Text>
                    <Text>Location: {task.location}</Text>
                </View>
            )}

            <View style={styles.buttonsContainer}>
                <Pressable onPress={confirmDelete} style={styles.deleteButton}>
                    <Icon name="trash" size={20} />
                </Pressable>
                <Pressable
                    onPress={() => handleChangeStatus(task.id, task.status === "Completed" ? "In Progress" : "Completed")}
                    style={styles.statusButton}
                >
                    <Text style={styles.statusButtonText}>
                        {task.status === "Completed" ? "Mark as In Progress" : "Complete Task"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    status: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    statusButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    expandedInfo: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e8e8e8',
        borderRadius: 5,
    },
    completed: {
        color: 'green',
        fontSize: 20,
    },
    inprogress: {
        color: 'orange',
        fontSize: 20,
    },
});

export default Task;
