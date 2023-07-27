import './App.scss'
import { Clock } from './components/Clock'
import { QuoteSection } from './components/QuoteSection'

export default function App() {

  return (<>
    <div className="bg"></div>
    <main>
      <QuoteSection />
      <div className="bottom">
        <Clock />
      </div>
    </main>
  </>)
}