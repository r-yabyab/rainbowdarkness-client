import React, { useEffect, useState } from 'react';
import "../../App.css"

import samplegraph from '../../photos/samplegraph.png'
import prototype from '../../photos/prototype.png'
import mdd from '../../photos/mdd.png'
import sampleGraph1 from '../../photos/samplehomegraph.png'

function Darkness() {

    const [maximize, setMaximize] = useState(false)

    // const [expander, setExpander] = useState(false)

    // const expandHandler = () => {
    //     setExpander(!expander)
    // }

    useEffect(() => {
        document.title = 'About';
        // window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div
                // absolute top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2
                className='
                relative 
                md:bg-black md:bg-opacity-90
                max-md:bg-black max-md:bg-opacity-90
                '>


                <div className=''>

                    <div className='bg-black md:hidden h-[140px] ' />

                    <div className='max-md:[&>div]:max-w-[340px] max-md:[&>div]:m-auto justify-center 
                    items-center flex-col flex bg-black text-zinc-200 md:[&>div]:max-w-[1200px] 
                    md:px-16'>

                        {/* <div className='text-[36px] mt-[150px] text-black bg-zinc-200 w-[800px] font-semibold pl-2'>About Rainbow Darkness</div> */}
                        
                            {/* Rainbow Darkness is a mental health platform that puts accessibility and anonyminity first. As someone with a background in psychology, I find it kind of dumb that mental health applications tend to require users to fill out personal information before hitting a paywall, or take long surveys that tells you overly positive things about your personality.
                            <br /> Here, we only ask about how happy you are at the moment, in hopes that proceeding visits will bring some introspection on what made you so sad/happy in the past. You also have access to everyone else's moods; Often you'll see that others are having a much worse day than you, which I find interesting because no matter who you talk to in person, they always appear O.K. */}
                        {/* Rainbow Darkness is a mental health platform that prioritizes accessibility and anonymity for its users. Our platform recognizes that many mental health applications require users to provide personal information or complete lengthy surveys before gaining access to their services.
                        <br /><br /> At Rainbow Darkness, we believe in a simpler approach. We only ask how happy our users are at the moment, with the hope that future visits will prompt introspection and exploration of their emotional states. Additionally, our platform provides access to the moods of other users. This feature can be particularly insightful, as it reveals that others may be struggling even if they appear to be okay in person.
                        <br /><br />Our mission is to create a safe and supportive community for individuals to explore their mental health in a way that is accessible, anonymous, and free from judgment. */}
                        
                        {/* Rainbow Darkness is a mental health platform that lets you track your mood level. We aim to bring modern research methods on human affect to the public. */}
                        
                        
                        {/* <br/> <br/> Here's a mood chart of people with major depressive disorder. They tend to hover below normal mood levels, and shows improvement after treatment.  */}
                        {/* <img className='text-white pt-8' src={mdd} alt='mdd' />
                        <p className='mt-14 -mb-14'>Because people don't often have the luxury to get help, with the healthcare system being too complicated, with psychiatrists not giving quality care, this site aims to help users be mindful of themselves and others. 
                        </p> */}
                        {/* When shit hits the fan, how do we make things better? */}

                        <div className='text-[36px] mt-[150px] md:w-full text-black md:text-center bg-zinc-200 max-md:w-[800px] font-semibold pl-2'>
                            DevLog
                        </div>
                        <div className='pt-4'>Hello, here you can find dev updates for this website. For a quick rundown, I created Rainbow Darkness with the intention of tracking my journey with SSRIs, specifically with the mood fluctuations that come with its withdrawals. Nowadays, I just use it casually alongside users that come and go. 
                        <br /><br />As for tech stack, it started off as a simple HTML page hosted on AWS with an unsecure HTTP connection. It's grown a lot since then-- pages are more interactive with React & various libraries for styling and state management, moved the backend from Vercel to AWS where I learned a lot about cloud infrastructure and how it stacks against quick hosting solutions in terms of scalability and pricing, data has been moved between databases, interface changes, etc.
                        <br /><br />Overall, it's a neat little project good for helping people out and helping me test out new technologies.
                        </div>


                    </div>

                    {/* <div className='max-md:[&>div]:max-w-[340px] max-md:[&>div]:m-auto justify-center items-center flex-col flex bg-black text-zinc-200 [&>div]:max-w-[800px] '>
                        <div className='text-[24px] max-md:pt-20 underline mt-[150px] w-[800px] font-semibold pl-2'>Getting Started</div>
                        <div className='pt-4'>sdfllsdkfjsdklj</div>

                    </div> */}


                    <div className='pt-[150px]   max-md:[&>div]:max-w-[340px] max-md:[&>div]:m-auto [&>div]:max-w-[800px]  items-center flex-col flex bg-black text-zinc-200'>
                        <div className='text-[36px]  w-[800px] text-black bg-zinc-200 font-semibold mb-4 pl-2'>ChangeLog</div>
                        <div className=' max-h-[800px] [&>p]:text-sm [&>div]:pt-8 [&>p]:pl-6 [&>div]:text-lg lg:border-2 lg:pr-4 lg:pl-4 lg:-mt-6 lg:pt-4 no-scrollbar overflow-y-scroll'>

                            <div>1.5.2 (February, 2024 14:40)</div>
                            <p>Gave mood history its own page and tweaked design</p>
                            <p>Tweaked design of chart</p>
                            

                            <div>1.5.1 (January 29, 2024 23:51)</div>
                            <p>Changed homepage design</p>
                            <p>Changed navigation bar</p>
                            <p>Working on giving mood history its own page</p>
                            

                            <div>1.5 (January 26, 2024 23:51)</div>
                            <p className='mb-[2px]'>Happy new year!</p>
                            <p><span className='text-green-600'>Updated front page About Section design</span></p>
                            

                            <div>1.4.8 (October 04, 2023)</div>
                            <p>Moving data off MongoDB into my own Postgres server. SQL commands are much more simple than MongoDB's aggregate pipeline</p>
                            

                            <div>1.4.7 (June 15, 2023)</div>
                            <p>Moved env variables off the EC2 instance, uses IAM roles and parameter store now, working on automating the deployment process</p>
                            

                            <div>1.4.6 (June 7, 2023)</div>
                            <p>Mood chart shows for users with more than 1 submission (Brought back local storage for registered users for this)</p>
                            <p>Return to home button (rainbow darkness text) now can be clicked within the entire text container rather than just the individual words.</p>
                            

                            <div>1.4.5 (May 27-28, 2023 midnight)</div>
                            <p>Updated frontpage UI</p>
                            <p>Mood chart shows time submitted (for registered users)</p>
                            <p>Updated about section</p>
                            

                            <div>1.4.4 (May 20, 2023)</div>
                            <p>Mood chart width changes if on desktop or mobile. Added x and y grids</p>
                            

                            <div>1.4.3 (May 19-20, 2023 midnight)</div>
                            <p className='text-green-600'>Added a chart info box when you hover over the chart (sample graph on homepage and personal graph)</p>
                            

                            <div>1.4.2 (May 18, 2023)</div>
                            <p className='text-green-600'>Added a delete button for the submission box</p>
                            <p>To fix bug where submitting with empty fields sets them to 'undefined'</p>
                            

                            <div>1.4.1 (May 17-18, 2023 midnight)</div>
                            <p>Optimized data fetching (got redux-thunk to work - cut resources by about 30%; Components that share the same data pulls from a single data store rather than have each component fetch the same data)</p>
                            <p>To add delete button for submission info box items</p>
                            

                            <div>1.4.0 (May 16, 2023)</div>
                            <p>Fixed issue where background shark was making a horizontal scrollbar appear for mobile users. (Mobile view on Chrome desktop doesn't 100% reflect the actual mobile view on phones, had issues with overflow-hidden and relative styles)</p>
                            <p>Stats page design is more responsive. Before, the info boxes were absolute position'd, now it's relative & wraps and pushes other boxes down correctly (to accommodate submission info box).</p>
                            

                            <div>1.3.9 (May 14, 2023)</div>
                            <p>Cleaned up UI</p>
                            <p className='ml-8 -mt-4'>Changed circle buttons to square again</p>
                            <p className='ml-8 -mt-4'>Mobile users get square buttons again</p>
                            <p className='ml-8 -mt-4'>Added top background</p>
                            <p>To fix non-user submission timer logic</p>
                            

                            <div>1.3.8 (May 13, 2023)</div>
                            <p>Fixed problem where non-registered user submissions wouldn't pass info to local storage.</p>
                            

                            <div>1.3.7 (May 12-13, 2023 noon-midnight)</div>
                            <p>Replaced MongoDB Chart with a D3.js chart (same appearance with dark mode, need to add click functionality)</p>
                            <p>Updated topnav colors</p>
                            <p>Updated mood number buttons and ease-in animation.</p>
                            <p>Added background shark</p>
                            <p>Added button shark</p>
                            

                            <div>1.3.6 (May 12, 2023 midnight)</div>
                            <p>Added a border to the Login button</p>
                            <p>Widened top navbar padding</p>
                            <p>Fixed the copyright position to be at the bottom of the page instead of a fixed element.</p>
                            

                            <div>1.3.5 (May 10-11, 2023 midnight)</div>
                            <p><span className='text-green-600'>Added public chart to homepage.</span> It's basically the MongoDB Chart but I ported it to D3.js with the total count as bars, and it loads almost instantly compared to MongoDB Chart's slow load time (couple minutes initial load) with a refresh rate of 30 minutes.</p>
                            

                            <div>1.3.4 (May 9, 2023)</div>
                            <p>Updated Submission Info:</p>
                            <p className='ml-8 -mt-4'>Added icons</p>
                            <p className='ml-8 -mt-4'>Added error handling for number fields</p>
                            <p className='ml-8 -mt-4'>Users can now edit their mood number</p>
                            <p className='ml-8 -mt-4'>Only registered users can see their additional info on the chart.</p>
                            <p className='ml-8 -mt-4'>Non user's charts are based off of their browser's local storage. If they edit their mood number, it won't reflect on the chart.</p>
                            

                            <div>1.3.3 (May 8-9, 2023 midnight)</div>
                            <p className='text-green-600'>Added Submission info box:</p>
                            <p className='ml-8 -mt-4'>Users can now add time slept, activities, or memo to their mood number.</p>
                            <p className='ml-8 -mt-4'>Registered users as of now can see this information on the chart, working on getting the info to show for non users as well</p>
                            <p className='ml-8 -mt-4'>Need to add better error handling and confirmations.</p>
                            

                            <div>1.3.2 (May 7-8, 2023 midnight)</div>
                            <p>Updated frontpage's about section: Added interactive graph, cleaned up the about button toggler.</p>
                            

                            <div>1.3.1 (May 6-7, 2023 midnight)</div>
                            <p><span className='text-green-600'>You can now hover over your mood graph (if more than 1 submission) to display the number and date submitted.</span> Available for users and non users.</p>
                            <p>Non user submissions now stores _id from database into the browser's storage along with mood number and date submitted.</p>
                            <p>Registered user submissions no longer stores to browser's storage, just on MongoDB.</p>
                            

                            <div>1.3.0 (May 5-6, 2023 midnight)</div>
                            <p>Changed personal graph to show datapoints for each submission. The x-axis also shows the date submitted. Graph loads a lot faster now.</p>
                            <p>Personal graph loads about 2x faster now.</p>
                            <p>to add memos: Woke up, hours slept, activities, misc.</p>
                            

                            <div>1.2.9 (May 3, 2023)</div>
                            <p>Fixed today's numbers to be aggregated on the backend using UTC instead of system time (problem came up when backend was placed in EC2)</p>
                            

                            <div>1.2.8 (May 2, 2023)</div>
                            <p>For registered users:</p>
                            <p className='ml-8 -mt-4'>- Fixed mood submission time where if your last mood was submitted on the 30th and the next day was the 1st, it calculated the difference between days as -29.</p>
                            <p  className='ml-8 -mt-4'>- Personal graph now correctly displays the previous 10 submissions.</p>
                            <p  className='ml-8 -mt-4'>- Loading screen shows when user is authenticated with green text.</p>
                            <p>Fixed bug where the "Click me for details" frontpage toggle was showing on the stats page.</p>
                            <p>No serverside interruptions observed so far with EC2.</p>
                            

                            <div>1.2.7 (April 30, 2023)</div>
                            <p className='text-green-600'>Moved express server from Vercel to EC2</p>
                            <p className='ml-8 -mt-4'>Server shares the same EC2 instance with my other webapp. NGINX points to their own routes, added port number to the instance's security group. Monitoring for any problems. 429 and cors errors should be resolved.</p>
                            <p>Problem where upon submitting number, nothing happens for a couple seconds then brings user to the data page. It can also trigger double submissions. Will fix.</p>
                            <p className='text-red-500'>Vercel added a paywall for page analytics beyond the last 30 days.</p>
                            

                            <div>1.2.6 (April 28, 2023)</div>
                            <p>Fixed dark mode for the mood chart</p>
                            <p>Mood chart now properly shows last 10 submissions for both users and non-users</p>
                            <p>Server is experiencing cold start problems from Vercel again, NextJS port still on my todo list</p>
                            

                            <div>1.2.5 (April 25, 2023)</div>
                            <p>Adding loading spinner for registered users (it takes around a second to check if user has already submitted based on the database)</p>
                            <p>Changed height of mood buttons from 50px to 48px</p>
                            <p>Changed submit button from green with white border to just rounded blue </p>
                            <p>Added a send icon on the submit button. Attempted to use Material UI for the icon but the base packages introduced 3 moderate vulnerabilities, so I'll stick to HTML SVGs.</p>
                            

                            <div>1.2.4 (April 21, 2023)</div>
                            <p>For registered users - Submission timer isn't based on 23 hours anymore; Users can now post after 5PM if they haven't already submitted for that day. If they haven't submitted for 2 days, they can do so anytime. This encourages users (registered) to post after most of the day has finished, giving them more context on how their mood was across the day. </p>
                            

                            <div>1.2.3 (April 20, 2023)</div>
                            <p className='text-green-600'>Registered user functionality improved:</p>
                            <p className='ml-8 -mt-4'>When a user is logged in, it now detects if their 23 hour timer is up based on their previous submission stored on MongoDB. If user is not logged in, it still looks at the timer based on localStorage. There is about a second delay before Auth0 tells this site if user is authenticated and will show the submit page, need to fix.</p>
                            <div className='md:flex justify-around align-middle items-center gap-4'>
                                <p>Changed x- and y- axes to white with labels. Still tweaking with D3js pointer mouseovers to show data points when you hover over sections of the curve. </p>
                            <img className='md:w-[300px]' src={sampleGraph1} alt='samplehomegraph' />
                            </div>
                            

                            <div>1.2.2 (April 14, 2023)</div>
                            <p>Updated personal graph to correctly show scores below or above the weekly average as red or green, respectively.</p>
                            <p>Added toggle function to homepage's help section</p>
                            <p>Updated help section to include alternative scoring system, redesigned so it's just borders instead of background to separate</p>
                            <p className='ml-8 -mt-4 text-zinc-400'>To make the alternative scoring system functional. Need to find cross correlations of happiness between the other items for the joviality factor. Will allow users to use this alt system to average out the happiness level, scroll up when finished, etc.</p>
                            

                            <div>1.2.1 (April 13, 2023)</div>
                            <p>Readded AI component. Instead of generating a question for the user, the AI will give you a comment that compares your number today from yesterday's. If it's your first time submitting, it will only comment on that number. The AI will not give advice to sad people because they don't know what it's like to be sad.</p>
                            <p>Changed timer to count down every 30 seconds instead of 1 second</p>
                            <p>Post cooldown changed from 24 hours to 23 hours.</p>
                            {/* <div>{`setInterval(() => {setTimeLeft(x => x -30000)},30000)`}</div> */}
                            


                            <div>1.2.0 (April 12, 2023)</div>
                            <p>Added an about section on submission page.</p>
                            <div>Articles used:
                                <p className=' indent-4'>Watson, D., & Clark, L. A. (1994). The PANAS-X: Manual for the Positive and Negative Affect Schedule - Expanded Form.</p>
                                <p className=' indent-4'>Kunst, J. R., & Thomsen, L. (2017). Gender stereotypes and response bias: An experimental test of the moderating role of response latency. Social Sciences, 6(3), 103. </p>
                                <p className=' indent-4'>EMA research Manual: https://jruwaard.github.io/aph_ema_handbook/mood.html</p>
                            <p>Upon reviewing some positive / negative affect articles, it seems that we're measuring the joviality factor of positive affect. Negative affect seems to have more dimensions compared to positive. These studies tend to administer surveys with multiple items, specifying the time of day to take it, etc. The main concern is that these surveys stay inclusive to psychology research. Furthermore, I find that public mental health apps (headspace, online therapy sites) don't do a good job because they promise you too much, the onboarding process can be overwhelming. </p>
                            </div>
                            

                            <div>1.1.9 (April 11-12, 2023)</div>
                            <p>Added user registration (Auth0)-- If you submit a number while logged in, your submission will include your userID in the database (kept secret). Currently incorporating registered user data to work with the site, as of now it just stores your userID with submissions for later use.</p>
                            <p>Next submission timer set on homepage temporarily</p>
                            

                            <div>1.1.8 (April 8, 2023)</div>
                            <p className='text-green-600'>Implemented Redux:</p>
                            <p className='ml-8 -mt-4'>On submission, users are shown a graph of their mood for the past 10 days compared to the week's average</p>
                            <p>Changed About page contents</p>
                            <p>Rainbow Darkness text on the header now only redirects to homepage. Click in the ? to go here (about page)</p>
                            <p>Data fetching is working a lot better, less 429 errors, still need to port the backend to NextJS</p>
                            

                            <div>1.1.7.1 (April 6, 2023)</div>
                            <p>Changing submitted layout (color, come back tomorrow text in place of blacked out buttons), implementing Redux to remove static prompt after submission.</p>
                            <p>Disruptions coming from Vercel. Cold starts hit 429 error sometimes, need to migrate from express to NextJS using express to utilize serverless functions.</p>
                            

                            <div>1.1.7 (April 3, 2023)</div>
                            <p>Tweaking Auth0 and MongoDB API. Cors and 429 errors happening randomly-- Expect disruptions</p>
                            

                            <div>1.1.7 (March 30, 2023)</div>
                            <p>Changed logo</p>
                            <p>openAI prompts still a work in progress. After some tinkering, it has a really hard time returning actual content peer reviewed articles. When it does, it responds extremely slowly and times out sometimes.</p>
                            <p>Created Auth0 frontend for data storage and possible daily memos, need to create serverside functions before rolling out to users (includes user pages).</p>
                            


                            <div>1.1.6 (March 27, 2023)</div>
                            <p>Changed buttons from rounded-lg to rounded-full, changed colors</p>
                            <p>Changed mobile to show just 7 buttons.</p>
                            <p>Currently changing flow of page, extra question, inverse scoring, etc. to utilize ai aspect</p>
                            

                        
                            <div>1.1.5 (March 25-26, 2023)</div>
                            <p>Removed static prompt "How happy are you today?"</p>
                            <p>Prompt will be generated from openAI, pulling a question regarding your levels of happiness from a peer reviewed Psychology article with correlation values r{`>`}0.5. It returns real articles, however, the questions tend to be made up instead of being from the actual article.
                                <br />I decided to remove the original prompt because seeing the same question everyday got boring, reflected in user retention and in my own use. With openAI I can leverage scientific battery items to work for the public rather than get lost in academia.
                            </p>
                            <p>Sad questions inversely correlating to happiness (e.g. How hopeless were you today?) waiting to be used, need to implement inverse scoring first.</p>
                            

                            <div>1.1.4 (March 19, 2023)</div>
                            <p>Cleaned up CSS-- Stats will only show when user submits to make first time visits simpler.</p>
                            <p>Added score sorting</p>
                            

                            <div>1.1.4 (March 16, 2023)</div>
                            <div className='[&>p]:ml-8'>
                                Mobile friendlier
                                <p>Made buttons smaller, fixed sizing</p>
                                <p className='-mt-4'>Changed button colors</p>
                            </div>
                            <p>Main graph moved back to homepage. Button scrolls to it.</p>
                            <p>Numbers now flash yellow whenever you change it</p>
                            <p>Added gradient backgrounds</p>
                            <p>Changed appearance of + - buttons from filled to outlined colors</p>
                            
                            
                            <div>1.1.3 (March 12-13, 2023)</div>
                            <p>Added dark mode</p>
                            <p>In About page, text and background have been contrasted to be less jarring.</p>
                            <p>Updated buttons (desktop), the gradient is still a png photo underneath the buttons, still figuring out how to ditch the png image method because the sizing messes up on + or - magnifying.</p>
                            <p>Removed path.join to connect the frontend through backend, never worked and was originally intended for DigitalOcean, it just sat in index.js. Data fetching should run a bit faster now.</p>
                            <p>Updated homepage data layout (desktop ready, need to work on mobile):</p>
                            <p className='ml-8 -mt-4'>- Added weekly and current day's data</p>
                            <p className='ml-8 -mt-4'>- Renamed "Individual Moods" to "Yours & Everyone Elses"</p>
                            <p className='ml-8 -mt-4'>- Removed "Your Score" category, personal scores are <span className='bg-yellow-400 text-black'>highlighted</span> in "Yours & Everyone Elses", hover over number to see date submitted</p>
                            <p>2 month anniversary :{')'} Here's how the site looked a week before launch:</p>
                            <img 
                                onClick={e => setMaximize(!maximize)} 
                                className={maximize ? 'md:w-full md:hover:cursor-pointer' : 'md:w-[50%] md:hover:cursor-pointer'} 
                                src={prototype} 
                                alt='prototype.png' />
                            {/* <p>Thank you tailwindcss</p> */}
                            

                            <div>1.1.2.1 (March 10, 2023)</div>
                            <p>Fixed mobile spacing on About page (mongoDB chart, text out of bounds)</p>
                            

                            <div>1.1.2 (March 9, 2023)</div>
                            <p>Changed number buttons, submit button, moved submission notification, moved bottom copyright header</p>
                            <p>Revamped About page</p>
                            

                            <div>1.1.1 (March 5, 2023)</div>
                            <p>Added thumbnail graph (dekstop and mobile)</p>
                            <img className='ml-8 -mt-3 mb-4' src={samplegraph} alt='sample graph' />
                            <p>Individual Moods added to mobile</p>
                            

                            <div>1.1.0 (March 1-2, 2023)</div>
                            <p>Homepage now displays all numbers submitted, hover over a number to see its submission date (desktop)</p>
                            <ul className='mb-0 -ml-8'>New colors for user's numbers and all submissions. Your submissions will be highlighted in the list. For those interested, the colors used (in this site and in my general practice) loosely follow Kandinsky's color theory, namely in his book <i>Concerning the Spiritual in Art.</i></ul>
                            <li className='ml-8 text-green-600'>5.5 - 9.5</li>
                            <li className='ml-8 text-red-700'>0.5 - 4.5</li>
                            <li className='ml-8 text-yellow-400'>10</li>
                            <li className='ml-8 text-blue-500'>5</li>
                            <li className='ml-8 text-purple-500'>0</li>
                            <p className='pt-4 -mb-[0px]'>For restoring cache (will implement easier way to restore in the future): devtools -{`>`} application -{`>`} (Storage) LocalStorage -{`>`} https://rainbowdarkness.com -{`>`} _APP_moogle </p>
                            {`[{"inputNumber":7,"inputTime":"03/01"},{"inputNumber":...,"inputTime":"..."},...{...}]`}
                            <p className='pt-4'>removed :| faces</p>

                            

                            <div>1.0.9 (February 15, 2023)</div>
                            <p>Time now displays + counts down properly on submission.</p>
                            <p>-0.5 and +0.5 buttons now will be disabled if they hit 0 or 10 respectively, and will reactivate if they hit 0.5 or 9.5 respectively</p>
                            <p>Changed button colors</p>
                            <p>Removed bottom right "Time before next entry"</p>
                            <p>Graph removed from homepage, set to Darkness again</p>
                            <p className='opacity-40'>To add most recent number on homepage</p>
                            

                            <div>1.0.8 (February 2, 2023)</div>
                            <p>Removed page indicators</p>
                            <p>Moved graph to the homepage (desktop mode)</p>
                            <p>Button click double render on mobile fixed itself somehow</p>
                            

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
                            

                            <div>1.0.6 (January 28, 2023)</div>
                            <p>Changed button colors</p>
                            <p>Fixed submit button transparency logic</p>
                            

                            <div>1.0.5 (January 27, 2023)</div>
                            <p className='mb-0'>Simplified desktop UI</p>
                            <li className='text-gray-400'>Changed color scheme, submit button, reset button, header size, font sizes/boldness</li>
                            

                            <div>1.0.4 (January 23, 2023)</div>
                            <p>Added POST limit to database per IP; If you submit a number and clear your cache, subsequent submissions will be denied until the 24 hours is up. Working to implement limit per device instead of IP. </p>
                            <p>Changed logo</p>
                            <p>Changed result layout</p>
                            <p>Added help button on top right</p>
                            <p>Broke score animation when you submit, now it only shows when you refresh, need to fix</p>
                            

                            <div>1.0.3 (January 20, 2023)</div>
                            <p>Added loading state when global score loads</p>
                            <p>Removed day from score dates</p>
                            


                            <div>1.0.2 (January 16, 2023)</div>
                            <p>Mobile friendlier design </p>
                            

                            <div>1.0.1 (January 15, 2023)</div>
                            <p>When user submits number: Cache & display user's number/date </p>
                            

                            <div className='text-green-400'>1.0.0 (January 13, 2023)</div>
                            <p className='text-green-400'>Deployed client and server on Vercel</p>
                            <div className='text-yellow-400 bg-yellow-400'>______________</div>
                        </div>




                    </div>


                    <div className='text-center bg-black text-sm text-zinc-500 pt-[300px] pb-[20px]  
                    '>
                        {/* For above's max-md depricated */}
                    {/* max-md:absolute max-md:bottom-10 max-md:left-[50%] max-md:-translate-x-1/2 */}

                        Got feedback? Please let me know!
                <div className=''>© 2024 Rainbow Darkness</div>

                        </div>
                </div>

            </div>

            {/* <p className="bottomRightText">Time before next entry:</p> */}

        </>
    )
}

export default Darkness;