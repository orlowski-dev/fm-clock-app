import { useEffect, useState } from 'react'
import './App.scss'
import { Clock } from './components/Clock'
import { QuoteSection } from './components/QuoteSection'
import { Loader } from './components/Loader'

const checkIfIsNight = () => {
  const hours = new Date().getHours()
  return hours >= 22 || hours < 4
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


  return (<>
    <Loader />
    <div className={`bg ${isNight ? 'night' : ''}`}></div>
    <main>
      <QuoteSection />
      <div className="bottom">
        <Clock />
      </div>
    </main>
  </>)
}