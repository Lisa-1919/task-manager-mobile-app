import React from 'react';
import { FlatList } from 'react-native';
import Task from '../task/Task';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {

  const renderTask = ({ item }) => <Task
    task={item}
    onEditTask={onEditTask}
    onDeleteTask={onDeleteTask}
  />;

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderTask}
    />
  );
};

export default TaskList;