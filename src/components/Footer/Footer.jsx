import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter'

import './Footer.css'

export default function Footer({ tasksLeft, clearCompleted, allTasks, activeTasks, completedTasks }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter allTasks={allTasks} activeTasks={activeTasks} completedTasks={completedTasks} />
      <button
        className="clear-completed"
        onClick={() => {
          clearCompleted()
        }}
      >
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  tasksLeft: '#',
  clearCompleted: () => {},
  allTasks: () => {},
  activeTasks: () => {},
  completedTasks: () => {},
}

Footer.propTypes = {
  tasksLeft: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  activeTasks: PropTypes.func.isRequired,
  completedTasks: PropTypes.func.isRequired,
}
