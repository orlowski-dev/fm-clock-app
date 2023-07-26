import { useRef, useState } from 'react'
import './QuoteSection.scss'
import { refreshIcon } from '../assets/icons_svg'

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

  const handleBtnClick = () => {
    setIsGenerateBtnDisabled(true)
    refs.gettingDataErrorSpan.current?.classList.add('visible')
  }

  return <section className="quote-section">
    <h2 className="visually-hidden">Programming quote</h2>
    <blockquote>
      “{quote.content}”
      <cite>
        {quote.author}
      </cite>
      <p>Powered by <a href="https://openai.com/blog/openai-api" rel='noreferrer noopener'>OpenAI</a></p>
    </blockquote>
    <button
      disabled={isGenerateBtnDisabled}
      title='Generate new quote'
      onClick={handleBtnClick}
    >
      <span className="visually-hidden">Generate new quote</span>
      <img src={refreshIcon} alt="refresh icon" />
    </button>
    <span className="error" ref={refs.gettingDataErrorSpan}>Something went wrong. Try again.</span>
  </section>
}