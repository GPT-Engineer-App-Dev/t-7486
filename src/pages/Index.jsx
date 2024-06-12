import React, { useState } from 'react';
import { Container, VStack, HStack, Input, Button, Text, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };

  const saveEditTask = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? editTask : task));
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTask('');
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input 
            placeholder="Add a new task" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
          />
          <Button onClick={addTask} colorScheme="teal">Add Task</Button>
        </HStack>
        <VStack w="100%" spacing={2}>
          {tasks.map((task, index) => (
            <HStack key={index} w="100%" justifyContent="space-between">
              {editIndex === index ? (
                <Input 
                  value={editTask} 
                  onChange={(e) => setEditTask(e.target.value)} 
                />
              ) : (
                <Text>{task}</Text>
              )}
              <HStack spacing={1}>
                {editIndex === index ? (
                  <IconButton 
                    aria-label="Save" 
                    icon={<FaEdit />} 
                    onClick={() => saveEditTask(index)} 
                    colorScheme="teal"
                  />
                ) : (
                  <IconButton 
                    aria-label="Edit" 
                    icon={<FaEdit />} 
                    onClick={() => startEditTask(index)} 
                  />
                )}
                <IconButton 
                  aria-label="Delete" 
                  icon={<FaTrash />} 
                  onClick={() => deleteTask(index)} 
                  colorScheme="red"
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;