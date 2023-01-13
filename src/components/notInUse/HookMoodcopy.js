import { render } from '@testing-library/react';
import React, { useEffect, useState} from 'react';
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

    let [list, updateList] = useState(numberList);
    let [booleanState, setBooleanState] = useState(false)

    let selectHandler=(e)=>{
        let x = e.target.getAttribute("selectnums");
        updateList(list.filter(items=>items.num===x));                   //filter is method which defines (var)
        setBooleanState(true)    
        // render(true);
        // console.log(true);        
    }

    // resets setStates for both (1) list & (2) booleanState
    let clickHandlerOne = () => {
        updateList(numberList);
        setBooleanState(false);
    }
    
    const increment = (numberIndex) => {
        updateList(list = list + 0.5)
    }

    const decrement = (numberIndex) => {
        updateList(list = list - 0.5)
    }


    useEffect(() => {
        console.log(booleanState);
    }, [booleanState])



    return (
        <>
            <div>
                {list.map((x, numberIndex) => {
                // displays row of numbers
                    return (
                        <div className='relative inline-flex p-0 ratingAnimation'>
                            <button
                                className="squares btn btn-outline-primary btn-lg"
                                selectnums={x.num}
                                onClick={selectHandler}
                            >
                                {x.num}
                            </button>
                            {/* <button removeNums={x.num} onClick={removeHandler}>x</button> */}
                        </div>
                    )
                })}
            </div>

            {booleanState === true &&
                <div className='absolute ratingAnimation left-[50%] -translate-x-1/2 top-[52px]'>
                    <Button className='mr-28' variant='outline-primary' size="lg">+0.5</Button>
                    <Button variant='outline-dark' size="lg">-0.5</Button>
                </div>
            }
                {/* sets booleanState to false || returns to initial */}
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
                    <svg className='hover:invisible' xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" class="bi bi-emoji-expressionless-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm5 0h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm-5 4h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z" />
                    </svg>
                </div>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" class="bi bi-emoji-neutral" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z" />
                    </svg>
                </div>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" class="bi bi-emoji-neutral-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                    </svg>
                </div>

            </div>



        </>
    )
    
}

export default HookMood;