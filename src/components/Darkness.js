import React from 'react';
import "../App.css"

function Darkness() {
    return (
        <>
            <div 
            // absolute top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2
            className='
            relative pt-14 [&>div>div>div]:m-auto [&>div>div>div]:mt-[40px] pb-[200px] select-none

            '>
                <div className='text-center ml-auto mr-auto'>
                    <p className='text-red-800'>Thank you for participating!</p>
                    <p className='text-blue-500'>Here's other stats</p>

                    <div className=' animate-fade'>

                        <div className=' bg-purple-400 rounded-lg mt-20 p-4 max-w-[500px]'>
                            <p className=' text-left font-bold'>Purpose:</p>
                            <div className=' text-left'>Rainbow Darkness aims to gage your mental status that is quick and anonymous.
                                <div className=' text-left mt-3'>We offer the following perks compared to other mental-health applications:</div>
                                <ul className=' list-disc'>
                                    <li>Anonymity</li>
                                    <li>Free Use</li>
                                    <li>0 Obligation</li>
                                </ul>
                            </div>
                        </div>


                        <div className=' bg-purple-400 rounded-lg mt-20 p-4 max-w-[500px] text-left'>
                            <p className=' text-left font-bold'>Aims:</p>
                            <p>
                                Mental health apps often ask for your personal information, e.g. age. Takes a bit to get started. A couple questions. At Rainbow Darkness, we only ask that you click 2 buttons and you're done. We hope that you may consider your day and what made it good or bad.
                            </p>
                            {/* <p>
                                Created as a way to aid life without spending money on self-help books that don't work etc
                            </p> */}

                        </div>

                        <div className=' bg-blue-400 rounded-lg mt-20 p-4 max-w-[500px] text-left mb-[200px]'>
                            <p className=' text-left font-bold'>Tech Stack</p>
                            <li>React</li>
                            <li className=' indent-10'>Tailwind</li>
                            <li className=' indent-10'>React-bootstrap</li >
                            <li className=' indent-10'>React-router</li>
                            <li>Express</li>
                            <li>Node</li>
                            <li>MongoDB atlas</li>

                        </div>

                    </div>

                </div>

            </div>


            <p className="bottomRightText">Time before next entry:</p>
        </>
    )
}

export default Darkness;