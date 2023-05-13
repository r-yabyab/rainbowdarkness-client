// import { render } from '@testing-library/react';
import React, { useEffect, useState, useRef, useReducer} from 'react';
import { Button } from 'react-bootstrap';
import DataFetch from './apiComponents/DataFetch';
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';

const getDatafromLS = () => {
    const moogleData = localStorage.getItem('_APP_moogle');
    if (moogleData) {
        return JSON.parse(moogleData)
    } else {
        return []
    }
}

// const RAINBOW_DARKNESS = "https://rainbowdarkness-server.vercel.app"
// const RAINBOW_DARKNESS = "http://localhost:4000"
const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'  //

function HookMood ({ darkMode, graphRef, toHookMoodClick }) {

    let numberList = [
        // { num: '0' },
        { num: '1' },
        { num: '2' },
        { num: '3' },
        { num: '4' },
        { num: '5' },
        { num: '6' },
        { num: '7' },
        { num: '8' },
        { num: '9' },
        { num: '10' }
    ]

    const { isAuthenticated, user, isLoading } = useAuth0();

    // for mapping numbers
    let [list, updateList] = useState(numberList);
    // for displaying incrementers
    let [booleanState, setBooleanState] = useState(false);
    // tracking number for storing
        // set to commented 03/26/23
    // let [number, setNumber] = useState('');
    let [number, setNumber] = useState(null);
    // for handleSubmit to DB
    let [error, setError] = useState(null);
        
        // for localStorage, true === can't submit
        // used with setInterval && useEffect
    // let [destroyer, setDestroyer] = useState(false)
    const dispatch = useDispatch()
    const { setDestroyer, setisLoadingComponent } = bindActionCreators(actionCreators, dispatch)
    const destroyer = useSelector((state) => state.destroyer)
    const isLoadingComponent = useSelector((state) => state.isLoadingComponent)
    

    // refreshes api and timer
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    //for refreshing className on every click
    let [numberForStorage, setNumberForStorage] = useState('')
    // let [dateForStorage, setDateForStorage] = useState('')

    // const [books, setBooks] = useState(getDatafromLS())
    const books = getDatafromLS()

    let selectHandler=(e)=>{
        let x = e.target.getAttribute("selectnums");
        updateList(list.filter(items=>items.num===x));                   //filter is method which defines (var)
        setBooleanState(true)
        // turns {num:} into Int
        setNumber(number = parseInt(x))
        // console.log(`selectHandler, number: ${number}`);
    }

    // initializes for states for refresh UI
    let clickHandlerOne = () => {
        updateList(numberList);
        setBooleanState(false);
        setNumber('')
        // forceUpdate()
        // console.log(reducerValue)
    }

    useEffect(() => {
        setNumberForStorage(number)
    },[number])

// for mood #'s +0.5 and -0.5 incrementers
    let btnRef = useRef();
    let btnRef2 = useRef();

    const increment = () => {
        setNumber(number => number + 0.5);
        // console.log(`increment, number: ${number}`);
        // only can be clicked once
        if (number >= 9.5) {
            btnRef.current.setAttribute("disabled", "disabled")
        }
        if (number >= 0) {
            btnRef2.current.removeAttribute("disabled")
        }
    };

    const decrement = () => {
        setNumber(number => number - 0.5);
        if (number <= 0.5) {
            btnRef2.current.setAttribute("disabled", "disabled")
        }
        if (number <= 10) {
            btnRef.current.removeAttribute("disabled")
        }
    }

//
// POST to DB
    const handleSubmit = async () => {

        // if anonymous, send submission to localStorage (#, date, and objId from MongoDB)
        if (!isAuthenticated) {
            const rainbow = { number }
            //fetch req to post new data
            // const response = await fetch('https://rainbowdarkness-server.vercel.app/api/rainbows/postnum', {

            const url = `${RAINBOW_DARKNESS}/api/rainbows/postnum`
            const headers = { 'Content-Type': 'application/json' }

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(rainbow),                          // have to send number as json, not object
                headers
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                const objId = json._id;
                // console.log('Object ID:', objId);
                setError(null)
                updateList(numberList);
                setBooleanState(false);
                setDestroyer(true);
                setStaticTime(Date.now())
                setNumber('')
            
            const moogleNew = {
                inputNumber:numberForStorage,
                inputTime: format(new Date(),'MM/dd'),
                objId: objId
            }
            // if nothing saved at start, then save an empty array
            if(window.localStorage.getItem('_APP_moogle') == null) {
                window.localStorage.setItem('_APP_moogle', '[]')
            }
            // get old data and slap it to the new data
                const moogleOld = JSON.parse(window.localStorage.getItem('_APP_moogle'))
                moogleOld.push(moogleNew)
                // save old + new data to localStorage
                window.localStorage.setItem('_APP_moogle', JSON.stringify(moogleOld))
        }
    } 
    // if authenticated, store to MongoDB, skip the localStorage
    else 
    {

            const rainbow = { number }
            
            //user data post
            const response = await fetch (`${RAINBOW_DARKNESS}/api/rainbows/postnumuser?sub=${user.sub}`, {
                method: 'POST',
                body: JSON.stringify(rainbow),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setError(null)
                updateList(numberList);
                setBooleanState(false);
                setDestroyer(true);
                // setStaticTime(Date.now())
                setNumber('')
                // forceUpdate()
            }
        }
    }


//
// LocalStorage

  // check if user is logged in first
  // checks if user is logged in and if submitted if logged in
  const [userNums, setUserNums] = useState('')
//   const [recentNumTimeEpoch, setRecentNumTimeEpoch] = useState('')
  const [diffMs, setDiffMs] = useState(0)
  // 0-23 hours
//   const [lastSubmissionHour, setLastSubmissionHour] = useState(0)
  // typically 1-30
//   const [lastSubmissionDate, setLastSubmissionDate] = useState(0)
  const [diffDate, setDiffDate] = useState(0)
  const [localeHours, setLocaleHours] = useState(0)

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

    // for non-users to load in almost instantly
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            setisLoadingComponent(false)
        }
    }, [isLoading])

    // for ai Component
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


// // for timer
// // // // // // // // // // // WORKS,
// // // // // // // // // // // rerenders block components somehow even when not showing
    // useEffect(() => {
    //     setInterval(() => {
    //         setTimeLeft(x => x -1000)
    //     }, 1000)
    // },[])


    // localStorage, prevents user from resubmitting via destroyer dependency
    useEffect(() => {
        // console.log(destroyer,'localstore')
        window.localStorage.setItem('_APP', JSON.stringify(destroyer))
        window.localStorage.setItem('_APP_timer', JSON.stringify(staticTime))
        setTimeout(() => {
            forceUpdate()
        },100)

    },[destroyer, staticTime])



    return (
        <>


<div className='relative  '>

            <div 
            className='max-md:hidden'
            >

                    {list.filter((item, index) =>  index < 9).map((x, index) => {
                    // displays row of numbers from array
                    return (
                        
                        <div className='
                        relative text-center inline-flex md:p-0 
                        ' 
                                //old, worked but boxy as hell
                            //  max-md:inline-flex max-md:-ml-10 max-md:-mr-10 max-md:p-0 max-md:flex-wrap 
                            //     max-md:[&>button]:pt-8 max-md:[&>button]:pb-8 max-md:[&>button]:pl-10 max-md:[&>button]:pr-10

                        key={index}>


                            <button disabled={destroyer ? true : false}
                                    // for padding button width instead of setting w-[...]..... : darkMode ? 'squares md:bg-clip-text  max-md:rounded-none max-md:animate-fade max-md:bg-zinc-200  border-[2px] max-md:border-black border-slate-300 text-black rounded-lg pt-[10px] pb-[10px] pr-4 pl-4  md:mr-[8px] md:ml-[8px]' 
                                
                                className={`${booleanState ?
                                    // max-md:h used to prevent everything from moving up after buttons removed
                                    // ADD md:bg-clip-text TO DESTROYER FALSE TO MAKE TEXT CLIP THROUGH BG (for image gradients)
                                    `invisible 
                                    max-md:h-[244px]`
                                     :
                                    destroyer ? `hidden squares  hover:cursor-not-allowed   border-[2px] border-black text-black bg-black pt-[10px] pb-[10px] pr-4 pl-4 
                                    md:mr-[8px] md:ml-[8px] 
                                    max-md:rounded-none max-md:animate-fade`
                                    :
                                    darkMode ? `squares hover:bg-green-400 border-[2px]  border-slate-300 text-white  rounded-full  ratingAnimation
                                    w-[45px] h-[48px] mr-[8px] ml-[8px] max-md:mr-[4px] max-md:ml-[4px]
                                    ` 
                                    :`squares  hover:bg-green-400 border-[2px] border-black text-black rounded-full ratingAnimation 
                                    w-[45px] h-[48px]  mr-[8px] ml-[8px] 
                                    `}
                                    ${toHookMoodClick ? 'border-green-400' : ``}
                                    
                                    `
                                    
                                    //"squares bg-clip-text ratingAnimation  md:mr-[8px] md:ml-[8px] btn btn-light btn-lg"
                                }
                                selectnums={x.num}
                                onClick={selectHandler}
                            // key={index}
                            >
                                <span className={destroyer ? 'invisible' : 'max-md:text-[18px] md:text-[18px] flex justify-center items-center font-light pointer-events-none'}>
                                    {x.num}
                                </span>
                                {/* <span className={destroyer ? ' w-[32px] flex justify-center items-center absolute top-0 translate-y-1/2 md:-right-[1px] -translate-x-1/2 max-md:mt-3 max-md:ml-1 md:-mt-[5px]' : 'hidden'}>
                                    <img src={downArrow} alt='down arrow' />
                                </span> */}
                            </button>


                            <button
                                className={booleanState ?
                                    `squares ${[0,1,2,3,4,5,6,7,8,9,10].includes(number) && 'ratingAnimationYellowFast'} ratingAnimation2 border-[2px] bg-green-400 border-green-400 pr-4 pl-4 pt-[10px] text-black pb-[10px] rounded-full  btn-lg  
                                    max-md:absolute max-md:bg-black max-md:left-[0%] max-md:ml-[120px] font-bold max-md:top-[24%]`
                                    : 'invisible'}>
                                <span className={darkMode ? 'text-black ' : 'text-black'}>
                                    {number}
                                </span>
                            </button>

                        </div>
                    )
                })}




                </div>


<div className='flex md:hidden justify-center ratingAnimation  pt-10'>
{list.filter((item, index) => [0,1,3,4,5,7,8].includes(index)).map((x, index) => { 

const buttonClasses = [
    'squares',
    'border-2',
    'rounded-full',
    'w-[45px] h-[46px]  mr-[8px] ml-[8px] border-2 rounded-full text-white',
    ];

    if (index === 3) {
        // middle button
        buttonClasses.push('border-zinc-400 text-white w-[25px] h-[26px]');
    } else if (index === 0) {
        // right buttons
        buttonClasses.push('border-red-400 text-white  w-[58px] h-[58px]');
    } else if (index === 1) {
        // right buttons
        buttonClasses.push('border-red-400 text-white  w-[46px] h-[46px]');
    } else if (index === 2) {
        // right buttons
        buttonClasses.push('border-red-400 text-white w-[35px] h-[36px]');
    } else if (index === 4) {
        // right buttons
        buttonClasses.push('border-green-400 text-white w-[35px] h-[36px]');
    } else if (index === 5) {
        // right buttons
        buttonClasses.push('border-green-400 text-white w-[46px] h-[46px]');
    } else if (index === 6) {
        // right buttons
        buttonClasses.push('border-green-400 text-white w-[58px] h-[58px]');
    } else {
        // left buttons
        buttonClasses.push('bg-red-400 border-red-400 text-white');
    }

    return (
    <div 
        key={index}
        className="relative text-center inline-flex md:p-0 items-center"
    >
        <button 
        selectnums={x.num}
        onClick={selectHandler}
        className={`
        ${ booleanState ? 'hidden': destroyer ? 'hidden' : ''}
        ${buttonClasses.join(' ')}  mr-[8px] ml-[8px] border-2 rounded-full text-white`}
        >
        
        
        </button>

        <button
                                className={booleanState ?
                                    `squares ${[0,1,2,3,4,5,6,7,8,9,10].includes(number) && 'ratingAnimationYellowFast'} ratingAnimation2 border-[2px] bg-green-400 border-green-400 pr-4 pl-4 pt-[10px] text-black pb-[10px] rounded-full  btn-lg  
                                    absolute right-[50%] translate-x-1/2 ml-[120px] font-bold top-[20px]`
                                    : 'invisible'}>
                                <span className={darkMode ? 'text-black ' : 'text-black'}>
                                    {number}
                                </span>
                            </button>

    </div>
)

})}
</div>

            </div>

            {booleanState === true &&
                <div className='absolute md:ratingAnimationNoY left-[50%] space-x-[100px] -translate-x-[50%] top-[102px]
                max-md:top-[106px] max-md:[&>Button]:p-4 max-md:space-x-[100px] max-md:absolute max-md:min-w-[20000px]'>
                    <Button ref={btnRef2} onClick={decrement} variant='outline-danger' size="lg">-0.5</Button>
                    <Button ref={btnRef} onClick={increment} className='' variant='outline-success' size="lg">+0.5</Button>
                </div>
            }
            
            {/* sets booleanState to false ==> initializes ALL states **resetButton */}
            {/* <div className='md:mt-[90px] max-md:mt-[150px] max-md:mr-8'> */}
            <div className='md:mt-[92px] max-md:mt-[142px] max-md:mr-2'>
                {/* <Button variant='outline-dark' className='mt-[80px] ratingAnimation p-3' onClick={clickHandlerOne}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="currentColor" className="bi bi-wind" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </Button> */}

                {/* THIS ONE RESETS */}
                <button
                    onClick={clickHandlerOne}
                    // ${darkMode ? 'md:text-blue-400' : 'md:text-red-600'} 
            //    max-md:border-black max-md:rounded-md bg-zinc-800  max-md:hover:bg-black max-md:left-[20%] max-md:top-[368px] max-md:mt-6 max-md:pb-6 max-md:absolute 
                    className={`
                    ${destroyer ? 'invisible' : ''} 
                    ${darkMode ? 'text-zinc-500 bg-transparent border-2 border-zinc-600 md:hover:text-white' : 'md:hover:text-zinc-600 text-zinc-400 bg-white border-2 border-zinc-300'} 
                    ${booleanState? '' : 'hidden'}
                mr-[260px] pr-4 pl-4 pt-[6px] pb-[6px] text-lg 
                bg-zinc-800 max-md:font-normal rounded-md
                `}>
                    undo
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                    </svg> */}
                </button>

                {/* submitButton Desktop + mobile */}
                <div
                    // [&>*]:top-[54%]
                    // className={`${destroyer ? '[&>*]:border-2' : darkMode ? '[&>*]:border-2 [&>*]:border-zinc-200 [&>*]:bg-blue-600 [&>*]:text-zinc-100' : '[&>*]:bg-black'}
                    className={`${destroyer ? '[&>*]:border-2 hidden' : darkMode ? '[&>*]:rounded-md [&>*]:bg-blue-500 [&>*]:text-zinc-100' : '[&>*]:rounded-md [&>*]:bg-blue-500 [&>*]:text-zinc-100'}
                     
                    [&>*]:font-semibold [&>*]:tracking-wider [&>*]:absolute [&>*]:left-[50%] [&>*]:-translate-x-1/2 [&>*]:top-[253px] [&>*]:-translate-y-1/2 [&>*]:text-white [&>*]:pt-2 [&>*]:pb-2 [&>*]:pr-10 [&>*]:pl-10
                    [&>*]:flex [&>*]:items-center [&>*]:gap-x-2
                    `}>
                    <button disabled={(booleanState ? false : true) || (destroyer ? true : false)}
                        value={number} onClick={handleSubmit} type="number"
                        // className={(booleanState ? 'hover:text-yellow-300' : 'opacity-30') 
                        // || (destroyer ? 'opacity-30 ' : 'hover:text-yellow-200')}
                        className={(destroyer ? 'hidden ' : (booleanState ? 'md:hover:text-yellow-200 bg-green-500' : 'bg-black opacity-30'))}

                    >
                        Submit
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
</svg>
                    </button>

                    {error && { error }}


                </div> 

            </div>
                    {/* DISPLAYS TIME LEFT BEFORE ANOTHER SUBMISSION */}
                    <div className=''>

                        <div title='Please come again tomorrow!' className={`${destroyer ? '' : 'hidden'} right-[50%] font-normal translate-x-1/2 top-[388px] text-zinc-600 absolute `}>
                            {/* <div>{timeLeft > 0 ? `${(timeLeft / 1000).toFixed(0)} ` : null}sec</div>
                        <div>|</div> */}
                            {isAuthenticated ? 'Next submission @ 5PM' : <div>{timeLeft > 0 ? `${parseFloat(timeLeft / (1000 * 60 * 60)).toFixed(1)} ` : null}hrs until next submission</div>}
                        </div>
                    </div>

            {/* <div className='text-white top-20 bg-black absolute'>
                {userNums && userNums[0].createdAt}
                firstFunc {firstUserNum()}
            </div> */}

<DataFetch graphRef={graphRef} destroyer={destroyer} books={books} darkMode={darkMode}/>
<div className={`${aiText  ? '' : ' animate-pulse'} ${darkMode ? 'text-zinc-200' :'text-black' } absolute left-[50%] font-normal -translate-x-1/2 top-[10px] text-zinc-200`}>{ destroyer ? `AI: ${aiText && (aiText || 'Loading...')}` : null}</div>

        </>
    )

}

export default HookMood;