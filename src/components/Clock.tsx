import { useEffect, useState } from "react"
import { moonIcon, sunIcon, sunriseIcon, sunsetIcon } from "../assets/icons_svg"
import './Clock.scss'

const getCurrentTime = (locale: string): string => (
  new Date().toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
)

const getGreeting = (): { iconPath: string, text: string } => {
  const hour = new Date().getHours()
  let icon: string = moonIcon
  let greeting = 'Good night'

  if (hour >= 4 && hour < 12) {
    icon = sunriseIcon
    greeting = 'Good morning'
  } else if (hour >= 12 && hour < 18) {
    icon = sunIcon
    greeting = 'Good Afternoon'
  } else if (hour >= 18 && hour < 22) {
    icon = sunsetIcon
    greeting = 'Good Evening'
  } else if (hour >= 22) {
    icon = moonIcon
    greeting = 'Good night'
  }

  return { iconPath: icon, text: greeting }
}

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime('pl'))
  const [greeting, setGreeting] = useState(getGreeting())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime('pl'))
      setGreeting(getGreeting())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
  return (
    <section className="clock-section">
      <h2 className='visually-hidden'>Clock</h2>
      <p className="greeting">
        <img src={greeting.iconPath} alt="icon" />
        {greeting.text}</p>
      <h1>{currentTime} <span>BST</span></h1>
      <p className="location">In London, UK</p>
    </section>
  )
}