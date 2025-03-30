import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

export default function TaskList({ tasks, onToggle, onDelete, onEdit, onUpdate }) {
  return (
    <ul className="todo-list">
      {tasks.length > 0 &&
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdateTask={onUpdate}
          />
        ))}
    </ul>
  )
}

TaskList.defaultProps = {
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

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}
