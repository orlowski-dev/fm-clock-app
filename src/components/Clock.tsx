import { useEffect, useState, useRef } from "react"
import { arrowDownIcon, locationDisableIcon, moonIcon, sunIcon, sunriseIcon, sunsetIcon } from "../assets/icons_svg"
import './Clock.scss'
import { IGeoLocation, getGeoLocation, getTimezoneInfo } from "./apisCalls"
import { IStates } from "../App"

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

const getCalculatedDate = () => {
  const date = new Date()
  const time = date.getTime()
  const dayOfYear = Math.floor((time - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const dayOfWeak = date.getDay();
  const weekNumber = Math.floor(dayOfYear / 7)
  return { dayOfYear, dayOfWeak, weekNumber }
}

interface IClockMoreRefs {
  mainClockContainer: React.RefObject<HTMLDivElement>,
  clockMore: React.RefObject<HTMLDivElement>,
  button: React.RefObject<HTMLButtonElement>
}



export const Clock = ({ states }: IStates) => {
  const [locationData, setLocationData] = useState<IGeoLocation>()
  // get ip location data
  useEffect(() => {
    const getData = async () => {
      const location: IGeoLocation = await getGeoLocation().then(data => data)
      if (!location) {
        setLocationData({ errorMsg: 'Cannot fetch geolocation data.' })
        return
      }
      if (!location.location) return

      // get timezone abbraviation
      const abbr: IGeoLocation = await getTimezoneInfo(location.location.lat, location.location.lng)

      setLocationData({
        location: location.location,
        abbreviation: abbr.abbreviation,
        zoneName: abbr.zoneName
      })
    }
    getData()
  }, [])

  // time
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime(locationData?.location?.country || 'pl'))
  const [greeting, setGreeting] = useState(getGreeting())

  // set clock and greeting
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime(locationData?.location?.country || 'pl'))
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

  const displayLocation = () => {
    if (!locationData?.errorMsg) {
      return <p className="location">
        In {locationData?.location?.city}, {locationData?.location?.country}
      </p>
    } else {
      return <p className="location error">
        <img src={locationDisableIcon} alt="location disable icon" />{locationData.errorMsg}
      </p>
    }
  }

  const calculatedDate = getCalculatedDate()

  // more
  const clockMoreRefs: IClockMoreRefs = {
    mainClockContainer: useRef<HTMLDivElement>(null),
    clockMore: useRef<HTMLDivElement>(null),
    button: useRef<HTMLButtonElement>(null)
  }

  const showMore = () => {
    if (!states.isClockMoreVisible?.value) {
      clockMoreRefs.mainClockContainer?.current?.classList.add('more-visible')
      clockMoreRefs.button.current?.classList.add('change-state')
      setCsTranslate(0)
    } else {
      clockMoreRefs.mainClockContainer?.current?.classList.remove('more-visible')
      clockMoreRefs.button.current?.classList.remove('change-state')
      clockMoreRefs.clockMore.current?.offsetHeight && setCsTranslate(clockMoreRefs.clockMore.current?.offsetHeight)
    }
  }

  // set clock more section translatY
  const [csTranslate, setCsTranslate] = useState(0)
  useEffect(() => {
    clockMoreRefs.clockMore.current?.offsetHeight && setCsTranslate(clockMoreRefs.clockMore.current?.offsetHeight)
  }, [])
  const handleClick = () => {
    states.isClockMoreVisible?.setValue && states.isClockMoreVisible.setValue(!states.isClockMoreVisible.value)
    showMore()
  }

  return (
    <div
      className="clock"
      ref={clockMoreRefs.mainClockContainer}
      style={{ transform: `translateY(${csTranslate}px)` }}
    >
      <section className="clock-section">
        <h2 className='visually-hidden'>Clock</h2>
        <p className="greeting">
          <img src={greeting.iconPath} alt="icon" />
          {greeting.text}</p>
        <h1>{displayTime(currentTime)} <span className="abbr">{locationData?.abbreviation}</span></h1>
        {displayLocation()}
        <div className="button-area">
          <button
            className="btn-show-more"
            onClick={handleClick}
            ref={clockMoreRefs.button}
          >
            {states.isClockMoreVisible?.value && <span>less</span> || <span>more</span>}<img src={arrowDownIcon} alt='arrow icon' />
          </button>
        </div>
      </section>
      <section
        className={`clock-more ${states.isNightTime ? 'night-time' : ''}`}
        ref={clockMoreRefs.clockMore}
      >
        <div className="container">
          <div className="content">
            <h2 className="visually-hidden">More</h2>
            <article>
              <h2>current timezone</h2>
              <p>{locationData?.zoneName || '-'}</p>
            </article>
            <article>
              <h2>day of the year</h2>
              <p>{calculatedDate.dayOfYear}</p>
            </article>
            <article>
              <h2>day of the week</h2>
              <p>{calculatedDate.dayOfWeak}</p>
            </article>
            <article>
              <h2>week number</h2>
              <p>{calculatedDate.weekNumber}</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}