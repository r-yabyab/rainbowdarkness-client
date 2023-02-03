import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { HomePage } from './components/HomePage';
import { TopNav } from './components/TopNav';
import { Routes, Route } from 'react-router-dom'
import Darkness from './components/Darkness';
import { BottomHeader } from './components/BottomHeader';
// import resetArrow from './photos/resetArrow.png'
import GraphPic from './photos/graph-pic.png'

export function App() {

  const [help, setHelp] = useState(false)
  const [pageDetect, setPageDetect] = useState(false)

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
       

       
        <TopNav pageDetect={pageDetect} setPageDetect={setPageDetect} />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/darkness' element={<Darkness />} />
        </Routes>

        <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor"
          onClick={helpHandler} ref={helpRef}
          className="absolute top-0 right-0 text-gray-400 animate-pulse pt-[8px] mr-2 
                hover:cursor-pointer hover:text-white
                "
          viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
        </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" 
                    className="hover:text-white text-slate-900 hover:cursor-not-allowed absolute top-0 right-10 pt-[8px] mr-2" viewBox="0 0 16 16">
  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
</svg>

      </div>

      {/* Help icon */}

      {help ?
        <div className='
        fixed select-none animate-fade bg-slate-400 left-[50%] -translate-x-1/2 top-[12%] h-[740px] w-[600px] shadow-inner shadow-zinc-600
        max-md:w-[340px] max-md:h-[650px] max-md:pl-4 max-md:pr-4 max-md:top-[10%] max-md:
        '>

<div className='absolute right-4 max-md:right-4 md:top-4 max-md:top-4 md:hover:text-white '>
<svg xmlns="http://www.w3.org/2000/svg" width="60" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>
</div>

          <div className='pl-10 pt-8 text-3xl font-bold tracking-tight max-md:pl-0 max-md:pt-6'>How To Play</div>
          <div className='pl-10 pt-8 text-lg max-md:pl-0 max-md:pt-4 max-md:pb-6'>Choose a number based on how happy you are at the moment.</div>

<div className='
max-md:[&>p]:-mb-[3px] max-md:[&>p]:ml-4 
md:ml-10
  md:[&>p]:-mb-[3px] md:[&>p]:ml-4 
'>
  <div className='md:mt-6'>Trouble choosing a number? Consider the following:</div>
<p>- My life conditions are not good.</p>
<p>- My future is bleak.</p>
<p>- I find my life to be purposeful.</p>
<p>- I contribute effectively in society.</p>
<p>- I am not satisfied with my life.</p>
<p>- Usually, I am not able to control my</p>
<p>feelings.</p>
{/* <div className='text-slate-500 text-sm pt-0'>From <i>Development and Standardization of Mental Health Battery for
Visually Impaired (2018)</i></div> */}
</div>

<div className='md:text-center md:pt-6 max-md:pt-6'>Don't forget to compare yourself with the chart. <span className='md:hidden'>It updates daily!</span></div>
<div className='md:text-center max-md:hidden'>It updates daily!</div>
<img className='md:pl-16 md:pr-16' src={GraphPic} />
        </div>
        :
        ""}





      <BottomHeader />
    </>
  )
}

