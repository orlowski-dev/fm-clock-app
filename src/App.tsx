import { useEffect, useState } from 'react'
import './App.scss'
import { Clock } from './components/Clock'
import { QuoteSection } from './components/QuoteSection'
import { Loader } from './components/Loader'

const checkIfIsNight = () => {
  const hours = new Date().getHours()
  return hours >= 22 || hours < 4
}

export interface IStates {
  states: {
    isClockMoreVisible?: {
      value: boolean,
      setValue?: React.Dispatch<React.SetStateAction<boolean>>
    },
    isNightTime?: boolean
  }
}

export default function App() {

  const [isNight, setIsNight] = useState(checkIfIsNight())
  // check if night time
  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight(checkIfIsNight())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  const [isMoreVisible, setIsMoreVisible] = useState(false)

  return (<>
    <Loader />
    <div className={`bg ${isNight ? 'night' : ''}`}></div>
    <main>
      <QuoteSection states={{
        isClockMoreVisible: { value: isMoreVisible }
      }} />
      <div className="bottom">
        <Clock states={{
          isClockMoreVisible: { value: isMoreVisible, setValue: setIsMoreVisible },
          isNightTime: isNight
        }} />
      </div>
    </main>
  </>)
}