// import { render } from '@testing-library/react';
import React, { useEffect, useState, useRef, useReducer} from 'react';
import { Button } from 'react-bootstrap';
import DataFetch from './apiComponents/DataFetch';
import { format } from 'date-fns'
import Darkness from './Darkness';

const getDatafromLS = () => {
    const moogleData = localStorage.getItem('_APP_moogle');
    if (moogleData) {
        return JSON.parse(moogleData)
    } else {
        return []
    }
}

function HookMood () {

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
    // for mapping numbers
    let [list, updateList] = useState(numberList);
    // for displaying incrementers
    let [booleanState, setBooleanState] = useState(false);
    // tracking number for storing
    let [number, setNumber] = useState('');
    // for handleSubmit to DB
    let [error, setError] = useState(null);
    // for localStorage, true === can't submit
    // used with setInterval && useEffect
    let [destroyer, setDestroyer] = useState(false)
    // refreshes api and timer
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    //for refreshing className on every click
    let [numberForStorage, setNumberForStorage] = useState('')
    // let [dateForStorage, setDateForStorage] = useState('')

    // const [books, setBooks] = useState(getDatafromLS())
    const books = getDatafromLS()


    // vvv doesn't work
    // const [myLocalStorageData, setMyLocalStorageData] = useState({})
    // let moogleReturn = () => {
    //     let d = localStorage.key(0)
    //     const data11 = localStorage.getItem('_APP_moogle')
    //     setMyLocalStorageData(JSON.parse(data11))
    //     console.log(data11)
    // }



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
        forceUpdate()
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
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled")
        }
};

    const decrement = () => {
        setNumber(number => number - 0.5);
        if (btnRef2.current) {
            btnRef2.current.setAttribute("disabled", "disabled")
        }
    }

//
// POST to DB
const handleSubmit = async () => {

    const rainbow = {number}

    // for local prod, use
    // /api/rainbows
    // with proxy in package.json

    //fetch req to post new dats
    const response = await fetch('https://rainbowdarkness-server.vercel.app/api/rainbows', {
        method: 'POST',
        body: JSON.stringify(rainbow),                          // have to send number as json, not object
        headers: {
            'Content-Type': 'application/json'
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
        forceUpdate()

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

        // vvv WORKS ON CLIENTSIDE
        //
        // setInterval(() => {
        //     setDestroyer(false);
        //     window.localStorage.removeItem('_APP_timer')
        // }, 5000);
        //

        // setInterval(() => {
        //     setTimer(timer => timer - 1);
        // }, 1000);
        // console.log('new number added', json)

        //82800000 = 23hours
    }
}


//
// LocalStorage
//
const [staticTime, setStaticTime] = useState(0)
let [timeLeft, setTimeLeft] = useState(86400000)


// getStorage
    useEffect(() => {
        const data = window.localStorage.getItem('_APP');
        const dataTime = window.localStorage.getItem('_APP_timer');
        // const dataNumber = window.localStorage.getItem('_APP_moogle')
        // idk what below does, but it keeps the data stored in application
        if ( dataTime !== null ) setStaticTime(JSON.parse(dataTime));
        if ( data !== null ) setDestroyer(JSON.parse(data));
        // if ( dataNumber !== null) setNumberForStorage(JSON.parse(dataNumber));
        // // if ( staticTime == null ) setStaticTime(JSON.parse(dataTime)); <<wrong
        // when page loads, compare time atm to time submitted button.
        const currentTime = Date.now()
        const timePassed = currentTime - dataTime

        if (timePassed > 86400000) {
            setDestroyer(false)
            setStaticTime(null)
        }
        // // 86400000 == 24hrs
        // // 10000 == 10secs
        // for printing countdown
        const countdown = 86400000 - timePassed
        console.log(timePassed)
        setTimeLeft(countdown)
    }, [])

    //displays timeLeft before submitting when click on button
    useEffect(() => {
        const dataTime = window.localStorage.getItem('_APP_timer');
        const currentTime = Date.now()
        const timePassed = currentTime - dataTime
        const countdown = 86400000 - timePassed
        setTimeLeft(countdown)
    }, [reducerValue])

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


    },[destroyer])


//
// LocalStorage
//


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



    let btnRef = useRef();
    let btnRef2 = useRef();

    const purpleButton =             (<div value={number} onClick={handleSubmit} type="number"
    className="
    absolute right-[18%] top-[20%] inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group
    max-md:right-[50%] max-md:translate-x-1/2 max-md:invisible">
    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease
    ">
        Submit</span>
    <span className="relative invisible">Submit</span>
    </div>)



    return (
        <>
            <div className="max-md:m-auto max-md:pl-[80px] max-md:max-w-[400px] max-md:justify-center">
                {/* {list.filter((item,index) => index < 9 ).map((x, index) => */}
                {list.filter((item, index) => index < 9).map((x, index) => {
                // displays row of numbers from array
                    return (
                        <div  className='relative md:text-center md:inline-flex md:p-0
                         max-md:inline-flex max-md:-ml-10 max-md:-mr-10 max-md:p-0 max-md:flex-wrap
                                max-md:[&>button]:pt-8 max-md:[&>button]:pb-8 max-md:[&>button]:pl-10 max-md:[&>button]:pr-10
                        ' key={index}>
                            <button
                                className={booleanState ?
                                    "invisible"
                                    :
                                    "squares ratingAnimation md:mr-[8px] md:ml-[8px] btn btn-outline-secondary btn-lg"}
                                selectnums={x.num}
                                onClick={selectHandler}
                                // key={index}
                            >
                        {x.num}
                            </button>

                        {/* after click, display chosen number */}
                        <button className={booleanState ? "squares btn btn-secondary btn-lg ratingAnimation max-md:-ml-[134px] max-md:mt-[50px]" : 'invisible'}>{number}</button>
                            {/* <button removeNums={x.num} onClick={removeHandler}>x</button> */}
                        </div>
                    )
                })}
            </div>

{/* for displaying only 0 && 10 Buttons */}
            {/* <div className='absolute'>
                {list.filter((item,index) => index == 0).map((x, index) => {
                    return(
                        <div key={index}>
                            <Button variant='primary'
                            selectnums={x.num}
                                onClick={selectHandler}>
                                {x.num}
                            </Button>

                        </div>
                    )
                })}
                                {list.filter((item,index) => index == 10).map((x, index) => {
                    return(
                        <div key={index}>
                            <Button variant='primary'
                            selectnums={x.num}
                                onClick={selectHandler}>
                                {x.num}
                            </Button>

                        </div>
                    )
                })}
            </div> */}

{booleanState ?
                    <>
                    <div>
                        {/* <Button value={number} onClick={handleSubmit} type="number" variant='primary'>submit</Button> */}
                    {/* if submitted, show message */}
                            {destroyer ?
                                null
                                :
                                <>
<div className={booleanState ? "absolute md:invisible top-[77%] left-[60%]" : "absolute invisible " }
onClick={handleSubmit}><svg xmlns="http://www.w3.org/2000/svg" width="100" fill="currentColor" className="bi hover:cursor-pointer bi-check-square-fill text-green-700 hover:text-green-300" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
</svg></div></>
                            }
                        </div>
                    </>
                    :
                    null}


            {destroyer ? <>
                <div className='
                        absolute right-[50%] translate-x-1/2  text-xl pointer-events-none
                        md:top-[160%] md:animate-fade
                        max-md:top-[35px] max-md:tracking-wide max-md:bg-purple-200  max-md:pt-8 max-md:pb-8 max-md:pr-10 max-md:pl-10 max-md:bg-opacity-80  max-md:w-full
                        [&>p]:m-0
                        '>
                    <p className='font-extrabold md:animate-bounce'>Thank you!</p>
                    <p>Please come again in  </p>
                    <div><span className={
                        (
                            // it only highlights every 2 clicks, can't figure out for every click
                            // (reducerValue%2) > 0  &&
                        "")}>{timeLeft}</span> milliseconds !!!</div>
                    {/* <p>{staticTime} statictime </p> */}
                    <p>or {parseFloat(timeLeft/(1000*60*60)).toFixed(1)} Hours</p>
                </div>
            </> : null}

{/* Submit button */}
            <div>
                {booleanState ?
                    <>
                    <div>
                        {/* <Button value={number} onClick={handleSubmit} type="number" variant='primary'>submit</Button> */}
                    {/* if submitted, show message */}
                            {destroyer ?
                                null
                                :
                                <>
                                    {purpleButton}
                                    {error && { error }}</>
                            }
                        </div>
                    </>
                    :
                    null}
            </div>
            {/* +- 0.5 buttons */}

            {booleanState === true &&
                <div className='absolute ratingAnimationNoY left-[50%] space-x-[100px] -translate-x-[50%] top-[52px]
                max-md:top-[100px] max-md:[&>Button]:p-10 max-md:space-x-[200px] max-md:absolute max-md:min-w-[20000px]'>
                    <Button ref={btnRef2} onClick={decrement} variant='outline-danger' size="lg">-0.5</Button>
                    <Button ref={btnRef} onClick={increment} className='' variant='outline-success' size="lg">+0.5</Button>
                </div>
            }

            <div className='absolute top-[123%] left-[50%] -translate-x-1/2 select-none'>
                <button className={booleanState ? "block border-2 border-black  rounded-full pl-4 pt-2 pb-2 pr-4 text-lg font-extrabold" : "invisible"} variant='success' size='sm' disabled>{number}</button>
            </div>
            {/* sets booleanState to false ==> initializes ALL states */}
            <div>
                <Button variant='outline-danger' className='mt-[80px] ratingAnimation p-3' onClick={clickHandlerOne}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" className="bi bi-wind" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </Button>
            </div>

{/* EMOJIS :p */}
            <div className='absolute left-[50%] -translate-x-1/2 -bottom-[100px] flex
[&>div]:ml-10 first:[&>div]:ml-0'>
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


            </div>


<div>
<DataFetch reducerValue={reducerValue} destroyer={destroyer} books={books}/>
</div>
        </>
    )

}

export default HookMood;