import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Task from '../task/Task';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
    const renderTask = ({ item }) => (
        <Task task={item} handleChangeStatus={onEditTask} handleDeleteTask={onDeleteTask} />
    );

    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTask}
        />
    );
};

export default TaskList;
