import Header from './components/Header'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <h1>My TODO App</h1>
      </main>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus />
        </header>
        <section className="main">
          <ul className="todo-list">
            <li className="completed">
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                  <span className="description">Completed task</span>
                  <span className="created">created 17 seconds ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
              </div>
            </li>
            <li className="editing">
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                  <span className="description">Editing task</span>
                  <span className="created">created 5 minutes ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
              </div>
              <input type="text" className="edit" value="Editing task" />
            </li>
            <li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                  <span className="description">Active task</span>
                  <span className="created">created 5 minutes ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
              </div>
            </li>
          </ul>
          <footer className="footer">
            <span className="todo-count">1 items left</span>
            <ul className="filters">
              <li>
                <button className="selected">All</button>
              </li>
              <li>
                <button>Active</button>
              </li>
              <li>
                <button>Completed</button>
              </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
          </footer>
        </section>
      </section>
    </>
  )
}
