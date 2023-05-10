import React, { 
  useState, 
  useEffect,
  useRef
  } from 'react';
// import axios from 'axios'
// import Button from 'react-bootstrap/Button';
import HookMood from './HookMood';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import HomeChart from './HomeChart';
// import sampleGraph from '../photos/samplehomegraph.png'
import { LoadingComponent } from './LoadingComponent';
import { SampleGraph } from './HomePage/SampleGraph';
// import AiComment from './AiComment';

// const RAINBOW_DARKNESS = "https://rainbowdarkness-server.vercel.app"
// const RAINBOW_DARKNESS = "http://localhost:4000"
const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'

export function HomePage ({ darkMode, graphRef }) {


  const { loginWithRedirect, isAuthenticated, user } = useAuth0()
  
  useEffect (() => {
    document.title = 'Rainbow Darkness';
  }, [])

  const destroyer = useSelector((state) => state.destroyer)
  const isLoadingComponent = useSelector((state) => state.isLoadingComponent)

  const [about, setAbout] = useState(true)

  // hydrates about
  useEffect(() => {
    const data = window.localStorage.getItem('_APP_helptoggle')
    if (data !== null) setAbout(JSON.parse(data))
  }, [])

  // stores about
  useEffect(() => {
    window.localStorage.setItem('_APP_helptoggle', JSON.stringify(about))
  }, [about])

  const AboutHandler = () => {
    setAbout(!about)
  }

  const [toHookMoodClick, setToHookMoodClick] = useState(false)

  // const hookMoodRef = useRef(null)
  const scrollToHookMood = () => {
    window.scrollTo({top: 0, behavior: 'instant'})
    setToHookMoodClick(true)
    setAbout(false)
    setTimeout(() => {
      setToHookMoodClick(false)
    }, 1000)
  }



  return(
  <>
  {/* <div className={isLoadingComponent ? 'bg-purple-400 absolute top-10' : 'text-black absolute top-10 bg-green-600 text-[40px]'}>test test</div> */}
  {isLoadingComponent ? 
  <div className='flex justify-center mt-40'><LoadingComponent /></div>
  : 
  null}
      <div>
        <link rel="shortcut icon" href="/a.png" />
        <div draggable="false" className={isLoadingComponent ? `hidden` : `
        relative mt-[5em] text-center select-none [&>*]:h-[40px]
        max-md:mt-4 max-md:font-bold max-md:[&>p]:text-2xl 
        `}>
          <p className={`${ toHookMoodClick ? 'ratingAnimationToBlackHome tracking-wide font-extralight' : darkMode ? 'text-zinc-200 tracking-wide font-extralight' : 'text-black  font-normal'}
            mb-[60px] text-2xl
            max-md:mt-20 max-md:mb-[10px]`}>
            {destroyer ? null : 'How happy are you today?'}
            {/* {aiText ? aiQuestion : <span className='animate-pulse'>Loading question...</span>} */}
          </p>

          <HookMood darkMode={darkMode} graphRef={graphRef} toHookMoodClick={toHookMoodClick} />

          <div onClick={() => setAbout(true)} className={about || destroyer ? 'hidden' : 'max-md:mt-16 md:mt-24 flex justify-center items-center gap-2 text-zinc-500 hover:cursor-pointer hover:text-zinc-200'}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
              </svg>
            </div>
            <div>Click me for details</div>
          </div>
          <div className={` ${destroyer ? 'hidden' : about ? 'text-center text-lg [&>*]:max-md:w-[360px] flex flex-col items-center m-auto md:[&>*]:w-[700px] md:pt-14 max-md:pt-20  ' : 'hidden'} ${darkMode ? 'font-extralight text-zinc-200 ' : 'text-black'}`}>
            <div className='md:mt-14 group relative hover:cursor-pointer flex items-center gap-2'
            onClick={AboutHandler}>
              {/* <div className='text-center border-t'> */}

              {/* <span
                // className='absolute md:ml-[300px] max-md:hidden text-sm text-blue-400 hover:cursor-pointer hover:underline' 
                > */}
              <div className=' group-hover:text-yellow-200 z-20 max-md:text-blue-400 -mt-8'>
                <span className='md:hidden'>____________________________________</span>
                <span className='max-md:hidden'>_________________________________________________________________________</span>
              </div>

              <div className='w-[80px] float-right group-hover:text-yellow-200 -mt-4 hover:cursor-pointer text-blue-300 flex  flex-row-reverse items-center gap-2'>
                <div className='  bg-transparent  '>
                  dismiss
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z" />
                  </svg>
                </div>
              </div>
              <span className='max-md:hidden group-hover:text-yellow-200 z-20 -mt-8'>_________</span>

            </div>

            { }

            <div className='md:w-[300px] flex justify-center items-center'>
              { }
                Rainbow Darkness is a mental health website that helps you track your daily mood levels. This is designed to give you insight on how to approach your days / daily-stressors based on your mood fluctuations.
              </div>
            <div className='md:flex max-md:flex-col max-md:mt-16 md:justify-center md:mt-20'>
              <div className='md:w-[300px] flex justify-center items-center max-md:mb-12'>
                {/* Your mood levels will be logged to your personal graph and browser cache. */}
                Upon submitting your number, you will be given an interactive graph to see how your mood fluctuates over time:
              </div>
              <span className='w-[330px] md:w-[400px] max-md:m-auto md:ml-8 max-md:mt-2'>
                <SampleGraph darkMode={darkMode} />
                </span>
              {/* <img className='w-[330px] md:w-[400px] max-md:m-auto md:ml-8 max-md:mt-2' draggable={false} src={sampleGraph} alt='sample graph' /> */}
            </div>
            <div className='mt-24'>Use the following scale to record your answer:</div>
            <div>0 = Not At All Happy | 5 = Moderately Happy | 10 = Extremely Happy</div>

            {/* <div className='mt-16 border-t'>Having trouble choosing a number?</div>
            <div>Consider these items that correlates to joviality alongside happiness:</div>
            <div title='Watson, D., & Clark, L. A. (1994). The PANAS-X: Manual for the Positive and Negative Affect Schedule - Expanded Form.' className='border mt-8'>
              <div className='mb-2'>Indicate to what extent you have felt this way today:</div>
              <div className=' flex justify-evenly pb-4 [&>div>div]:text-sm'>
                <div>1
                  <div>very slightly </div>
                  <div className='absolute'>or not at all</div>
                </div>
                <div>2
                  <div>a little</div>
                </div>
                <div>3
                  <div>moderately</div>
                </div>
                <div>4
                  <div>quite a bit</div>
                </div>
                <div>5
                  <div>extremely</div>
                </div>

              </div>
              <div className='mb-4 text-yellow-200'>Cheerful, Joyful, Excited, Enthusiastic, Lively</div>
            </div> */}

            <div>
              {/* <div>Notes from https://www2.psychology.uiowa.edu/faculty/clark/panas-x.pdf</div> */}
              {/* <div>For a more accurate estimate of your mood, try submitting during the evening.</div> */}

              <button
                onClick={scrollToHookMood}
                className='mt-20  bg-blue-400 rounded-lg p-2 md:hover:bg-blue-500'>
                Get Started!
            </button>

            <div className='mt-20 mb-32 text-sm'>
                {/* Optional<span className='invisible'>_</span> */}
                <span className='text-blue-400 hover:cursor-pointer hover:underline' onClick={() => loginWithRedirect()}>
                   Register
                </span> to unlock all graph features and cross-device storage.
              </div>
          </div>
        </div>

        <div className='fixed -bottom-4 text-sm text-zinc-400 flex flex-col font-thin'>
          <div>© 2023 Rainbow Darkness</div>
        </div>

      </div>
      {/* <div className='absolute left-[50%] -translate-x-1/2 top-[140px] text-zinc-200'>{ destroyer ? <AiComment /> : null}</div> */}

      
      <div className={isLoadingComponent ? 'hidden' :'absolute left-[50%] -translate-x-1/2 top-[200px]'}>{ destroyer ? <HomeChart darkMode={darkMode} /> : null}</div>
      </div>
      
      {/* <div className={about ? 'hidden' : isAuthenticated ? 'hidden' : isLoadingComponent ? 'hidden' : 'mt-4 absolute left-[50%] select-none -translate-x-1/2 text-zinc-500 mb-20'}><span className='text-blue-400 hover:cursor-pointer hover:underline' onClick={() => loginWithRedirect()}>Register</span> to track your mood across devices. It's currently free!</div> */}
      
      </>
    )
  }
  