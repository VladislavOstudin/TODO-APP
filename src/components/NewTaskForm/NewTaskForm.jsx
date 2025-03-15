import { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default function NewTaskForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      onAdd(text.trim()) // Передаём новую задачу в App.jsx
      setText('') // Очищаем поле ввода
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
}
