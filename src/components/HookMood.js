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


// redux

// import * as d3 from 'd3'
// import Gradient1 from '../photos/gradient1.png'
// import Scuffed from '../photos/scuffed-gradient.png'
// // import screenedGradient from '../photos/gradient-screen.png'
// import downArrow from '../photos/red-arrow.png'

const getDatafromLS = () => {
    const moogleData = localStorage.getItem('_APP_moogle');
    if (moogleData) {
        return JSON.parse(moogleData)
    } else {
        return []
    }
}

const RAINBOW_DARKNESS = "https://rainbowdarkness-server.vercel.app"
// const RAINBOW_DARKNESS = "http://localhost:4000"

function HookMood ({ darkMode, graphRef }) {

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
        { num: '20' },
        { num: '10' }
    ]

    const { isAuthenticated, user } = useAuth0();
    // const handleClick = async () => {
    //     const payload = {
    //         sub: user.sub,
    //         name: user.name,
    //     }
    //     const accessToken = await getAccessTokenSilently(
    //         {
    //         audience: 'https://www.rainbowdarkness-api.com',
    //         client_id: 'oZoxA3tZVzg4W4bFQctFITiXj9RuV0mO',
    //         scope: 'read:messages',
    //         sub: user.sub,

    //         // payload: payload
    //     }
    //     );
    //     console.log(accessToken);
    //   };
    

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
    const { setDestroyer } = bindActionCreators(actionCreators, dispatch)
    const destroyer = useSelector((state) => state.destroyer)
    

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
        console.log(`selectHandler, number: ${number}`);
    }

    // initializes for states for refresh UI
    let clickHandlerOne = () => {
        updateList(numberList);
        setBooleanState(false);
        setNumber('')
        // forceUpdate()
        console.log(reducerValue)
    }

    useEffect(() => {
        setNumberForStorage(number)
    },[number])

//                                           ////////////////////////////
//                                           ////////////////////////////
    //                                                               ////////////////////////////
    // need to make it a switch w/ decrement                                               ////////////////////////////
    const increment = () => {
        setNumber(number => number + 0.5);
        console.log(`increment, number: ${number}`);
        // only can be clicked once
        if (number >= 9.5) {
            btnRef.current.setAttribute("disabled", "disabled")
        }
        if (number >=0) {
            btnRef2.current.removeAttribute("disabled")
        }
};

    const decrement = () => {
        setNumber(number => number - 0.5);
        if (number <= 0.5) {
            btnRef2.current.setAttribute("disabled", "disabled")
        }
        if (number <=10) {
            btnRef.current.removeAttribute("disabled")
        }
    }

//
// POST to DB
    const handleSubmit = async () => {

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
                setError(null)
                updateList(numberList);
                setBooleanState(false);
                setDestroyer(true);
                setStaticTime(Date.now())
                setNumber('')
            }
            const moogleNew = {
                inputNumber:numberForStorage,
                inputTime: format(new Date(),'MM/dd')
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
        } else {

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
                setStaticTime(Date.now())
                setNumber('')
                // forceUpdate()
            }

        // gets data from submitbutton
        const moogleNew = {
            inputNumber:numberForStorage,
            inputTime: format(new Date(),'MM/dd')
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


//
// LocalStorage
//
const [staticTime, setStaticTime] = useState(0)
// let [timeLeft, setTimeLeft] = useState(86400000)
let [timeLeft, setTimeLeft] = useState(86400000)


// getStorage
// logic for when destroyer get cleared after 24 hours is up
    useEffect(() => {
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
        console.log(timePassed)
        setTimeLeft(countdown)

        // x => x -1000 for countdown every 1 second
        setInterval(() => {
            setTimeLeft(x => x -30000)
        },30000)



    }, [])

    //displays timeLeft before submitting when click on button
    useEffect(() => {
        const dataTime = window.localStorage.getItem('_APP_timer');
        const currentTime = Date.now()
        const timePassed = currentTime - dataTime
        const countdown = 86400000 - timePassed
        setTimeLeft(countdown)
    }, [reducerValue])

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
          console.log(response.data.content)
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

//
// LocalStorage
//

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



    let btnRef = useRef();
    let btnRef2 = useRef();

    return (
        <>
                {/* <div className=' text-transparent text-xl bg-gradient-to-r from-purple-500 to-green-400 absolute w-full h-full bg-blend-multiply' /> */}
                {/* <img className='absolute top-20 left-[50%] -translate-x-1/2 w-[534px]' src={Gradient1} alt='gradient' /> */}
{/* Used for button background in Desktop */}
{/* It clips out of element a bit, esp when magnifying browser page */}
{/* <img className={`${booleanState ? "hidden" 
                : destroyer ? 'hidden' 
                : darkMode ? 'max-md:hidden'  
                :''} max-md:hidden absolute animate-fade top-[88px] right-[50%] translate-x-1/2 mr-[1px]`} 
                //  src={Scuffed} 
                 src={ screenedGradient} 
                 alt='button gradient' /> */}

<div className='relative  '>
{/* <div className="absolute inset-0 bg-gradient-to-r from-black to-white mix-blend-overlay " /> */}
{/* <div className={ destroyer ? 'max-md:absolute left-[50%] font-thin text-xl max-md:-translate-x-1/2 max-md:top-14 text-white' : 'hidden'}>Please come back tomorrow!</div> */}

            <div 
            className='max-md:hidden'
            // className="
            // max-md:m-auto max-md:pl-[80px] max-md:max-w-[400px] max-md:justify-center "
// className='max-md:grid max-md:grid-cols-3 max-md:gap-8 max-md:mt-[70px] max-md:w-[300px] max-md:m-auto'
            >

                    {list.filter((item, index) =>  index < 9).map((x, index) => {
                    // displays row of numbers from array
                    return (
                        
                        <div className='
                        
                        relative text-center inline-flex md:p-0 
                        
                        ' 
                            // didn't work
                        // max-md:[&>div]:c max-md:flex-wrap max-md:inline-flex max-md:flex-row max-md:text-center max-md:p-0


                                //old, worked but boxy as hell
                            //  max-md:inline-flex max-md:-ml-10 max-md:-mr-10 max-md:p-0 max-md:flex-wrap 
                            //     max-md:[&>button]:pt-8 max-md:[&>button]:pb-8 max-md:[&>button]:pl-10 max-md:[&>button]:pr-10

                        key={index}>


                            <button disabled={destroyer ? true : false}
                                    // for padding button width instead of setting w-[...]..... : darkMode ? 'squares md:bg-clip-text  max-md:rounded-none max-md:animate-fade max-md:bg-zinc-200  border-[2px] max-md:border-black border-slate-300 text-black rounded-lg pt-[10px] pb-[10px] pr-4 pl-4  md:mr-[8px] md:ml-[8px]' 
                                
                                className={booleanState ?
                                    // max-md:h used to prevent everything from moving up after buttons removed
                                    // ADD md:bg-clip-text TO DESTROYER FALSE TO MAKE TEXT CLIP THROUGH BG (for image gradients)
                                    `invisible 
                                    max-md:h-[244px]`
                                     :
                                    destroyer ? `hidden squares  hover:cursor-not-allowed   border-[2px] border-black text-black bg-black pt-[10px] pb-[10px] pr-4 pl-4 
                                    md:mr-[8px] md:ml-[8px] 
                                    max-md:rounded-none max-md:animate-fade`
                                    : darkMode ? `squares hover:bg-green-400 border-[2px]  border-slate-300 text-white  rounded-full animate-fade 
                                    w-[45px] h-[50px] mr-[8px] ml-[8px] max-md:mr-[4px] max-md:ml-[4px]
                                    ` 
                                    :`squares  hover:bg-green-400 border-[2px] border-black text-black rounded-full animate-fade 
                                    w-[45px] h-[50px]  mr-[8px] ml-[8px] 
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

                {/* {negList.filter((item, index) => index < 9).map((x, index) => { 
return(
<div key={index}>
    {x.num}
</div>
)
})
} */}
<div className='flex md:hidden justify-center animate-fade pt-10'>
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

{/* When submitted, countdown timer */}
            {/* {destroyer ? <>
                <div className='
                        absolute md:right-[30%] translate-x-1/2  text-xl pointer-events-none
                        md:top-[40%] md:animate-fade
                        max-md:top-[35px] max-md:left-[50%] max-md:-translate-x-1/2 max-md:w-full max-md:bg-purple-200  max-md:pt-8 max-md:pb-8 max-md:pr-10 max-md:pl-10 max-md:bg-opacity-80
                        [&>p]:m-0
                        '>
                    <p className='font-extrabold md:animate-bounce'>Thank you!</p>
                    <p>Please come again in  </p>
                        <div className='max-md:hidden md:hidden'><span className={
                            (
                                // it only highlights every 2 clicks, can't figure out for every click
                                // (reducerValue%2) > 0  &&
                                "")}>{timeLeft}</span> milliseconds !!!
                        </div>
                    <p>{timeLeft > 0 ? `${(timeLeft / 1000).toFixed(0)}` : null} seconds </p>
                    <p>or {timeLeft > 0 ? `${parseFloat(timeLeft / (1000 * 60 * 60)).toFixed(1)}` : null} Hours</p>
                    {/* <p className=''>Click on <span className='text-yellow-400 bg-black'>Darkness</span> ^^^ for the line graph </p> */}
                {/* </div> 
            </> : null} */}

            {booleanState === true &&
                <div className='absolute md:ratingAnimationNoY left-[50%] space-x-[100px] -translate-x-[50%] top-[102px]
                max-md:top-[106px] max-md:[&>Button]:p-4 max-md:space-x-[100px] max-md:absolute max-md:min-w-[20000px]'>
                    <Button ref={btnRef2} onClick={decrement} variant='outline-danger' size="lg">-0.5</Button>
                    <Button ref={btnRef} onClick={increment} className='' variant='outline-success' size="lg">+0.5</Button>
                </div>
            }

            {/* <div className='absolute left-[50%] -translate-x-1/2 select-none
            md:top-[113%]
            max-md:top-[116%]'>
                <button className={booleanState ? "block border-2 border-black max-md:hidden rounded-full pl-4 pt-2 pb-2 pr-4 text-lg font-extrabold" : "invisible"} variant='success' size='sm' disabled>{number}</button>
            </div> */}
            
            {/* sets booleanState to false ==> initializes ALL states **resetButton */}
            <div className='md:mt-[90px] max-md:mt-[150px] max-md:mr-8'>
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
                    ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} 
                    ${booleanState? '' : 'hidden'}
                mr-[260px] pr-4 pl-4 pt-[10px] pb-[10px] text-lg 
               md:hover:text-white bg-zinc-800
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
                className={`${destroyer ? '[&>*]:border-2' : darkMode ? '[&>*]:border-2 [&>*]:border-zinc-200 [&>*]:bg-green-500 [&>*]:text-zinc-100'  : '[&>*]:bg-black'}
                 [&>*]:font-bold [&>*]:tracking-wider [&>*]:absolute [&>*]:left-[50%] [&>*]:-translate-x-1/2 [&>*]:top-[253px] [&>*]:-translate-y-1/2 [&>*]:text-white [&>*]:pt-2 [&>*]:pb-2 [&>*]:pr-12 [&>*]:pl-12
                max-md:[&>*]:top-[260px] max-md:[&>*]:pt-6 max-md:[&>*]:pb-6
                `}>
                    <button disabled={(booleanState ? false : true) || (destroyer ? true : false)}
                        value={number} onClick={handleSubmit} type="number"
                        // className={(booleanState ? 'hover:text-yellow-300' : 'opacity-30') 
                        // || (destroyer ? 'opacity-30 ' : 'hover:text-yellow-200')}
                        className={(destroyer ? 'hidden ' : (booleanState ? 'md:hover:text-yellow-300 bg-green-500 max-md:animate-fade' : 'max-md:hidden bg-black opacity-30'))}

                    >
                        Submit</button>

                        {error && { error }}


                </div> 

            </div>
                    {/* DISPLAYS TIME LEFT BEFORE ANOTHER SUBMISSION */}
                    <div className=''>

                        <div title='Please come again tomorrow!' className={`${destroyer ? '' : 'hidden'} right-[50%] font-normal translate-x-1/2 top-[388px] text-zinc-600 absolute `}>
                            {/* <div>{timeLeft > 0 ? `${(timeLeft / 1000).toFixed(0)} ` : null}sec</div>
                        <div>|</div> */}
                            <div>{timeLeft > 0 ? `${parseFloat(timeLeft / (1000 * 60 * 60)).toFixed(1)} ` : null}hrs until next submission</div>
                        </div>
                    </div>

{/* For debugging */}
            {/* <div className='text-white text-left mt-20'>
                email {isAuthenticated ? user.email : "not logged in"}
                <br />sub {isAuthenticated ? user.sub : "not logged in"}
                <button className='absolute text-white bg-blue-400 mt-40' onClick={handleClick}>Get Access Token</button>
                <br />{isAuthenticated ? 'isAuthenticated = true' : 'isAuthenticated = false'}
            </div> */}


{/* EMOJIS :p */}
            {/* <div className='absolute left-[50%] -translate-x-1/2 -bottom-[100px] flex
[&>div]:ml-10 first:[&>div]:ml-0
max-md:hidden
'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" className="bi bi-emoji-expressionless-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm5 0h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm-5 4h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z" />
                    </svg>
                </div>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" className={booleanState ?"invisible": "bi bi-emoji-neutral"} viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z" />
                    </svg>
                </div>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" className="bi bi-emoji-neutral-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                    </svg>
                </div>

            </div> */}

<DataFetch graphRef={graphRef} destroyer={destroyer} books={books} darkMode={darkMode}/>
<div className='absolute left-[50%] font-normal -translate-x-1/2 top-[10px] text-zinc-200'>{ destroyer ? `AI: ${aiText && aiText}` : null}</div>

        </>
    )

}

export default HookMood;