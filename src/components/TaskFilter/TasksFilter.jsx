import { useState } from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

export default function TaskFilter({ allTasks, activeTasks, completedTasks }) {
  const [isActive, setIsActive] = useState('All')

  return (
    <ul className="filters">
      <li>
        <button
          className={isActive === 'All' ? 'selected' : ''}
          onClick={() => {
            setIsActive('All')
            allTasks()
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={isActive === 'Active' ? 'selected' : ''}
          onClick={() => {
            setIsActive('Active')
            activeTasks()
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={isActive === 'Completed' ? 'selected' : ''}
          onClick={() => {
            setIsActive('Completed')
            completedTasks()
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  allTasks: () => {},
  activeTasks: () => {},
  completedTasks: () => {},
}

TaskFilter.propTypes = {
  allTasks: PropTypes.func.isRequired,
  activeTasks: PropTypes.func.isRequired,
  completedTasks: PropTypes.func.isRequired,
}
