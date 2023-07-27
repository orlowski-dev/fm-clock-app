import { useEffect, useState } from "react"
import { moonIcon, sunIcon, sunriseIcon, sunsetIcon } from "../assets/icons_svg"
import './Clock.scss'
import { ILocationData, getIPLocationData, getNewIPLocationData } from "./apisCalls"

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
  const [locationData, setLocationData] = useState<ILocationData>()
  // get ip location data
  useEffect(() => {
    const getData = async () => {
      const responseData: ILocationData = await getIPLocationData().then(data => data)
      if (responseData && responseData.status !== 'fail') setLocationData(responseData)
    }
    getData()
  }, [])

  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime('pl'))
  const [greeting, setGreeting] = useState(getGreeting())

  // set clock and greeting
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime('pl'))
      setGreeting(getGreeting())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  const displayTime = (time: string) => {
    const timeArr = time.split(' ')
    return <>
      {timeArr[0]} <span className="am">{timeArr[1]}</span>
    </>
  }


  return (
    <section className="clock-section">
      <h2 className='visually-hidden'>Clock</h2>
      <p className="greeting">
        <img src={greeting.iconPath} alt="icon" />
        {greeting.text}</p>
      <h1>{displayTime(currentTime)} <span className="abbr">BST</span></h1>
      <p className="location">In {locationData?.city}, {locationData?.countryCode}</p>
    </section>
  )
}