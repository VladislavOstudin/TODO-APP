import { useState } from 'react'

export default function Header() {
  const [now, setNow] = useState(new Date())

  setInterval(() => setNow(new Date()), 1000)

  return (
    <header>
      <span>Time now: {now.toLocaleTimeString()}</span>
      <span>Time now: {now.toLocaleTimeString()}</span>
    </header>
  )
}
