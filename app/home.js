import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from "../components/task-list/TaskList";
import TaskForm from "../components/task-form/TaskForm";
import ErrorMessage from "../components/error/ErrorMessage";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks));
                }
            } catch (e) {
                setError("Failed to load tasks from storage", e);
            }
        };

        fetchTasks();
    }, []);

    const saveTasksToStorage = async (newTasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
        } catch (e) {
            setError("Failed to save tasks", e);
        }
    };
    //add new task
    const handleSubmitTask = (task) => {
        const newTask = { ...task, id: tasks.length + 1, status: 'In Progress' };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasksToStorage(updatedTasks);
        setIsFormVisible(false);
    };

    //delete task
    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        saveTasksToStorage(updatedTasks);
    };

    const handleChangeStatus = (id, newStatus) => {
        const updatedTasks = tasks.map(task => task.id === id ? { ...task, status: newStatus } : task);
        setTasks(updatedTasks);
        AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    //open add task form
    const handleAddTask = () => {
        setSelectedTask(null);
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    return (
        <View style={styles.container}>
            <ErrorMessage message={error} />
            {!isFormVisible && (
                <Pressable onPress={handleAddTask} style={styles.addButton}>
                    <Icon name="add" size={40}/>
                </Pressable>
            )}
            <TaskList
                tasks={tasks}
                onEditTask={handleChangeStatus}
                onDeleteTask={handleDeleteTask}
            />
            {isFormVisible && (
                <View style={styles.formContainer}>
                    <Pressable onPress={handleCloseForm} style={styles.closeForm}>
                        <Icon name="close" size={20}/>
                    </Pressable>
                    <TaskForm task={selectedTask} onSubmit={handleSubmitTask} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: '#fff',
    },
    closeForm: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 1,
    },
});

export default Home;