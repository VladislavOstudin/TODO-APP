import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function Timer({ taskId, initialTime, isRunning, onUpdate }) {
  const timeRef = useRef(initialTime)
  const startTime = useRef(null)
  const requestId = useRef(null)

  // Функция для обновления таймера
  const updateTime = () => {
    const elapsed = (performance.now() - startTime.current) / 1000
    const newTime = Math.max(timeRef.current - Math.floor(elapsed), 0)
    if (newTime !== timeRef.current) {
      timeRef.current = newTime
      onUpdate(taskId, newTime, true)
    }

    if (newTime > 0) {
      requestId.current = requestAnimationFrame(updateTime) // Запрашиваем следующий кадр
    } else {
      onUpdate(taskId, 0, false)
    }
  }

  // Эффект для запуска и остановки таймера
  useEffect(() => {
    timeRef.current = initialTime
    if (isRunning) {
      startTime.current = performance.now() // Начинаем отсчет времени
      requestId.current = requestAnimationFrame(updateTime) // Запускаем анимацию
    }

    return () => cancelAnimationFrame(requestId.current) // Очистка при размонтировании
  }, [isRunning, initialTime])

  const toggleTimer = () => {
    onUpdate(taskId, timeRef.current, !isRunning)
  }

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  return (
    <span className="description">
      <button className={`icon ${isRunning ? 'icon-pause' : 'icon-play'}`} onClick={toggleTimer}></button>
      {formatTime(timeRef.current)}
    </span>
  )
}

Timer.propTypes = {
  taskId: PropTypes.number.isRequired,
  initialTime: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
