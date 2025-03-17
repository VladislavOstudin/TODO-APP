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

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
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
