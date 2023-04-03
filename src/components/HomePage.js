import React, { 
  useState, 
  useEffect } from 'react';
import axios from 'axios'
// import Button from 'react-bootstrap/Button';
import HookMood from './HookMood';
// import DataPost from './apiComponents/DataPost';

const RAINBOW_DARKNESS = 'https://rainbowdarkness-server.vercel.app'

export function HomePage ({ darkMode, graphRef }) {
  
  // const [aiReq, setAiReq] = useState(true)
  // const [aiText, setAiText] = useState('')
  // const [aiQuestion, setAiQuestion] = useState('')
  // const [aiCitation, setAiCitation] = useState('')

  // useEffect(() => {
  //   const aiFetch = async () => {
  //     try {
  //       // const response = await axios.get(`${RAINBOW_DARKNESS}/aineg`, {
  //         const response = await axios.get(`${RAINBOW_DARKNESS}/aipos`, {
  //         headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       setAiText(response.data.content)
  //       console.log(response.data.content)
  //     } catch (error) {
  //       console.error(error)
  //     }
      
      
  //   }
  //   aiFetch()
  //   setAiReq(false)
  // }, [])

  // useEffect(() => {
  //   const question = aiText
  //   const regex = /\s*\([^)]*\)/; // matches any text within parentheses and the parentheses themselves
  //   const trimmedQuestion = question.replace(regex, '');
  //   // const trimmedCitation = question.filter(regex, '');
  //   setAiQuestion(trimmedQuestion)
  //   // setAiCitation(trimmedCitation)
  // }, [aiText])
  
  useEffect (() => {
    document.title = 'Rainbow Darkness';
  }, [])

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
            How happy are you today?
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

        <div className='fixed bottom-0 w-full text-left text-sm text-zinc-400 flex flex-colfont-thin'>

          <div>© 2023 Rainbow Darkness</div>
        </div>

      </div>
      </>
    )
  }
  