import React, { useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import HookMood from './HookMood';
// import DataPost from './apiComponents/DataPost';

export function HomePage () {
  
  useEffect (() => {
    document.title = 'Rainbow Darkness';
  }, [])

  return(
  <>
  
  <link rel="shortcut icon" href="/a.png" />
        <div draggable="false" className='
        relative mt-[5em] text-center select-none
        max-md:mt-4 max-md:font-bold max-md:[&>p]:text-2xl
        '>
            <p className='
            mb-[60px] text-2xl font-bold italic
            max-md:mt-10 max-md:mb-[10px]
            '>How happy are you today?</p>
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
          <HookMood />
          
          <iframe title='iframe_mongoDB' 
                    className='  
                    absolute m-auto w-[800px] h-[800px] select-none pb-20 justify-center left-[50%] -translate-x-1/2 pt-4
                    max-md:hidden
                    '  
                    src="https://charts.mongodb.com/charts-project-0-aloyz/embed/dashboards?id=577710d1-e1f2-4d9b-8216-c06878528255&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed">    
                    </iframe>

        </div>
      </>
    )
  }
  