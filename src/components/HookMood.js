import { render } from '@testing-library/react';
import React, { useEffect, useState, useCallback, useRef} from 'react';
import { Button } from 'react-bootstrap';

function HookMood () {

    let numberList = [
        { num: '0' },
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
    let [booleanState, setBooleanState] = useState(false)
    // tracking score for storing
    let [score, setScore] = useState(0);

    let selectHandler=(e)=>{
        let x = e.target.getAttribute("selectnums");
        updateList(list.filter(items=>items.num===x));                   //filter is method which defines (var)
        setBooleanState(true)    
        // turns {num:} into Int
        setScore(score = parseInt(x))
        console.log(`selectHandler, score: ${score}`);        
    }

    // initializes setStates for ALL states
    let clickHandlerOne = () => {
        updateList(numberList);
        setBooleanState(false);
        setScore(null)
    }
  
//                                           ////////////////////////////
//                                           ////////////////////////////
    //                                                               ////////////////////////////
    // need to make it a switch w/ decrement                                               ////////////////////////////
    const increment = () => {
        setScore(score => score + 0.5);
        console.log(`increment, score: ${score}`);
        // only can be clicked once  
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled")
        }        
};

    const decrement = () => {
        setScore(score => score - 0.5);     
        if (btnRef2.current) {
            btnRef2.current.setAttribute("disabled", "disabled")
        }
    }
    //                                       //////////////////////////////////////////////////////////
    //                                       //////////////////////////////////////////////////////////
//                                       //////////////////////////////////////////////////////////
//                                       //////////////////////////////////////////////////////////



    let btnRef = useRef();
    let btnRef2 = useRef();

    const purpleButton =             (<div className="absolute right-[18%] top-[20%] inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Submit</span>
    <span className="relative invisible">Submit</span>
    </div>)



    return (
        <>
            <div>
                {list.map((x) => {
                // displays row of numbers from array
                    return (
                        <div className='relative text-center inline-flex p-0 ratingAnimation'>
                            <button
                                className={booleanState ? "invisible" : "squares btn btn-outline-primary btn-lg"}
                                selectnums={x.num}
                                onClick={selectHandler}
                                key={x.id}
                            >
                        {x.num}
                            </button>

                        <button className={booleanState ? "squares btn btn-outline-primary btn-lg ratingAnimation" : 'invisible'}>{score}</button>

                            {/* <button removeNums={x.num} onClick={removeHandler}>x</button> */}
                        </div>
                    )
                })}
            </div>

{/* Submit button */}
            <div>
                {booleanState ?
                    <div>
                        {purpleButton}
                    </div>
                    :
                    null}
            </div>

            {/* +- 0.5 buttons */}
            {booleanState === true &&
                <div className='absolute ratingAnimation left-[50%] -translate-x-[49%] top-[52px]'>
                    <Button ref={btnRef2} onClick={decrement} variant='outline-dark' size="lg">-0.5</Button>
                    <Button ref={btnRef} onClick={increment} className='ml-28' variant='outline-dark' size="lg">+0.5</Button>
                </div>
            }
            <div className='absolute top-[123%] left-[50%] -translate-x-1/2 select-none'>
                <button className={booleanState ? "block bg-green-500 rounded-full pl-4 pt-2 pb-2 pr-4 text-lg font-extrabold" : "invisible"} variant='success' size='sm' disabled>{score}</button>
            </div>
                {/* sets booleanState to false ==> initializes ALL states */}
            <div>
                <Button variant='outline-danger' className='mt-[80px] ratingAnimation p-3' onClick={clickHandlerOne}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
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
    
</div>



        </>
    )
    
}

export default HookMood;