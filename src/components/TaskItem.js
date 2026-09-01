import React, { useState } from 'react';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTrash, FaUndo, FaClock } from 'react-icons/fa';
import './TaskItem.css';

/**
 * TaskItem Component
 * Displays individual task with options to complete, edit, and delete
 * Includes confirmation dialog for deletion
 */
const TaskItem = ({ task, toggleComplete, deleteTask, editTask }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isCompleted = task.completed;

  /**
   * Handle task deletion with confirmation
   */
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  /**
   * Confirm deletion
   */
  const confirmDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
  };

  /**
   * Cancel deletion
   */
  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  /**
   * Handle edit task
   */
  const handleEdit = () => {
    editTask(task);
  };

  /**
   * Handle toggle complete
   */
  const handleToggleComplete = () => {
    toggleComplete(task.id);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Card className={`task-item ${isCompleted ? 'completed' : 'active'}`}>
        <Card.Body>
          <div className="task-content">
            <div className="task-header">
              <div className="task-title-section">
                <h5 className={`task-title ${isCompleted ? 'completed-text' : ''}`}>
                  {task.name}
                </h5>
                <Badge className={`task-status ${isCompleted ? 'bg-success' : 'bg-primary'}`}>
                  {isCompleted ? 'Completed' : 'Active'}
                </Badge>
              </div>
              <div className="task-actions">
                <Button
                  variant={isCompleted ? 'warning' : 'success'}
                  size="sm"
                  onClick={handleToggleComplete}
                  className="action-btn toggle-btn"
                  title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {isCompleted ? <FaUndo /> : <FaCheck />}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleEdit}
                  className="action-btn edit-btn"
                  title="Edit task"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDelete}
                  className="action-btn delete-btn"
                  title="Delete task"
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
            
            <p className={`task-description ${isCompleted ? 'completed-text' : ''}`}>
              {task.description}
            </p>
            
            <div className="task-footer">
              <span className="task-date">
                <FaClock /> Created: {formatDate(task.createdAt)}
              </span>
              {task.completedAt && (
                <span className="task-completed-date">
                  ✓ Completed: {formatDate(task.completedAt)}
                </span>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the task:</p>
          <h6 className="text-danger">"{task.name}"</h6>
          <p className="text-muted">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <FaTrash /> Delete Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskItem;
