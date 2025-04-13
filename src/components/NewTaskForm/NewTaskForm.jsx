import { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default function NewTaskForm({ onAdd }) {
  const [text, setText] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim() && (minutes || seconds)) {
      const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)
      onAdd(text.trim(), totalSeconds)
      setText('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) setMinutes(e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={seconds}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) setSeconds(e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
}
