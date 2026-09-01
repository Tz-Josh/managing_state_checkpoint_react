import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

/**
 * Main App Component
 * Manages the entire To-Do List application state
 * Persists tasks using localStorage
 */
function App() {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  // State for editing
  const [currentTask, setCurrentTask] = useState(null);

  /**
   * Load tasks from localStorage when component mounts
   */
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  /**
   * Save tasks to localStorage whenever tasks change
   */
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Add a new task
   * @param {Object} taskData - { name, description }
   */
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      name: taskData.name,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  /**
   * Edit an existing task
   * @param {string} id - Task ID
   * @param {Object} updatedData - { name, description }
   */
  const editTask = (id, updatedData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, name: updatedData.name, description: updatedData.description }
          : task
      )
    );
    setCurrentTask(null);
  };

  /**
   * Delete a task
   * @param {string} id - Task ID to delete
   */
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  /**
   * Toggle task completion status
   * @param {string} id - Task ID to toggle
   */
  const toggleComplete = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null
            }
          : task
      )
    );
  };

  /**
   * Set task for editing
   * @param {Object} task - Task object to edit
   */
  const setEditTask = (task) => {
    setCurrentTask(task);
  };

  return (
    <div className="App">
      <Container fluid className="app-container">
        <Row className="justify-content-center">
          <Col lg={8} xl={7}>
            {/* Header */}
            <div className="app-header">
              <h1 className="app-title">✅ Todo List</h1>
              <p className="app-subtitle">
                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
              </p>
            </div>

            {/* Task Form */}
            <TaskForm
              addTask={addTask}
              editTask={editTask}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
            />

            {/* Task List */}
            <TaskList
              tasks={tasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={setEditTask}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
