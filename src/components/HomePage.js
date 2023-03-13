import React, { 
  // useState, 
  useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import HookMood from './HookMood';
// import DataPost from './apiComponents/DataPost';

export function HomePage ({ darkMode }) {
  
  
  useEffect (() => {
    document.title = 'Rainbow Darkness';
  }, [])

  // const [today, setToday] = useState('')

  // useEffect(() => {
  //   const date = new Date()
  //   const pstDate = date.toLocaleTimeString("en-US", {
  //     timeZone: "America/Los_Angeles"
  //   })
  //   // const date = today.getUTCDate()
  //   console.log(pstDate)
  //   setToday(pstDate)
  //   console.log(today + "state")

  // }, [])


  return(
  <>
  
  <link rel="shortcut icon" href="/a.png" />
        <div draggable="false" className='
        relative mt-[5em] text-center select-none
        max-md:mt-4 max-md:font-bold max-md:[&>p]:text-2xl
        '>
            <p className={`${ darkMode ? 'text-zinc-200 tracking-wide font-extralight' :'text-black  font-semibold'}
            mb-[60px] text-2xl  
            max-md:mt-10 max-md:mb-[10px]`}>
            How happy are you today?</p>
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
          <HookMood darkMode={darkMode} />
          
          {/* <iframe title='iframe_mongoDB' 
                    className='  
                    absolute m-auto w-[800px] h-[800px] select-none pb-20 justify-center left-[50%] -translate-x-1/2 pt-4
                    max-md:hidden
                    '  
                    src="https://charts.mongodb.com/charts-project-0-aloyz/embed/dashboards?id=577710d1-e1f2-4d9b-8216-c06878528255&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed">    
                    </iframe> */}

        </div>
      </>
    )
  }
  