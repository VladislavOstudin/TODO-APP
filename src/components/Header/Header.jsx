import { useState } from 'react'

import './Header.css'

export default function Header() {
  const [now, setNow] = useState(new Date())

  setInterval(() => setNow(new Date()), 1000)

  return (
    <main>
      <header>
        <div className="time">Time now: {now.toLocaleTimeString()}</div>
      </header>
      <h1 className="title">My TODO App</h1>
    </main>
  )
}
