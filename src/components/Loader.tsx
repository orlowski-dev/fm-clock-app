import { clockIcon, loadingIcon } from '../assets/icons_svg'
import { useRef, useEffect } from 'react'
import './Loader.scss'

export const Loader = () => {
  const curtainRef = useRef<HTMLDivElement>(null)
  // loader
  useEffect(() => {
    const onPageLoad = () => {
      curtainRef.current?.classList.add('hide')
      setTimeout(() => {
        curtainRef.current?.classList.add('invisible')
      }, 301);
    }

    setTimeout(() => {
      if (document.readyState === 'complete') {
        onPageLoad()
      } else {
        window.addEventListener('load', onPageLoad, false);
        // Remove the event listener when component unmounts
        return () => window.removeEventListener('load', onPageLoad);
      }
    }, 1000)
  }, [])

  return (
    <div className="loader" ref={curtainRef}>
      <div className="content">
        <img src={clockIcon} alt="logo" className='logo' />
        <img src={loadingIcon} alt="loading icon" className='loading' />
      </div>
    </div>
  )
}