import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function Timer({ taskId, initialTime, isRunning, onUpdate }) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [running, setRunning] = useState(isRunning)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1
          if (newTime <= 0) {
            setRunning(false)
            onUpdate(taskId, 0, false)
            return 0
          }
          onUpdate(taskId, newTime, newTime > 0)
          return newTime
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [running, timeLeft])

  const toggleTimer = () => {
    setRunning(!running)
    if (!running && timeLeft > 0) {
      onUpdate(taskId, timeLeft, true)
    } else {
      onUpdate(taskId, timeLeft, false)
    }
  }

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  return (
    <span className="description">
      <button className={`icon ${running ? 'icon-pause' : 'icon-play'}`} onClick={toggleTimer}></button>
      {formatTime(timeLeft)}
    </span>
  )
}

Timer.propTypes = {
  taskId: PropTypes.number.isRequired,
  initialTime: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
