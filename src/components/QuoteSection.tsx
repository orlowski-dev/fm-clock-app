import { useRef, useState } from 'react'
import './QuoteSection.scss'
import { refreshIcon } from '../assets/icons_svg'
import { getQuote } from './apisCalls'

interface IQuote {
  content: string,
  author: string
}

export const QuoteSection = () => {
  const [isGenerateBtnDisabled, setIsGenerateBtnDisabled] = useState(false)
  const refs = {
    gettingDataErrorSpan: useRef<HTMLSpanElement>(null)
  }
  const [quote, setQuote] = useState<IQuote>({
    content: 'The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.',
    author: 'Ada Lovelace'
  })

  const handleBtnClick = async () => {
    refs.gettingDataErrorSpan.current?.classList.remove('visible')
    setIsGenerateBtnDisabled(true)

    const data = await getQuote().then(data => data)
    if (data) {
      setQuote({ content: data[0], author: data[1] })
    } else {
      refs.gettingDataErrorSpan.current?.classList.add('visible')
    }
    setIsGenerateBtnDisabled(false)
  }

  return <section className="quote-section">
    <h2 className="visually-hidden">Programming quote</h2>
    <blockquote>
      “{quote.content}”
      <cite>
        {quote.author}
      </cite>
    </blockquote>
    <p>Powered by <a href="https://openai.com/blog/openai-api" rel='noreferrer noopener' target='_blank'>OpenAI</a></p>
    <button
      disabled={isGenerateBtnDisabled}
      title='Generate new quote'
      onClick={handleBtnClick}
    >
      <span className="visually-hidden">New quote</span>
      <img src={refreshIcon} alt="refresh icon" />
    </button>
    <span
      className="error"
      ref={refs.gettingDataErrorSpan}
      onClick={(e) => { (e.target as Element).classList.remove('visible') }}
    >Something went wrong. Try again.</span>
  </section>
}

