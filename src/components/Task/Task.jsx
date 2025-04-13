import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import Timer from '../Timer'

import './Task.css'

export default function Task({ task, onToggle, onDelete, onEdit, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(task.text)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (e) => {
    if (e.key === 'Enter' && newText.trim()) {
      onEdit(task.id, newText)
      setIsEditing(false)
    }
  }

  const taskCreatedAt = new Date(task.createdAt)
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(taskCreatedAt, { includeSeconds: true }))

  useEffect(() => {
    let timeoutId

    const updateTime = () => {
      setTimeAgo(formatDistanceToNow(taskCreatedAt, { includeSeconds: true }))
      timeoutId = setTimeout(updateTime, 1000)
    }

    timeoutId = setTimeout(updateTime, 1000)

    return () => clearTimeout(timeoutId)
  }, [taskCreatedAt])

  return (
    <li className={`${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <label>
          <span className="title">{task.text}</span>
          <Timer
            timeLeft={task.timeLeft}
            isRunning={task.isRunning}
            onToggle={() => onUpdateTask(task.id, task.timeLeft, !task.isRunning)}
          />
          <span className="description">created {timeAgo} ago</span>
        </label>
        <button className="icon icon-edit" onClick={handleEdit}></button>
        <button
          className="icon icon-destroy"
          onClick={() => {
            setIsEditing(false)
            onDelete(task.id)
          }}
        ></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleSave}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      )}
    </li>
  )
}

Task.defaultProps = {
  task: {
    id: '',
    text: 'New Task',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  onToggle: () => {},
  onDelete: () => {},
  onEdit: () => {},
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}
