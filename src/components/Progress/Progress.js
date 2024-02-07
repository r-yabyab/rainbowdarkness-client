import React, { useEffect, useState, useRef, useReducer} from 'react';
import { Button } from 'react-bootstrap';
import DataFetch from '../apiComponents/DataFetch';
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeChart from '../HomeChart';
import { ChartTooltips } from '../apiComponents/ChartTooltips';
import { fetchLastAll } from '../../state/reducers/thunk-reducers/fetchLastReducer';



const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'  //

const getDatafromLS = () => {
    const moogleData = localStorage.getItem('_APP_moogle');
    if (moogleData) {
        return JSON.parse(moogleData)
    } else {
        return []
    }
}

export function Progress ({ darkMode, graphRef }) {

    const dispatch = useDispatch()
    const { setDestroyer, setisLoadingComponent } = bindActionCreators(actionCreators, dispatch)
    const destroyer = useSelector((state) => state.destroyer)
  const tooltipContent = useSelector((state) => state.tooltipContent)
  const editSubmissionTrigger = useSelector((state) => state.editSubmissionTrigger)
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  const navigate = useNavigate();

  const [diffMs, setDiffMs] = useState(0)
  // 0-23 hours
//   const [lastSubmissionHour, setLastSubmissionHour] = useState(0)
  // typically 1-30
//   const [lastSubmissionDate, setLastSubmissionDate] = useState(0)
  const [diffDate, setDiffDate] = useState(0)
  const [localeHours, setLocaleHours] = useState(0)

    const isLoadingComponent = useSelector((state) => state.isLoadingComponent)

    const books = getDatafromLS()
    let [numberForStorage, setNumberForStorage] = useState('')
    let [number, setNumber] = useState(null);

    const { isAuthenticated, user, isLoading } = useAuth0();
  const [userNums, setUserNums] = useState('')

  useEffect(() => {
    dispatch(fetchLastAll())
  }, [editSubmissionTrigger])

  // useEffect(() => {
  //   dispatch(fetchLastAll());
  // }, [])




    useEffect(() => {
        setNumberForStorage(number)
    },[number])

    const [aiText, setAiText] = useState('')
    const todayNumberForAi = () => {
        if (books && books.length > 0) {
            const num1 = books && books.map(book => book.inputNumber).slice(-1)[0];
            return num1
        } else {
            return 'awaiting number'
        }
    }
    
    const yesterdayNumberForAi = () => {
        if (books && books.length > 1) {
            const num2 = books && books.map(book => book.inputNumber).slice(-2)[0];
            return num2
        } else {
            return 'this is my first submission!'
        }
    }

    useEffect(() => {
        if (destroyer) {
      const aiFetch = async () => {
        try {
            const response = await axios.get(`${RAINBOW_DARKNESS}/aicomment?todaynumber=${todayNumberForAi()}&yesterdaynumber=${yesterdayNumberForAi()}`, {
            headers: {
            'Content-Type': 'application/json',
          },
        })
          setAiText(response.data.content)
        //   console.log(response.data.content)
        //   console.log(todayNumberForAi + "today")
        //   console.log(yesterdayNumberForAi + "yesterday")
        } catch (error) {
          console.error(error)
        }
        
        
      }
      aiFetch()
    }
    }, [destroyer])

  useEffect(() => {
    if (isAuthenticated) {
        const fetchUserNums = async () => {
          if (isAuthenticated) {
            try {
              const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/lastnumuser?sub=${user.sub}`)
              const json = await response.json()
        
              if (response.ok) {
                setUserNums(json)
                // console.log('user nums' + userNums )
                // setRecentNumTimeEpoch(userNums && userNums[0].createdAt)

              }
            } catch (error) {
              console.error(error)
            }
          } else {
            // console.log('not logged in')
          }
        }
      
        fetchUserNums()

    } else {
    //   console.log('not registered')
    }
  }, [isAuthenticated])

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            setisLoadingComponent(false)
        }
    }, [isLoading])

    useEffect(() => {
      if (userNums) {
      const dateStringRecent = userNums[0].createdAt
      const dateObj = new Date(dateStringRecent)
      const timeStringRecent = Date.parse(dateObj)
  
      const localeTimeHours = dateObj.getHours()
      // setLastSubmissionHour(localeTimeHours)
      const localeTimeDate = dateObj.getDate()
      // setLastSubmissionDate(localeTimeDate)
  
  
      const dateNow = Date.now()
      const dateNow1 = new Date()
      const todayHour = dateNow1.getHours()
      const todayDate = dateNow1.getDate()
      const diffDate = dateNow - timeStringRecent
      setDiffMs(diffDate)
      setDiffDate(todayDate - localeTimeDate)
      setLocaleHours(todayHour)
      setisLoadingComponent(false)
  }
    }, [userNums])
  
  //
  const [staticTime, setStaticTime] = useState(0)
  // let [timeLeft, setTimeLeft] = useState(86400000)
  let [timeLeft, setTimeLeft] = useState(86400000)
  
  
  // getStorage
  // logic for when destroyer get cleared after 24 hours is up
      useEffect(() => {
  
          if (!isAuthenticated) {
          const data = window.localStorage.getItem('_APP');
          const dataTime = window.localStorage.getItem('_APP_timer');
          if ( dataTime !== null ) setStaticTime(JSON.parse(dataTime));
          if ( data !== null ) setDestroyer(JSON.parse(data));
   
          const currentTime = Date.now()
          const timePassed = currentTime - dataTime
          
          // if (timePassed > 86400000) { //24 hours
              if (timePassed > 82800000) { // 23 hours
              setDestroyer(false)
              setStaticTime(0)
              
          }
          // // 86400000 == 24hrs
          // // 10000 == 10secs
          // for printing countdown
          const countdown = 86400000 - timePassed
          // console.log(timePassed)
          setTimeLeft(countdown)
  
          // x => x -1000 for countdown every 1 second
          setInterval(() => {
              setTimeLeft(x => x -30000)
          },30000)
          
      }
      else {
          // gets most recent user's submission in ms
  
          // if (diffMs > 82800000) {
              // if ((localeHours >= 17 && Math.abs(diffDate) == 1) || (diffDate >= 2)) {
              if ((localeHours >= 17 && Math.abs(diffDate) >= 1)) {
              // console.log('TIME PASSED, DESTROYER TURN OFF')
              setDestroyer(false)
          } else {
              // THIS FIRES FIRST BECAUSE CHECKING DIFFMS
              // console.log('WAIT WAIT WAIT' + diffMs)
              // console.log('diffDate' + Math.abs(diffDate))
              // console.log('localeHours' + localeHours)
              setDestroyer(true)
          }
      }
      // setTimeout(() => {
      //     if (!isAuthenticated) {
      //     setisLoadingComponent(false)
      //     }
      // }, 300)
      }, [isAuthenticated, diffMs])
  
      //displays timeLeft before submitting when click on button
      useEffect(() => {
          if (!isAuthenticated) {
          const dataTime = window.localStorage.getItem('_APP_timer');
          const currentTime = Date.now()
          const timePassed = currentTime - dataTime
          const countdown = 86400000 - timePassed
          setTimeLeft(countdown)
      }
      else {
          const timeLeftAuth = 82800000 - diffMs
          setTimeLeft(timeLeftAuth)
      }
      }, [reducerValue, diffMs])



    return (
        <>
        <div className='min-h-[100vh] w-full fixed -z-50 bg-zinc-100 bg-gradient-to-b  from-blue-800 to-transparent ' />
        
        <div className='relative text-center z-30 bg-transparent '>
          <div className='pt-32 text-zinc-100 text-2xl flex align-middle items-center justify-center gap-2'>
            <div>Your Progress</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-walking" viewBox="0 0 16 16">
              <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z" />
              <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z" />
            </svg>
          </div>
          <div className={`${aiText ? '' : ' animate-pulse'} pt-20 text-zinc-200`}>{destroyer ? `AI: ${aiText && (aiText || 'Loading...')}` : null}</div>
          <div className={isLoadingComponent ? 'hidden' : books.length < 1 ? 'hidden' : 'pt-10 flex justify-center'}>
            {destroyer ? <HomeChart darkMode={darkMode} /> : null}
          </div>
          <div title='Please come again tomorrow!' className="text-zinc-200">
            {/* <div>{timeLeft > 0 ? `${(timeLeft / 1000).toFixed(0)} ` : null}sec</div>
                        <div>|</div> */}
            {destroyer ? 
              <div className='hidden'>"Next submission @ 5PM"</div> :
              <div onClick={() => navigate('/')} className='flex justify-center items-center gap-2'>
                <div className='text-zinc-100 hover:cursor-pointer'>Please submit for today!</div>
                <button
                  className='rounded-md border-orange-500 border-2 animate-pulse  p-2 w-[40px]'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16"
                    className='m-auto'
                  >
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                  </svg>
                </button>
              </div>}

          </div>

          {/* <div className={tooltipContent.mood ? 'pt-40' : 'hidden'}><ChartTooltips /></div> */}

          {/* <div className='pt-40'><DataFetch graphRef={graphRef} destroyer={destroyer} books={books} darkMode={darkMode} /></div> */}
          <div className='md:pt-0 max-md:pt-32'>
            <DataFetch graphRef={graphRef} darkMode={darkMode} destroyer={destroyer} books={books} />
          </div>



        </div>

      </>
    )
}