import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import TaskItem from './TaskItem';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import './TaskList.css';

/**
 * TaskList Component
 * Displays list of tasks with filtering and sorting capabilities
 */
const TaskList = ({ tasks, toggleComplete, deleteTask, editTask }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'name'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  /**
   * Filter tasks based on completion status
   */
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  /**
   * Sort tasks
   */
  const getSortedTasks = (filteredTasks) => {
    const sorted = [...filteredTasks];
    
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
      default:
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
    }
    
    return sortOrder === 'desc' ? sorted.reverse() : sorted;
  };

  const filteredTasks = getFilteredTasks();
  const sortedTasks = getSortedTasks(filteredTasks);

  /**
   * Toggle sort order
   */
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  /**
   * Get task statistics
   */
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getStats();

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h4 className="task-list-title">
          Your Tasks ({tasks.length})
        </h4>
        <div className="task-stats">
          <span className="stat-badge active-stat">
            Active: {stats.active}
          </span>
          <span className="stat-badge completed-stat">
            Completed: {stats.completed}
          </span>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="filter-controls">
        <Row className="align-items-center g-2">
          <Col xs={12} md={6}>
            <div className="filter-buttons">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline-secondary'}
                size="sm"
                onClick={() => setFilter('all')}
                className="filter-btn"
              >
                All
              </Button>
              <Button
                variant={filter === 'active' ? 'primary' : 'outline-secondary'}
                size="sm"
                onClick={() => setFilter('active')}
                className="filter-btn"
              >
                Active
              </Button>
              <Button
                variant={filter === 'completed' ? 'primary' : 'outline-secondary'}
                size="sm"
                onClick={() => setFilter('completed')}
                className="filter-btn"
              >
                Completed
              </Button>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="sort-controls">
              <Form.Select
                size="sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
              </Form.Select>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={toggleSortOrder}
                className="sort-order-btn"
              >
                {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Task List */}
      <div className="task-items">
        {sortedTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <h5>No tasks found</h5>
              <p className="text-muted">
                {filter === 'all' 
                  ? 'Start by adding a new task above!' 
                  : `No ${filter} tasks available.`}
              </p>
            </div>
          </div>
        ) : (
          sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
