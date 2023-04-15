import React, { 
  useState, 
  useEffect } from 'react';
// import axios from 'axios'
// import Button from 'react-bootstrap/Button';
import HookMood from './HookMood';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import HomeChart from './HomeChart';
import sampleGraph from '../photos/samplehomegraph.png'
// import AiComment from './AiComment';


export function HomePage ({ darkMode, graphRef }) {


  const { loginWithRedirect } = useAuth0()
  
  useEffect (() => {
    document.title = 'Rainbow Darkness';
  }, [])

  const destroyer = useSelector((state) => state.destroyer)

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

  return(
  <>
  
  <link rel="shortcut icon" href="/a.png" />
        <div draggable="false" className='
        relative mt-[5em] text-center select-none [&>*]:h-[40px]
        max-md:mt-4 max-md:font-bold max-md:[&>p]:text-2xl 
        '>
            <p className={`${ darkMode ? 'text-zinc-200 tracking-wide font-extralight' :'text-black  font-semibold'}
            mb-[60px] text-2xl
            max-md:mt-20 max-md:mb-[10px]`}>
            {destroyer ?  null : 'How happy are you today?' }
            {/* {aiText ? aiQuestion : <span className='animate-pulse'>Loading question...</span>} */}
            </p>


          {/* <ul className='rating'>
            <li><button type="button" className="btn btn-outline-primary">0</button></li>
            <li><button type="button" className="btn btn-outline-primary">1</button></li>
            <li><button type="button" className="btn btn-outline-primary">2</button></li>
            <li><button type="button" className="btn btn-outline-primary">3</button></li>
            <li><button type="button" className="btn btn-outline-primary">4</button></li>
            <li><button type="button" className="btn btn-outline-primary">5</button></li>
            <li><button type="button" className="btn btn-outline-primary">6</button></li>
            <li><button type="button" className="btn btn-outline-primary">7</button></li>
            <li><button type="button" className="btn btn-outline-primary">8</button></li>
            <li><button type="button" className="btn btn-outline-primary">9</button></li>
            <li><button type="button" className="btn btn-outline-primary">10</button></li>
          </ul> */}
          <HookMood darkMode={darkMode} graphRef={graphRef} />
          
          {/* <iframe title='iframe_mongoDB' 
                    className='  
                    absolute m-auto w-[800px] h-[800px] select-none pb-20 justify-center left-[50%] -translate-x-1/2 pt-4
                    max-md:hidden
                    '  
                    src="https://charts.mongodb.com/charts-project-0-aloyz/embed/dashboards?id=577710d1-e1f2-4d9b-8216-c06878528255&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed">    
                    </iframe> */}

        
        <div onClick={() => setAbout(true)} className={about ? 'hidden' : 'mt-16 text-zinc-500 hover:cursor-pointer hover:text-zinc-200'}>Click me for details</div>
        <div className={` ${destroyer ? 'hidden' : about ? 'text-center text-lg [&>*]:max-md:w-[360px] flex flex-col items-center m-auto md:[&>*]:w-[700px] md:pt-14  ' : 'hidden'} ${darkMode ? 'font-extralight text-zinc-200 ' : 'text-black'}`}>
          <div className='text-center underline border-t'> <span className='absolute md:ml-[300px] max-md:hidden text-sm text-blue-400 hover:cursor-pointer hover:underline' onClick={AboutHandler}>dismiss</span></div>
          <div>Rainbow Darkness tracks your daily mood levels.</div>
          <div className='mt-4'>Use the following scale to record your answer:</div>
          <div>0 = Not At All Happy | 5 = Moderately Happy | 10 = Extremely Happy</div>

          <div className='md:flex max-md:flex-col max-md:mt-6 md:justify-center md:mt-8'>
            <div className='md:w-[300px] flex justify-center items-center'>Your mood levels will be logged to your personal graph and browser cache.</div>
            <img className='w-[240px] max-md:m-auto max-md:mt-2' draggable={false} src={sampleGraph} alt='sample graph' />
          </div>

          <div className='mt-16 border-t'>Having trouble choosing a number?</div>
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
          </div>

          <div>
            {/* <div>Notes from https://www2.psychology.uiowa.edu/faculty/clark/panas-x.pdf</div> */}
            {/* <div>For a more accurate estimate of your mood, try submitting during the evening.</div> */}
            <div className='mt-4 mb-20'><span className='text-blue-400 hover:cursor-pointer hover:underline' onClick={() => loginWithRedirect()}>Register</span> to track your levels across devices.</div>
          </div>
        </div>

        <div className='fixed -bottom-4 text-sm text-zinc-400 flex flex-col font-thin'>
          <div>© 2023 Rainbow Darkness</div>
        </div>

      </div>
      {/* <div className='absolute left-[50%] -translate-x-1/2 top-[140px] text-zinc-200'>{ destroyer ? <AiComment /> : null}</div> */}
      <div className='absolute left-[50%] -translate-x-1/2 top-[200px]'>{ destroyer ? <HomeChart /> : null}</div>
      </>
    )
  }
  