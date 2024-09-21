import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskForm = ({ task, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('');

  const handleSubmit = () => {
    //put erros into array
    const errors = [];
    
    if (title.trim() === '') {
      errors.push('Task Title');
    }
    if (description.trim() === '') {
      errors.push('Description');
    }
    if (location.trim() === '') {
      errors.push('Location');
    }

    if (errors.length > 0) {
      Alert.alert('Validation Error', `Please fill in the following fields: ${errors.join(', ')}`);
      return;
    }

    if (dateTime < new Date()) {
      Alert.alert('Invalid Date/Time', 'The selected date and time cannot be in the past.');
      return;
    }

    const newTask = {
      title,
      description,
      date: dateTime.toLocaleString(),
      location,
    };
    onSubmit(newTask);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    if (currentDate >= new Date()) {
      setDateTime(currentDate);
    } else {
      Alert.alert('Invalid Date/Time', 'The selected date and time cannot be in the past.');
    }
    setShowPicker(false);
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
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
      <View style={styles.dateTimeContainer}>
        <Pressable onPress={() => showMode('date')}>
          <Text style={styles.dateText}>{dateTime.toLocaleDateString()}</Text>
        </Pressable>
        <Pressable onPress={() => showMode('time')}>
          <Text style={styles.timeText}>{dateTime.toLocaleTimeString()}</Text>
        </Pressable>
      </View>

      {showPicker && (
        <DateTimePicker
          value={dateTime}
          mode={mode}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button
        title="Add Task"
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
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#000',
  },
  timeText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#000',
    marginLeft: 20,
  },
});

export default TaskForm;
