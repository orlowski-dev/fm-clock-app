import { useEffect, useState } from "react"
import { sunIcon } from "../assets/icons_svg"
import './Clock.scss'

const getCurrentTime = (locale: string): string => (
  new Date().toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
)

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime('pl'))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime('pl'))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
  return (
    <section className="clock-section">
      <h2 className='visually-hidden'>Clock</h2>
      <p className="greeting"><img src={sunIcon} alt="sun icon" /> Good morning</p>
      <h1>{currentTime} <span>BST</span></h1>
      <p className="location">In London, UK</p>
    </section>
  )
}