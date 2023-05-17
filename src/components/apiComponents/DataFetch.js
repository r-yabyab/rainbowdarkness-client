import React, { Suspense, useEffect, 
    useRef, 
    useState } from "react";
import Loader from "./Loader";
// import { Link } from 'react-router-dom'
import * as d3 from 'd3'
import { useAuth0 } from "@auth0/auth0-react";
import format from "date-fns/format";
import { PutSubmission } from "./PutSubmission";
import { useSelector } from "react-redux";
import { MongoChart } from "./MongoChart";

const RainbowEntries = React.lazy (() => import("./RainbowEntries"));
const RainbowGet = React.lazy(() => import("./RainbowAvgScore"));
// import RainbowDetails from "./RainbowDetails";


// prod
// const RAINBOW_DARKNESS = 'http://localhost:4000'
const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'
// staging
// const RAINBOW_DARKNESS = 'https://rainbowdarkness-server-cayabyabrr-yahoocom.vercel.app'
// localhost

function DataFetch ({destroyer, books, darkMode, graphRef}) {

    const { user, isAuthenticated} = useAuth0()

    const [rainbow, setRainbow] = useState(null)
    const [lastRainbow, setLastRainbow] = useState([])
    const [weekRainbow, setWeekRainbow] = useState([])
    const [todayRainbow, setTodayRainbow] = useState([])
    const [allUserNum, setAllUserNum] = useState([])

    // redux stuff
    const editSubmissionTrigger = useSelector((state) => state.editSubmissionTrigger)


    useEffect(() => {
        const fetchData = async () => {
          const responses = await Promise.all([
            fetch(`${RAINBOW_DARKNESS}/api/rainbows`,),
            fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`,),
            fetch(`${RAINBOW_DARKNESS}/api/rainbows/week`,),
            fetch(`${RAINBOW_DARKNESS}/api/rainbows/today`,),
          ]);
          const data = await Promise.all(responses.map((response) => response.json()));
          const [rainbowData, lastRainbowData, weekRainbowData, todayRainbowData] = data;
          setRainbow(rainbowData);
          setLastRainbow(lastRainbowData);
          setWeekRainbow(weekRainbowData);
          setTodayRainbow(todayRainbowData);
        };
        fetchData();
        // used to refresh on submit
    //   }, [reducerValue]);
    }, [destroyer, editSubmissionTrigger]);

    useEffect(() => {
        const fetchUserNum = async () => {
          if (isAuthenticated) {
            try {
              const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/lastnumuser?sub=${user.sub}`)
              const json = await response.json()
        
              if (response.ok) {
                setAllUserNum(json)
              }
            } catch (error) {
              console.error(error)
            }
          } else {
            // console.log('not logged in')
          }
        }
      
        fetchUserNum()
      }, [isAuthenticated])
    
    // // fetches total avg + total entries
    // useEffect(() => {
    //     const fetchRainbow = async () => {
    //         const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows`,
    //         { mode: 'cors'}
    //         )
    //         const json = await response.json()

    //         if (response.ok) {
    //             setRainbow(json)
    //         }
    //     }
    //     fetchRainbow()
    // }, [reducerValue])

    // // fetches most recent all
    // // for mini graph and everyone elses numbers
    // useEffect(() => {
    //     const fetchLastRainbow = async () => {
    //         const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`,
    //         { mode: 'cors'}
    //         )
    //         const json = await response.json()

    //         if (response.ok) {
    //             setLastRainbow(json)
    //         }
    //     }
    //     fetchLastRainbow()
    // }, [reducerValue])

    // // fetches this week's total entries + avg
    // useEffect(() => {
    //     const fetchWeekRainbow = async () => {
    //         const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/week`,
    //         { mode: 'cors' }
    //         )
    //         const json = await response.json()

    //         if (response.ok) {
    //             setWeekRainbow(json)
    //         }
    //     }
    //     fetchWeekRainbow()
    // }, [reducerValue])

    // // fetches today's total entries + avg
    // useEffect(() => {
    //     const fetchTodayRainbow = async () => {
    //         const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/today`,
    //         { mode: 'cors' })
    //         const json = await response.json()

    //         if (response.ok) {
    //             setTodayRainbow(json)
    //         }
    //     }
    //     fetchTodayRainbow()
    // }, [reducerValue])


    //For calc

    const weekAverage = () => {
        if (weekRainbow.length > 0) {
        const sum = (weekRainbow && weekRainbow.reduce((acc, x) => acc + x.number, 0)) 
        const average = sum/weekRainbow.length
        const parsed = parseFloat(average).toFixed(2) 
        return parsed
        } else {
            return 'N/A'
        }
    }



    const todayAverage = () => {
        if (todayRainbow.length > 0) {
            const dbCheck = todayRainbow && todayRainbow.map(rainbow=> new Date(rainbow.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })) 
            // console.log(dbCheck + 'DB CHECK')
            if (dbCheck.some(x=> x === format(new Date(),'MM/dd'))) {
            const sum = (todayRainbow && todayRainbow.reduce((acc, x) => acc + x.number, 0))
            const average = sum / todayRainbow.length
            const parsed = parseFloat(average).toFixed(2)
            // console.log(todayRainbow)
            // console.log ('test 1')
            return parsed
        } 
        // else 
        // {
        //     console.log('failed')
        //     return 'failed'
        // }
        // } 
        // else 
        // {
            return 'N/A'
        }
    }

    const [matched, setMatched] = useState([])
    const [matchData, setMatchData] = useState([])

    useEffect(() => {
        const userScore = books.map((x, index) => {
            return (`Num:${x.inputNumber} Time:${x.inputTime}`)
        })
        const totalScore = lastRainbow && lastRainbow.map((x, index) => {
            return (`Num:${x.number} Time:${new Date(x.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}`)
        })
        const matching = totalScore.filter((total) =>
            userScore.some((user) => user.inputNumber === total.number && user.inputTime === total.createdAt)
        )

        // const mergedData = lastRainbow.map(x => {
        //     const userData = books.find(q => q.inputNumber === x.number)
        //     return { ...x, ...userData}  

        // })

        const mergedData = books.filter(book => {
            return lastRainbow.some(rainbow => {
                return book.inputNumber === rainbow.number && book.inputTime === (new Date(rainbow.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }))
            })
        })

        setMatchData(mergedData)

        setMatched(matching)

        // console.log(userScore)
        // console.log(totalScore)
        // console.log(`MATCHED: ${matched}`)
    }, [])
    
    // console.log(`MatchData ${JSON.stringify(matchData)} ...`)   
    // useEffect(() => {
    //     console.log(`MatchData changed: ${JSON.stringify(matchData)}`);
    //   }, [matchData]);

    //    const rainbow2 = rainbow.number

    const svgRef = useRef();

//    const dbNumber = lastRainbow && lastRainbow.map((x, index) => {
//     return x.number;
//   });

   const dbNumber = lastRainbow && lastRainbow
   .slice(0, 50)
   .map(x => x.number);

//    const dbCreatedAt = lastRainbow && lastRainbow.map((x, index) => {
//      return new Date(x.createdAt);
//    });

const dbCreatedAt = lastRainbow &&  lastRainbow
//   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 50)
  .map(x => new Date(x.createdAt));

   
   
   useEffect(() => {
     // setting up svg
     const w = 200;
     const h = 40;
     const svg = d3.select(svgRef.current)
       .attr('width', w)
       .attr('height', h)
    //    .style('background', '#d3d3d3')
       .style('margin-top', 0)
       .style('margin-left', 50)
       .style('overflow', 'visible');
     // setting the scaling
     const xScale = d3.scaleTime()
       .domain(d3.extent(dbCreatedAt))
       .range([0, w]);
     // to display y scale as 0-10
     const yScale = d3.scaleLinear()
       .domain([-1,11])
       .range([h, 0]);
     const generateScaledLine = d3.line()
       .x((d, i) => xScale(dbCreatedAt[i]))
       .y(yScale)
       .curve(d3.curveCardinal);
     // setting the axes
     const xAxis = d3.axisBottom(xScale)
        .ticks(0)
    //    .ticks(d3.timeDay.every(1))
    //    .tickFormat(d3.timeFormat('%m/%d'));
     const yAxis = d3.axisLeft(yScale)
        .ticks(0)
    //    .ticks(11)
    //    .tickFormat(i => i);
     svg.append('g')
       .attr('class', 'axis-x')
       .call(xAxis)
       .attr('transform', `translate(0, ${h})`);
     svg.append('g')
       .call(yAxis);
     // remove the previous line
     svg.select(".line").remove();
     // setting up the data for the svg
     svg.append('path')
       .datum(dbNumber)
       .attr('class', 'line')
       .attr('d', generateScaledLine)
       .attr('fill', 'none')
       .attr('stroke', 'black');
   }, [lastRainbow]);

    const scrollToGraph = () => {
        if (graphRef.current) {
            graphRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };



    const [sorted, setSorted] = useState(false)

    const lastRainbowSorted = [...lastRainbow].sort((a, b) => a.number - b.number);

    const sortClick = (e) => {
        setSorted(!sorted)
        // console.log(sorted)
    }

    return destroyer ? (
        <>




            {/* Absolute desktop containers */}
            <div className="relative animate-fade md:pt-[80px]  
                max-w-[1000px] mr-auto ml-auto
                max-md:pt-[100px] max-md:pr-[100px] max-md:pl-[100px]
                ">
                <div className="max-md:hidden md:invisible">___________________________________________________________________________________</div>
                <div className="pt-[80px]">
                   <div className=" 
                        lg:w-[900px] md:w-[700px] 
                         max-md:font-normal m-auto"> <PutSubmission RAINBOW_DARKNESS={RAINBOW_DARKNESS} books={books} /></div>
                    
                    <div className="
                         lg:w-[900px] md:w-[700px] 
                         mr-auto ml-auto
                         max-md:max-w-[300px] mt-32
                         relative
                        ">
                        {/* <span className={darkMode ? "text-zinc-200 tracking-wide font-thin" : "text-black font-bold"}>Global Score</span> */}
                        {/* <Link to='/darkness' className='no-underline text-sm hover:text-blue-200 right-0  md:hidden'><div className="">(chart)</div></Link> */}
                        <div className={`${darkMode ? 'md:bg-neutral-600' : 'md:bg-neutral-200'} flex flex-row justify-evenly max-md:flex-wrap items-center p-8 mt-3  md:rounded-lg md:text-slate-00 md:text-center`}>
                            <div className="">
                                <div className=" bg-black  text-purple-200">TOTAL</div>
                                <div className={darkMode ? 'text-zinc-300 font-thin tracking-wide' : 'text-black'}>Average
                                    <Suspense fallback={<Loader />}>
                                        <RainbowGet rainbow={rainbow} />
                                    </Suspense>
                                </div>
                                <div className={darkMode ? 'text-zinc-300 font-thin tracking-wide' : 'text-black'}> Entries
                                    <Suspense fallback={<Loader />}>
                                        <RainbowEntries rainbow={rainbow} />
                                    </Suspense>
                                </div>
                            </div>

                            <div>
                                <div className=" bg-black  text-purple-200">WEEK</div>
                                {/* {weekRainbow && weekRainbow.map((x, index) => {
                                    return (
                                        <>
                                            <div key={index}>
                                                {x.number}
                                            </div>
                                        </>
                                    )
                                })} */}
                                <div className={darkMode ? 'text-zinc-300 font-thin tracking-wide' : 'text-black'}>Average</div>
                                <div className="text-green-400 ratingAnimationYellow">{weekAverage()}</div>
                                <div className={darkMode ? 'text-zinc-300 font-thin tracking-wide' : 'text-black'}>Entries</div>
                                <div className="text-red-400 ratingAnimationYellow">{weekRainbow.length}</div>

                            </div>


                            <div>
                                <div className=" bg-black  text-purple-200">TODAY</div>
                                {/* {weekRainbow && weekRainbow.map((x, index) => {
                                    return (
                                        <>
                                            <div key={index}>
                                                {x.number}
                                            </div>
                                        </>
                                    )
                                })} */}
                                <div className={darkMode ? 'text-zinc-300 font-thin tracking-wide' : 'text-black'}>Average</div>
                                <div className="text-green-400 ratingAnimationYellow">{todayAverage()}</div>
                                <div className={darkMode ? 'text-zinc-300 font-thin tracking-wide' : 'text-black'}>Entries</div>
                                <div className="text-red-400 ratingAnimationYellow">{todayRainbow.length}</div>

                            </div>


                            <div title="Mini live graph" className="hover:cursor-text flex justify-center mt-2 mr-12 pb-4">
                                <svg className="" ref={svgRef} />
                            </div>
                            {/* <Link to='/darkness' className=' no-underline text-sm hover:text-blue-200 absolute bottom-0 right-0  max-md:hidden'> */}
                            <div onClick={scrollToGraph} className='no-underline text-blue-600 hover:cursor-pointer text-sm hover:text-blue-200   
                                 hover:bg-black max-md:pt-2 max-md:pb-2 bg-gray-400 w-[200px]
                                 absolute max-md:bottom-0 md:bottom-4 md:right-[16%] md:py-2 md:rounded-md
                                 '>
                                full chart
                            </div>
                            
                        </div>
                    </div>

                    

                    {/* <div className="
                        absolute left-0 
                        md:ml-12
                
                        ">
                        <p className={ darkMode ? "text-zinc-200 tracking-wide font-thin" : "text-black font-bold"}>Your Score</p>
                        <div className='w-[240px] p-3
                            [&>div]:justify-center [&>div]:border-0
                         md:bg-white  
                        '>
                            {books.map((book, index1) => (
                                <div key={index1} className=" space-x-2 flex">
                                    <p className="max-md:text-sm">{book.inputTime}: &nbsp;
                                        <span
                                            className=
                                            {`${book.inputNumber === 10 ? 'text-yellow-400'
                                                : book.inputNumber === 0 ? 'text-purple-500'
                                                    : book.inputNumber > 5 ? 'text-green-600'
                                                        : book.inputNumber === 5 ? 'text-blue-500'
                                                            : 'text-red-700'
                                                } 
                            "font-bold ratingAnimationWhite border-green-500 text-green-400"`}
                                        >
                                            {book.inputNumber}</span></p>
                                </div>))}
                        </div>
                    </div> */}

                    <div className={`${darkMode ? 'md:bg-neutral-600' : 'md:bg-neutral-200'} 
                         md:rounded-lg 
                        lg:w-[900px] md:w-[700px] m-auto
                        max-md:w-[300px]
                        
                        `}>
                        {/* <div>Usernum Route
                            <div>
                                {allUserNum && allUserNum.map((x, index) => {
                                return (
                                    <div key={index}>
                                        {x.number}
                                    </div>
                                )
                            })}
                            </div>
                        </div> */}
                        <div className={`${darkMode ? "text-zinc-300 font-thin tracking-wide" : "text-black font-semibold"} pt-8 mt-32 `}>
                            {/* <div>
                                <span className={destroyer ? "bg-yellow-400 text-black" : ""}>Yours</span> & Everyone Elses
                                </div> */}
                                <div>Here are everyone's daily moods (anonymous and registered users).</div>
                                <div>User information is kept private, only <span className={destroyer ? "bg-yellow-400 text-black" : ""}>your number</span> and the date submitted will be public.</div>
                            <span className="text-blue-400 hover:text-blue-200 hover:cursor-pointer" onClick={sortClick}>
                                ({sorted ? 'descending' : 'recent'})
                            </span>
                        </div>

                        <Suspense fallback={<div className="text-red-400 bg-green-300">LOADING...</div>}>
                            <div className="
                            grid grid-cols-10 gap-4 pr-8 pl-8
                            max-md:grid max-md:grid-cols-4 max-md:gap-4 font-semibold
                             [&>div]:pt-0 pt-4 max-md:w-[300px] [&>div]:hover:cursor-text max-md:h-[310px] max-md:overflow-y-scroll no-scrollbar
                             ">
                                {lastRainbow && (sorted ? lastRainbowSorted : lastRainbow)
                                .map((x, index) => {
                                    const matched = books.some(book => {
                                        return book.inputNumber === x.number && book.inputTime === new Date(x.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
                                    })




                                    return (

                                        <div key={index}
                                            className={`${index === 0 ? 'animate-pulse'
                                                : x.number === 10 ? 'text-yellow-400'
                                                    : x.number === 0 ? 'text-purple-500'
                                                        : x.number > 5 ? 'text-green-600'
                                                            : x.number === 5 ? 'text-blue-500'
                                                                : 'text-red-700'
                                                } ${matched ? 'bg-yellow-400' : ''}`}
                                            // title={new Date(x.createdAt).toLocaleDateString()}
                                            title={matched ? `${new Date(x.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })} (YOURS)` : new Date(x.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}

                                        >
                                            {x.number}
                                            {/* {x.createdAt} */}

                                        </div>
                                    );
                                }
                                )}
                            </div>
                        </Suspense>
                        {/* [{"_id":"63ffc14a2cda705b884e245b","number":9.5,"createdAt":"2023-03-01T21:19:06.811Z","updatedAt":"2023-03-01T21:19:06.811Z","__v":0},{"_id":"63feb0cf9b87dcd33d189703","number":4,"createdAt":"2023-03-01T01:56:31.667Z","updatedAt":"2023-03-01T01:56:31.667Z","__v":0},{"_id":"63feac510fee7e58cc3971a2","number":8,"createdAt":"2023-03-01T01:37:21.821Z","updatedAt":"2023-03-01T01:37:21.821Z","__v":0},{"_id":"63feab0e4bd90432a79651d7","number":7,"createdAt":"2023-03-01T01:31:58.494Z","updatedAt":"2023-03-01T01:31:58.494Z","__v":0},{"_id":"63fd4cfe1294ebbe3409c1c7","number":5,"createdAt":"2023-02-28T00:38:22.851Z","updatedAt":"2023-02-28T00:38:22.851Z","__v":0},{"_id":"63fba59033b38ee1b59e5e4d","number":2,"createdAt":"2023-02-26T18:31:44.625Z","updatedAt":"2023-02-26T18:31:44.625Z","__v":0},{"_id":"63faff4d2036728e5d2c979f","number":5.5,"createdAt":"2023-02-26T06:42:21.761Z","updatedAt":"2023-02-26T06:42:21.761Z","__v":0},{"_id":"63f7ed4256a12bd456be0a35","number":7,"createdAt":"2023-02-23T22:48:34.358Z","updatedAt":"2023-02-23T22:48:34.358Z","__v":0},{"_id":"63f7055cdc031fd135551f17","number":6.5,"createdAt":"2023-02-23T06:19:08.119Z","updatedAt":"2023-02-23T06:19:08.119Z","__v":0},{"_id":"63f68ccd4c8bb7251b70a40b","number":0.5,"createdAt":"2023-02-22T21:44:45.835Z","updatedAt":"2023-02-22T21:44:45.835Z","__v":0}] */}

                    </div>

                </div>
            </div>


            {/* <div className="absolute">Test SVG
    <svg ref={svgRef} />
</div> */}
        <div>
          <div ref={graphRef} className='  mb-[280px] mt-32
                     '>
            {/* <iframe title='iframe_mongoDB' className='  
                    m-auto w-[1000px] h-[740px] select-none'
              src="https://charts.mongodb.com/charts-project-0-aloyz/embed/dashboards?id=577710d1-e1f2-4d9b-8216-c06878528255&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed">
            </iframe> */}
            <div className='m-auto flex justify-center select-none'>
                <MongoChart darkMode={darkMode} />
                </div>
          </div>



          <div className="absolute text-sm font-thin text-zinc-400 left-0">© 2023 Rainbow Darkness</div>


        </div>

        </>
    ) : null 
}

export default DataFetch;
