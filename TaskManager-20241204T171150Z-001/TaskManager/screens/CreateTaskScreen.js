import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { createTask } from '../services/api';

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !dueDate) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const task = { title, description, dueDate };

    createTask(task)
      .then(() => {
        Alert.alert('Success', 'Task created successfully!');
        navigation.navigate('Home');
      })
      .catch((err) => {
        console.error('Error creating task:', err);
        Alert.alert('Error', 'Failed to create task. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Task</Text>

      <View style={styles.layer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.layer}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.layer}>
        <TextInput
          style={styles.input}
          placeholder="Date format(e.g June 30,2023)"
          value={dueDate}
          onChangeText={setDueDate}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f5f9',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  layer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    height: 45,
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '20%',
    marginTop: 30,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#481E14',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CreateTaskScreen;
