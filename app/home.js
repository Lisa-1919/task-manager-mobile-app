import { useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TaskList from "../components/task-list/TaskList";

const tasks = [
    { id: 1, title: 'Buy groceries', date: '2024-09-20', status: 'In Progress' },
    { id: 2, title: 'Walk the dog', date: '2024-09-21', status: 'Completed' },
    { id: 3, title: 'Read a book', date: '2024-09-22', status: 'Cancelled' },
];


const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");


    const [selectedTask, setSelectedTask] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Открыть форму для добавления новой задачи
    const handleAddTask = () => {
        setSelectedTask(null);
        setIsFormVisible(true);
    };

    // Открыть форму для редактирования задачи
    const handleEditTask = (task) => {
        setSelectedTask(task);
        setIsFormVisible(true);
    };

    // Обработать отправку формы
    const handleSubmitTask = (task) => {
        if (selectedTask) {
            // Редактирование существующей задачи
            setTasks((prevTasks) => prevTasks.map(t => t.id === selectedTask.id ? { ...t, ...task } : t));
        } else {
            // Добавление новой задачи
            const newTask = { ...task, id: tasks.length + 1, status: 'In Progress' };
            setTasks([...tasks, newTask]);
        }
        setIsFormVisible(false); // Скрываем форму после сохранения
    };

    // Удалить задачу
    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View>
                <TaskList
                    tasks={tasks}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;