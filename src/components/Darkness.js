import React, { useEffect } from 'react';
import "../App.css"

function Darkness() {

    // const [expander, setExpander] = useState(false)

    // const expandHandler = () => {
    //     setExpander(!expander)
    // }

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
                  
{/* <div className=' m-auto h-[200px] mt-4 bg-green-200 text-black animate-fade w-[600px] rounded-xl border-4 border-black shadow-2xl'>
    <p className='font-bold text-left pl-4 pt-4'>YOUR STATS</p>
    <p className='text-left p-4'>1, 2, 3, 4</p>
</div> */}

{/* <p className='text-black font-bold pt-4 select-none'>Public stats</p> */}

                    <iframe title='iframe_mongoDB' className='  
                    m-auto w-[1000px] h-[800px] select-none'  
                    src="https://charts.mongodb.com/charts-project-0-aloyz/embed/dashboards?id=577710d1-e1f2-4d9b-8216-c06878528255&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed">    
                    </iframe>

                    <div className=' animate-fade'>

                        <div className=' bg-purple-400 rounded-lg mt-20 p-4 max-w-[500px]'>
                            <p className=' text-left font-bold'>Purpose:</p>
                            <div className=' text-left'>
                                <p>Rainbow Darkness aims to gauge public mental status that is quick and anonymous.</p>
                                {/* <p>Compared to other mental health apps, we don't ask you to do dumb shit like imagine your perfect beach getaway or read about meditation techniques you'll never use. In here, U just press like 2 buttons</p> */}
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
                            <p>React, Express, Node, MongoDB, Vercel</p>


                        </div>

                        <div className=' bg-[#F5F5F4] border-2 [&>div]:text-gray-400 [&>p]:text-slate-400 border-slate-300 rounded-lg mt-20 p-4 max-w-[500px] text-left mb-[200px]'>
                            <div className=' text-left font-bold pb-4'>Changelog:</div>

                            {/* <div className=''>
                            <svg 
                            onClick={expandHandler}
                            xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" className="absolute right-[26%] text-orange-400 hover:text-yellow-200" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>
                            </div> */}

                            <div>1.0.9 (February 15, 2023)</div>
                            <p>Time now displays + counts down properly on submission.</p>
                            <p>-0.5 and +0.5 buttons now will be disabled if they hit 0 or 10 respectively, and will reactivate if they hit 0.5 or 9.5 respectively</p>
                            <p>Changed button colors</p>
                            <p>Removed bottom right "Time before next entry"</p>
                            <p>Graph removed from homepage, set to Darkness again</p>
                            <p className='opacity-40'>To add most recent number on homepage</p>
                            <div>______________</div>

                            <div>1.0.8 (February 2, 2023)</div>
                            <p>Removed page indicators</p>
                            <p>Moved graph to the homepage (desktop mode)</p>
                            <p>Button click double render on mobile fixed itself somehow</p>
                            <div>______________</div>

                            <div>1.0.7 (January 29, 2023)</div>
                            <p className='mb-0'>Added new features to the Public Stats chart:</p>
                            <li className='text-gray-400'>displays # of users as a separate line</li>
                            <li className='text-gray-400'>updated labels</li>
                            <p>Updated help tooltip</p>
                            <p>Added page indicator</p>
                            <p>Added milestones</p>
                            <p><span className='text-red-400'>MOVED TO NEW DOMAIN</span></p>
                            <p className='-mt-5'><span className='text-red-400'>Personal scores (browser cache) have been reset for previous </span></p>
                            <p className='-mt-5'><span className='text-red-400'>users.</span></p>
                            {/* <p className='-mt-5'>Will add way for users to input previous scores</p> */}
                            <p>Mobile friendlier (buttons, header, help tooltip)</p>

                            <p>Broke mobile button presses again (they double render on click)</p>
                            <div>______________</div>

                            <div>1.0.6 (January 28, 2023)</div>
                            <p>Changed button colors</p>
                            <p>Fixed submit button transparency logic</p>
                            <div>______________</div>

                            <div>1.0.5 (January 27, 2023)</div>
                            <p className='mb-0'>Simplified desktop UI</p>
                            <li className='text-gray-400'>Changed color scheme, submit button, reset button, header size, font sizes/boldness</li>
                            <div>______________</div>

                            <div>1.0.4 (January 23, 2023)</div>
                            <p>Added POST limit to database per IP; If you submit a number and clear your cache, subsequent submissions will be denied until the 24 hours is up. Working to implement limit per device instead of IP. </p>
                            <p>Changed logo</p>
                            <p>Changed result layout</p>
                            <p>Added help button on top right</p>
                            <p>Broke score animation when you submit, now it only shows when you refresh, need to fix</p>
                            <div>______________</div>
                
                            <div>1.0.3 (January 20, 2023)</div>
                            <p>Added loading state when global score loads</p>
                            <p>Removed day from score dates</p>
                            <div>______________</div>


                            <div>1.0.2 (January 16, 2023)</div>
                            <p>Mobile friendlier design </p>
                            <div>______________</div>

                            <div>1.0.1 (January 15, 2023)</div>
                            <p>When user submits number: Cache & display user's number/date </p>
                            <div>______________</div>

                            <div>1.0.0 (January 13, 2023)</div>
                            <p>Deployed client and server on Vercel</p>
                            <div>______________</div>

                        </div>

                        <div className=' bg-black text-gray-300 rounded-lg mt-20 p-4 max-w-[500px] text-left mb-[200px]'>
                            <p className=' text-left font-bold'>Milestones :)</p>
                            <p>Reached 20 unique visitors in a week on 1/29/23 [20:08]</p>
                            {/* <p> with ∼40% engagement</p> */}

                        </div>


                    </div>
                    <div className='absolute bottom-10 left-[50%] -translate-x-1/2'>Got feedback? Please let me know!</div>
                </div>
           
            </div>


            {/* <p className="bottomRightText">Time before next entry:</p> */}

        </>
    )
}

export default Darkness;