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
  }, [editSubmissionTrigger, destroyer])

  useEffect(() => {
    dispatch(fetchLastAll());
  }, [])




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
            {/* <div className={'min-h-[100vh] flex flex-col bg-zinc-100 bg-gradient-to-b from-blue-800 to-transparent justify-center'}>
            test
          </div> */}

            {/* <div className="bg-red-500 absolute text-blue-300 h-[400px] text-blue p-20 z-50">
            test
            <div>test</div>
          </div> */}
            <div className="absolute text-black bg-blue-400">test</div>

            <div className='relative'>
                <div className={`${aiText ? '' : ' animate-pulse'} pt-20 text-center  font-normal -translate-x-1/2 text-zinc-200`}>{destroyer ? `AI: ${aiText && (aiText || 'Loading...')}` : null}</div>
                <div className={isLoadingComponent ? 'hidden' : books.length === 1 ? 'hidden' : ''}>
                    {<HomeChart />}
                </div>
                <div title='Please come again tomorrow!' className="text-zinc-600">
                    {/* <div>{timeLeft > 0 ? `${(timeLeft / 1000).toFixed(0)} ` : null}sec</div>
                        <div>|</div> */}
                    'Next submission @ 5PM'

                </div>

            <div className={tooltipContent.mood ? 'pt-10' : 'hidden'}><ChartTooltips /></div>

            {/* <div className='pt-40'><DataFetch graphRef={graphRef} destroyer={destroyer} books={books} darkMode={darkMode} /></div> */}
            <div className='pt-40'>
                <DataFetch graphRef={graphRef} darkMode={darkMode} destroyer={destroyer} books={books}/></div>
 


            </div>

        </>
    )
}