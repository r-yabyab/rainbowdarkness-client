import React, { useEffect } from 'react';
import "../App.css"

function Darkness() {

    useEffect (() => {
        document.title = 'Stats';
      }, [])

    return (
        <>
            <div 
            // absolute top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2
            className='
            relative pt-14 [&>div>div>div]:m-auto [&>div>div>div]:mt-[40px] pb-[200px]

            '>


                <div className='text-center ml-auto mr-auto'>
                    {/* <p className='text-black font-bold select-none'>Thank you for participating!</p> */}
                  
<div className=' m-auto h-[200px] mt-4 bg-green-200 text-black animate-fade w-[600px] rounded-xl border-4 border-black shadow-2xl'>
    <p className='font-bold text-left pl-4 pt-4'>YOUR STATS</p>
    <p className='text-left p-4'>1, 2, 3, 4</p>
</div>
<p className='text-black font-bold pt-4 select-none'>Public stats</p>

                    <iframe title='iframe_mongoDB' className='  
                    m-auto w-[600px] h-[600px] select-none'  
                    src="https://charts.mongodb.com/charts-project-0-aloyz/embed/dashboards?id=577710d1-e1f2-4d9b-8216-c06878528255&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>

                    <div className=' animate-fade'>

                        <div className=' bg-purple-400 rounded-lg mt-20 p-4 max-w-[500px]'>
                            <p className=' text-left font-bold'>Purpose:</p>
                            <div className=' text-left'>
                                <p>Rainbow Darkness aims to gauge public mental status that is quick and anonymous.</p>
                                <p>Compared to other mental health apps, we don't ask you to do dumb shit like imagine your perfect beach getaway or read about meditation techniques you'll never use. In here, U just press like 2 buttons</p>
                                {/* <div className=' text-left mt-3'>We offer the following perks compared to other mental-health applications:</div>
                                <ul className=' list-disc'>
                                    <li>Anonymity</li>
                                    <li>Free Use</li>
                                    <li>0 Obligation</li>
                                </ul> */}
                            </div>
                        </div>


                        {/* <div className=' bg-purple-400 rounded-lg mt-20 p-4 max-w-[500px] text-left'>
                            <p className=' text-left font-bold'>Aims:</p>
                            <p>
                                Mental health apps often ask for your personal information, e.g. age. Takes a bit to get started. A couple questions. At Rainbow Darkness, we only ask that you click 2 buttons and you're done. We hope that you may consider your day and what made it good or bad.
                            </p>
                             <p>
                                Created as a way to aid life without spending money on self-help books that don't work etc
                            </p>

                        </div> */}

                        <div className=' bg-blue-400 rounded-lg mt-20 p-4 max-w-[500px] text-left mb-[200px]'>
                            {/* <p className=' text-left font-bold'>Tech Stack</p>
                            <li>React</li>
                            <li className=' indent-10'>Tailwind</li>
                            <li className=' indent-10'>React-bootstrap</li >
                            <li className=' indent-10'>React-router</li>
                            <li>Express</li>
                            <li>Node</li>
                            <li>MongoDB atlas</li> */}
                            <p className=' text-left font-bold'>Powered By:</p>
                            <p>React, Express, Node, MongoDB Atlas, Heroku</p>


                        </div>

                    </div>

                </div>
            </div>

            <p className="bottomRightText">Time before next entry:</p>

        </>
    )
}

export default Darkness;