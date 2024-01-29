import React, { 
  useState, 
  useEffect
  } from 'react';
// import axios from 'axios'
// import Button from 'react-bootstrap/Button';
import HookMood from './HookMood';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import HomeChart from './HomeChart';
// import sampleGraph from '../photos/samplehomegraph.png'
import { LoadingComponent } from './LoadingComponent';
import { SampleGraph } from './HomePage/SampleGraph';
import { PublicChart } from './HomePage/PublicChart';
import sharkPNG from '../photos/shark.png'
import sharkPNGMobile from '../photos/sharkmobile.png'
import sharkSmall from '../photos/sharksmall.webp'
import { fetchLastAll } from '../state/reducers/thunk-reducers/fetchLastReducer';
import { ChartTooltips } from './apiComponents/ChartTooltips';
import { HomeChartHolder } from './apiComponents/HomeChartHolder';
import PieChartHome from './HomePage/PieChartHome';
// import { MongoChart } from './apiComponents/MongoChart';
// import { MongoRaw } from './HomePage/MongoRaw';
// import AiComment from './AiComment';

// const RAINBOW_DARKNESS = "https://rainbowdarkness-server.vercel.app"
// const RAINBOW_DARKNESS = "http://localhost:4000"
const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'

const getDatafromLS = () => {
  const moogleData = localStorage.getItem('_APP_moogle');
  if (moogleData) {
      return JSON.parse(moogleData)
  } else {
      return []
  }
}

export function HomePage ({ darkMode, graphRef, infoRef }) {

  const books = getDatafromLS()

  const { loginWithRedirect, isAuthenticated, user } = useAuth0()
  
  useEffect (() => {
    document.title = 'Rainbow Darkness';
  }, [])

  // redux
  const destroyer = useSelector((state) => state.destroyer)
  const isLoadingComponent = useSelector((state) => state.isLoadingComponent)
  const editSubmissionTrigger = useSelector((state) => state.editSubmissionTrigger)
  const tooltipContent = useSelector((state) => state.tooltipContent)
  const dispatch = useDispatch()
  const rainbowLastAll = useSelector((state) => state.rainbowLastAll)
  
  // refreshes the data for fetchLastAll
  useEffect(() => {
    dispatch(fetchLastAll())
  }, [editSubmissionTrigger, destroyer])

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
    // setAbout(false)
    setTimeout(() => {
      setToHookMoodClick(false)
    }, 1000)
  }

  // to move to Redux Thunk
  const [rawNumArr, setRawNumArr] = useState([])

  useEffect(() => {
    const fetchNums = async () => {
      const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`)
      const json = await response.json()
      
      if (response.ok) {
        setRawNumArr(json)
      }
    }
    fetchNums()
  }, [])



  return(
  <>
  {/* <div className={isLoadingComponent ? 'bg-purple-400 absolute top-10' : 'text-black absolute top-10 bg-green-600 text-[40px]'}>test test</div> */}
  {isLoadingComponent ? 
  <div className='flex justify-center'><LoadingComponent /></div>
  : 
        null}
        
                {/* <div 
          className={` ${ isLoadingComponent || destroyer ? 'hidden' : ''} ${ darkMode ? 'bg-black -mt-2 ' : 'bg-zinc-200'} z-0 absolute min-h-[480px] w-full  shadow-sm `}
          style={{ padding: '0 0px', margin: '0 0px' }}
          /> */}
      <div className="bg-zinc-100 bg-gradient-to-b fixed h-full w-full " />
      
      <div className='overflow-x-clip'>
 
        <link rel="shortcut icon" href="/a.png" />
        <div draggable="false" className={isLoadingComponent ? `hidden` : `
        relative  text-center select-none [&>*]:h-[40px]
         max-md:font-bold  
        `}>

          <div className={ destroyer ? '' : 'min-h-[100vh] flex flex-col bg-zinc-100 bg-gradient-to-b from-blue-800 to-transparent justify-center'}>
            
            {/* <div className=''> */}
            <div className={`${toHookMoodClick && !darkMode ? 'ratingAnimationToBlackHomeDarkMode tracking-wide font-extralight' : toHookMoodClick && !darkMode ? 'ratingAnimationToBlackHomeLightMode' : darkMode ? 'text-zinc-100 tracking-wide font-extralight' : 'text-zinc-100 tracking-wide font-light'}
               text-2xl z-10
               max-md:mb-[0px]
               ${destroyer ? '' : 'mb-[60px]'}
               `
               }>
              {destroyer ? null : 'How happy are you today?'}
              {/* <img 
                className='absolute opacity-10 top-0 left-[50%] pointer-events-none
                max-md:hidden
                ' 
                src={sharkPNG} alt='shark' />
              <img 
                className='absolute opacity-10 top-0 right-0 pointer-events-none
                md:hidden
                ' 
                src={sharkPNGMobile} alt='shark' /> */}
            </div>
            <HookMood darkMode={darkMode} graphRef={graphRef} toHookMoodClick={toHookMoodClick} />
          </div>

          <div
            onClick={() => setAbout(true)}
            className={about || destroyer ? 'hidden' : ' flex justify-center items-center gap-2 text-zinc-500 hover:cursor-pointer hover:text-zinc-200'}
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
              </svg>
            </div>
            <div>Click me for details</div>
          </div>

          <div className={` ${destroyer ? 'hidden' : about ? 'text-center slide-from-leftREMOVE text-lg [&>*]:max-md:w-[360px] flex flex-col items-center m-auto md:[&>*]:w-[700px] md:pt-14 max-md:pt-20  ' : 'hidden'} ${darkMode ? 'font-extralight text-zinc-200 ' : 'text-black font-normal'}`}>
            {/* <div className=' group relative hover:cursor-pointer flex justify-center items-center gap-2'
            onClick={AboutHandler}>

              <div className=' group-hover:text-yellow-200 z-20 max-md:text-blue-400 -mt-8'>
                <span className='md:hidden '>_________________________</span>
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

            </div> */}

            

            <div className='md:w-[300px] flex flex-col gap-4  mb-8'>
              <div ref={infoRef} className='text-3xl font-semibold border-zinc-300 pb-2 text-left border-b-2 mt-16 md:w-[370px]'>About Rainbow Darkness</div>
              <div className='text-left'>Rainbow Darkness is a mental health website that helps you track your daily mood levels,
                 designed to give you insight on how to approach your days based on 
                your mood fluctuations and daily activities. Comes with an interactive chart to help you easily track or change your mood history
                with the option to share with others.
              </div>
            </div>

            <div className='mt-24 max-md:mt-32 '>
              {/* <div className='mb-4'>Join a growing community! Currently, we have <span className='text-red-400'>{rawNumArr.length}</span> submissions.</div> */}
              
              {/* <div className='mb-4 opacity-[99%] font-semibold'>Join a growing community of <span className='text-green-400'>{rawNumArr.length}</span> daily moods!</div>
              <div className='flex flex-col absolute ml-16 text-sm'>
                <div className='flex float-left items-center gap-2'>
                  <div className='w-[12px] h-[2px] bg-red-700'></div>
                  <div>Avg Mood</div>
                </div>
                <div className='flex float-left items-center gap-2'>
                  <div className={`w-[12px] h-[12px] ${darkMode ? "bg-[#1f1f1f]" : "bg-[#e0e0e0]"} `}></div>
                  <div>Users</div>
                </div>
              </div>

              <div className=''><PublicChart darkMode={darkMode} /></div> */}

              <div className='md:flex max-md:flex max-md:flex-col-reverse items-center md:w-[700px] md:h-[300px]'>
              <div className='md:-ml-28 max-md:mb-8'><PieChartHome /></div>
              <div className='mb-4'>
                <div className='font-bold text-2xl text-left border-zinc-400 border-b-2 pb-2 mb-4 md:w-[200px]'>Join a growing community!</div> 
                <div className='text-left'>To date, we have <span className='text-green-500'>{rawNumArr.length}</span> submissions.</div>
                </div>
              </div>
              {/* <div className='mt-[400px] mb-20'>
                <MongoRaw />
              </div> */}
              {/* <div className='mt-[400px] mb-20 group'>
                <div className='absolute ml-10 group-hover:text-zinc-900 hover:cursor-text tracking-tight text-zinc-100 text-sm mt-[478px]'>O Next refresh in an hour</div>
                <MongoChart darkMode={darkMode} />
              </div> */}
              {/* <div>
              <iframe title='iframe_mongoDB' className='  
                    m-auto w-[1000px] h-[740px] select-none'
              src="https://charts.mongodb.com/charts-project-0-aloyz/embed/dashboards?id=577710d1-e1f2-4d9b-8216-c06878528255&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed">
            </iframe>
              </div> */}
            </div>




            <div className='md:flex max-md:flex-col max-md:mt-32 md:justify-center md:mt-36'>
              <div className='md:w-[300px] flex justify-center items-center max-md:mb-12'>
                {/* Your mood levels will be logged to your personal graph and browser cache. */}
                <div className='flex flex-col gap-2'>
                  <div className=' font-bold text-2xl text-left border-zinc-400 border-b-2 w-[160px] mb-2'>How it works</div>
                  <div className='text-left'>
                    {/* Upon submitting your number, you will be given an interactive graph to see how your mood fluctuates over time: */}
                  Submit your number daily (0 being not at all happy & 10 being extremely happy) and watch how your mood changes over the days. <br /><span className={darkMode ? ' text-zinc-500' : " text-zinc-400"}>Register to view your data across devices!</span>
                  </div>
                </div>
              </div>
              <div className='w-[330px] md:w-[400px] max-md:m-auto md:ml-8 max-md:mt-2'>
                <SampleGraph darkMode={darkMode} />
              </div>
              {/* <img className='w-[330px] md:w-[400px] max-md:m-auto md:ml-8 max-md:mt-2' draggable={false} src={sampleGraph} alt='sample graph' /> */}
            </div>
            <div className={tooltipContent.mood ? 'pt-10' : 'hidden'}><ChartTooltips /></div>

            <div className=' mt-16'>
              <div className='text-3xl font-semibold  mb-10 border-zinc-400 border-b-2 pb-2 mt-16'>Key Features</div>
              <div className='flex gap-10
              [&>div]:w-[300px] [&>div]:rounded-md [&>div]:p-6 
              [&>div>svg]:m-auto
              [&>div]:flex [&>div]:flex-col [&>div]:gap-y-3
              max-md:flex-col [&>div]:max-md:w-full text-zinc-900
              [&>div>p]:mt-'>
                <div className='bg-emerald-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                  </svg>
                  <div className=' text-xl font-semibold'>Mood Tracking</div>
                  <p className=' text-base'>Track your mood daily, alongside sleep, activites, and more. See how your mood changes over the days.</p>
                </div>
                <div className='bg-blue-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07" />
                  </svg>
                  <div className='text-xl font-semibold'>Charts</div>
                  <p className=' text-base'>Use the interactive mood chart to see how your mood correlates with your daily activies, or edit previous entries. </p>
                </div>
                <div className='bg-violet-400'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                  </svg>
                  <div className='text-xl font-semibold'>Sharing Moods</div>
                  <p className=' text-base'>Share your mood history with your friends by downloading your mood chart as a PNG.</p>
                </div>
              </div>
            </div>
  



            {/* <div className='mt-32'>Use the following scale to record your answer:</div>
            <div>0 = Not At All Happy | 5 = Moderately Happy | 10 = Extremely Happy</div> */}
            
            <div>
              <div className='text-4xl mt-28'>Ready to start?</div>
              <div className='mt-3'>Start tracking your mood today. No registration required!</div>
              <button
                onClick={scrollToHookMood}
                className='rounded-lg mt-12 bg-orange-500 p-2 w-[160px]'>
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16"
                  className='m-auto'
                >
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg>
              </button>
            </div>




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

              {/* <button
                onClick={scrollToHookMood}
                className='mt-20 shadow-md group z-0 overflow-hidden font-semibold relative text-black bg-blue-400 rounded-lg p-2 md:hover:bg-yellow-500'>
                <div className='pr-4 pl-4 pt-2 pb-2'>Get Started!</div>
                <img className=' -z-10 pointer-events-none opacity-80  absolute top-0 -mt-1 ml-10 text-clip overflow-hidden'
                  // style={{ zIndex: -1 }}
                  src={sharkSmall} alt="small shark" />
              </button> */}

                {/* <img  className=' pointer-events-none opacity-80 absolute top-0 -mt-1 ml-10 text-clip overflow-hidden'
                style={{ zIndex: -1 }}
                src={sharkPNG} alt="small shark" /> */}

              <div className={`${darkMode ? 'text-zinc-500' : 'text-zinc-400'} mt-20 mb-32 text-sm`}>
                {/* Optional<span className='invisible'>_</span> */}
                <span className='text-blue-400 hover:cursor-pointer hover:underline' onClick={() => loginWithRedirect()}>
                  Register
                </span> to unlock all graph features and cross-device storage.
              </div>
              <div className='absolute text-sm text-zinc-400 left-0'>© 2024 Rainbow Darkness</div>
            </div>
          </div>


        {/* <div className='fixed -bottom-4 text-sm text-zinc-400 flex flex-col font-thin'>
          <div>© 2023 Rainbow Darkness</div>
        </div> */}

        </div>
        {/* <div className='absolute left-[50%] -translate-x-1/2 top-[140px] text-zinc-200'>{ destroyer ? <AiComment /> : null}</div> */}

        {/* HOMECHART */}
        <div className={isLoadingComponent ? 'hidden' : books.length === 1 ? 'hidden' : 'absolute left-[50%] -translate-x-1/2 top-[200px]'}>
          {destroyer ? <HomeChart darkMode={darkMode} /> : null}
        </div>
        {/* <div><HomeChartHolder /></div> */}
      </div>

      
      {/* <div className={about ? 'hidden' : isAuthenticated ? 'hidden' : isLoadingComponent ? 'hidden' : 'mt-4 absolute left-[50%] select-none -translate-x-1/2 text-zinc-500 mb-20'}><span className='text-blue-400 hover:cursor-pointer hover:underline' onClick={() => loginWithRedirect()}>Register</span> to track your mood across devices. It's currently free!</div> */}
      
      </>
    )
  }
  