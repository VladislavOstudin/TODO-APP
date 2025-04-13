export default function Timer({ timeLeft, isRunning, onToggle }) {
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  return (
    <div className="description">
      <button className={`icon ${isRunning ? 'icon-pause' : 'icon-play'}`} onClick={onToggle}></button>
      <div>{formatTime(timeLeft)}</div>
    </div>
  )
}
