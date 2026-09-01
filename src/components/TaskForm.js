import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit } from 'react-icons/fa';
import './TaskForm.css';

/**
 * TaskForm Component
 * Handles adding new tasks and editing existing tasks
 * Includes form validation for task name and description
 */
const TaskForm = ({ addTask, editTask, currentTask, setCurrentTask }) => {
  // State for form fields
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (currentTask) {
      setTaskName(currentTask.name);
      setTaskDescription(currentTask.description);
      setIsEditing(true);
    } else {
      setTaskName('');
      setTaskDescription('');
      setIsEditing(false);
    }
  }, [currentTask]);

  /**
   * Validate form fields
   * Returns true if valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!taskName.trim()) {
      newErrors.name = 'Task name is required';
    } else if (taskName.trim().length < 3) {
      newErrors.name = 'Task name must be at least 3 characters';
    }
    
    if (!taskDescription.trim()) {
      newErrors.description = 'Task description is required';
    } else if (taskDescription.trim().length < 5) {
      newErrors.description = 'Task description must be at least 5 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission for adding or editing a task
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      name: taskName.trim(),
      description: taskDescription.trim()
    };

    if (isEditing && currentTask) {
      // Edit existing task
      editTask(currentTask.id, taskData);
      setCurrentTask(null);
    } else {
      // Add new task
      addTask(taskData);
    }

    // Reset form
    setTaskName('');
    setTaskDescription('');
    setErrors({});
    setIsEditing(false);
  };

  /**
   * Cancel editing and reset form
   */
  const handleCancel = () => {
    setTaskName('');
    setTaskDescription('');
    setErrors({});
    setIsEditing(false);
    setCurrentTask(null);
  };

  return (
    <div className="task-form-container">
      <h3 className="form-title">
        {isEditing ? <FaEdit /> : <FaPlus />}
        {isEditing ? ' Edit Task' : ' Add New Task'}
      </h3>
      
      <Form onSubmit={handleSubmit} className="task-form">
        <Form.Group className="mb-3">
          <Form.Label>Task Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
              if (errors.name) {
                setErrors({ ...errors, name: '' });
              }
            }}
            className={errors.name ? 'is-invalid' : ''}
          />
          {errors.name && (
            <Alert variant="danger" className="validation-error">
              {errors.name}
            </Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Task Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
              if (errors.description) {
                setErrors({ ...errors, description: '' });
              }
            }}
            className={errors.description ? 'is-invalid' : ''}
          />
          {errors.description && (
            <Alert variant="danger" className="validation-error">
              {errors.description}
            </Alert>
          )}
        </Form.Group>

        <div className="form-actions">
          {isEditing && (
            <Button 
              variant="secondary" 
              onClick={handleCancel}
              className="cancel-btn"
            >
              Cancel
            </Button>
          )}
          <Button 
            variant="primary" 
            type="submit"
            className="submit-btn"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default TaskForm;
