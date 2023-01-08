import React from 'react';
import Button from 'react-bootstrap/Button';
import DarkLight from './DarkLight';
import MoodRating from './MoodRating';
import HookMood from './HookMood';
import { DataFetch } from './DataFetch';

export function HomePage () {

  return(
  <>
        <div draggable="false" className='relative mt-[5em] text-center select-none'>
            <p className='mb-4 text-lg'>Hours of sleep u got today</p>
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
          
        </div>

        <DataFetch />


  
        {/* <MoodRating /> */}


        <div className='bodycontainer'>
            {/* <MoodRating /> */}
            
        </div>

      </>
    )
  }
  