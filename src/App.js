import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { HomePage } from './components/HomePage';
import { TopNav } from './components/TopNav';
import { Routes, Route } from 'react-router-dom'
import Darkness from './components/Darkness';
import { BottomHeader } from './components/BottomHeader';
import breeze from './photos/breeze.png'

export function App() {

  const [help, setHelp] = useState(false)

  const helpHandler = () => {
      setHelp(true)
  }

  const helpRef = useRef()

useEffect(() => {
  document.addEventListener("mousedown", (e) =>{
    if (!helpRef.current.contains(e.target) || helpRef.current.contains(e.target)) {
      setHelp(false)
    }
  })
}, [help])

useEffect (() => {
  document.title = 'Rainbow Darkness';
}, [])

  return (
    <>
      <div className='fixed h-full w-full bg-slate-100' />
    <div className={help ? "blur-xl" : ""}>
      <TopNav />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/darkness' element={<Darkness />} />
      </Routes>

      <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor"
        onClick={helpHandler} ref={helpRef}
        className="absolute top-0 right-0 text-gray-400 pt-[8px] mr-2 
                hover:cursor-pointer hover:text-white
                "
        viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
      </svg>
      </div>

      {/* Help icon */}

      {help ? 
      <div className='fixed select-none animate-fade bg-slate-400 left-[50%] -translate-x-1/2 top-[20%] h-[400px] w-[600px] shadow-inner shadow-zinc-600'>
        <div className='pl-10 pt-10 text-3xl font-bold tracking-tight'>How To Play</div>
        <div className='pl-10 pt-8 text-lg'>Pick a number and submit</div>
        <img src={breeze} alt="resetButton" className='pl-10 pt-4'/>
        <div className='pl-10'>Press to change your number</div>
        <div className='pl-10 pt-4 text-lg'>You can submit every 24 hours!</div>
        </div> 
        : 
        ""}



      <BottomHeader />
    </>
  )
}

