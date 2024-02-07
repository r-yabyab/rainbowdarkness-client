import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { HomePage } from './components/HomePage';
import { TopNav } from './components/HomePage/TopNav';
import { TopNav2 } from './components/HomePage/TopNav2';
import { Routes, Route } from 'react-router-dom'
import Darkness from './components/AboutPage/Darkness';
import { BottomHeader } from './components/HomePage/BottomHeader';
// import resetArrow from './photos/resetArrow.png'
// import GraphPic from './photos/graph-pic.png'
import { UserProfile } from './components/UserProfile';
// import Memos from './components/Memos';
// import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { Progress } from './components/Progress/Progress';

export function App() {

  const [pageDetect, setPageDetect] = useState(false)

  const [darkMode, setDarkMode] = useState(false)

  const buttonDarkMode = (e) => {
    setDarkMode(!darkMode)
    console.log(darkMode)
  }

  useEffect(() => {
    const darkData = window.localStorage.getItem('_APP_darkmode')
    if (darkData !== null) setDarkMode( JSON.parse(darkData) )
  }, [])

  useEffect (() => {
    window.localStorage.setItem('_APP_darkmode', JSON.stringify(darkMode))
  },[darkMode])

useEffect (() => {
  document.title = 'Rainbow Darkness';
}, [])


const graphRef = useRef(null)

const infoRef = useRef(null)
const navigate = useNavigate();
const location = useLocation();

const scrollToInfo = () => {
  // Check if the current location is not the home route
  if (location.pathname !== '/') {
    // Navigate to the home route
    navigate('/');
  }

  // Scroll to infoRef
  if (infoRef.current) {
    infoRef.current.scrollIntoView({ behavior: 'instant' });
  }
};

  return (
    <>
      {/* <div className={`${ darkMode ? 'inset-0 bg-gradient-to-r to-[#121212] from-zinc-700 ' :  ' inset-0 bg-gradient-to-r from-zinc-400 to-zinc-300 max-md:from-zinc-400 max-md:to-zinc-300'} fixed h-full w-full`} /> */}
      {/* <div className={`${ darkMode ? 'inset-0 bg-gradient-to-r to-[#121212] from-zinc-700 ' :  ' bg-zinc-100 bg-gradient-to-b '} fixed h-full w-full`} /> */}
      <div className={`${ darkMode ? 'inset-0 bg-gradient-to-r to-[#121212] from-zinc-700 ' :  ' bg-zinc-100 bg-gradient-to-b '} `} />
      {/*flat colors <div className={`${ darkMode ? 'bg-[#121212]' :  ' bg-zinc-100'} fixed h-full w-full`} /> */}
      <div className="">


        {/* <TopNav pageDetect={pageDetect} setPageDetect={setPageDetect} darkMode={darkMode} /> */}
        <TopNav2 scrollToInfo={scrollToInfo} pageDetect={pageDetect} setPageDetect={setPageDetect} darkMode={darkMode} />

        <Routes>
          <Route path='/' element={<HomePage darkMode={darkMode} graphRef={graphRef} infoRef={infoRef} />} />
          <Route path='/darkness' element={<Darkness darkMode={darkMode} />} />
          <Route path='/test' element={<UserProfile darkMode={darkMode} />} />
          {/* <Route path='/memo' element={<Memos />} /> */}
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/progress' element={<Progress graphRef={graphRef} darkMode={darkMode} />} />
        </Routes>



        {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor"
          onClick={buttonDarkMode}
          className=
          {`${darkMode ? 'text-zinc-800' : 'text-zinc-600'} hover:text-zinc-700 z-20  hover:cursor-pointer absolute right-10 top-[16px] mr-2`}
          viewBox="0 0 16 16">
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
        </svg> */}

      </div>

      <BottomHeader />
    </>
  )
}

