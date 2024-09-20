import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskForm = ({ task, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = () => {
    const newTask = {
      title,
      description,
      date: date.toLocaleString(), // Сохраняем выбранную дату
      location
    };
    onSubmit(newTask);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // Оставляем пикер видимым на iOS, скрываем на Android
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />

      <Text style={styles.label}>Date and Time</Text>
      <Pressable onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>{date.toLocaleString()}</Text>
      </Pressable>

      {showPicker && (
        <View>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
          <DateTimePicker
          value={time}
            mode="time"
            display="default"
          />
        </View>

      )}

      <Button
        title={task ? "Save Changes" : "Add Task"}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#000',
  },
});

export default TaskForm;
