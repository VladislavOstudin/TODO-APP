import { useState, useEffect } from 'react'

import Header from '../Header'
import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'

import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let filtered = tasks
    if (filter === 'active') {
      filtered = tasks.filter((task) => task.completed === false)
    } else if (filter === 'completed') {
      filtered = tasks.filter((task) => task.completed === true)
    }
    setFilteredTasks(filtered)
  }, [tasks, filter])

  useEffect(() => {
    let animationFrameId
    let lastTimestamp = 0
    const interval = 1000

    const updateTasks = (timestamp) => {
      if (!lastTimestamp || timestamp - lastTimestamp >= interval) {
        lastTimestamp = timestamp
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.isRunning && task.timeLeft > 0) {
              const newTime = task.timeLeft - 1
              return {
                ...task,
                timeLeft: newTime,
                isRunning: newTime > 0,
              }
            }
            return task
          })
        )
      }
      animationFrameId = requestAnimationFrame(updateTasks)
    }

    animationFrameId = requestAnimationFrame(updateTasks)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const handleAddTask = (text, timeLeft) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      timeLeft,
      isRunning: false,
    }
    setTasks([...tasks, newTask])
  }

  const handleToggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleEditTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)))
  }

  const tasksLeft = tasks.filter((task) => task.completed === false).length

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => task.completed === false))
  }

  const allTasks = () => setFilter('all')

  const activeTasks = () => setFilter('active')

  const completedTasks = () => setFilter('completed')

  const handleUpdateTask = (id, timeLeft, isRunning) => {
    setTasks((tasks) => tasks.map((task) => (task.id === id ? { ...task, timeLeft, isRunning } : task)))
  }

  return (
    <>
      <Header />
      <section className="todoApp">
        <NewTaskForm onAdd={handleAddTask} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onUpdate={handleUpdateTask}
          />
          <Footer
            tasksLeft={tasksLeft}
            clearCompleted={clearCompleted}
            allTasks={allTasks}
            activeTasks={activeTasks}
            completedTasks={completedTasks}
          />
        </section>
      </section>
    </>
  )
}
