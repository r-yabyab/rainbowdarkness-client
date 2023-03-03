import React, { Suspense, useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { Link } from 'react-router-dom'
import * as d3 from 'd3'
const RainbowEntries = React.lazy (() => import("./RainbowEntries")) ;
const RainbowGet = React.lazy(() => import("./RainbowAvgScore"));
// import RainbowDetails from "./RainbowDetails";

const RAINBOW_DARKNESS = 'https://rainbowdarkness-server.vercel.app'

function DataFetch ({reducerValue, destroyer, books}) {

    const [rainbow, setRainbow] = useState(null)
    const [lastRainbow, setLastRainbow] = useState([])

    useEffect(() => {
        const fetchRainbow = async () => {
            const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows`)
            const json = await response.json()

            if (response.ok) {
                setRainbow(json)
            }
        }
        fetchRainbow()
    }, [reducerValue])

    useEffect(() => {
        const fetchLastRainbow = async () => {
            const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`)
            const json = await response.json()

            if (response.ok) {
                setLastRainbow(json)
            }
        }
        fetchLastRainbow()
    }, [reducerValue])

//     const [matched, setMatched] = useState([])
//     const [matchData, setMatchData] = useState([])

// useEffect(() => {
//         const userScore = books.map((x, index) => {
//             return (`Num:${x.inputNumber} Time:${x.inputTime}`)
//         })
//         const totalScore = lastRainbow && lastRainbow.map((x, index) => {
//             return (`Num:${x.number} Time:${new Date(x.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'})}`)
//         }) 
//         const matching = totalScore.filter((total) =>
//         userScore.some((user) => user.inputNumber === total.number && user.inputTime === total.createdAt)
//         )  

//         // const mergedData = lastRainbow.map(x => {
//         //     const userData = books.find(q => q.inputNumber === x.number)
//         //     return { ...x, ...userData}  
            
//         // })

//         const mergedData = books.filter(book => {
//             return lastRainbow.some(rainbow => {
//                 return book.inputNumber === rainbow.number && book.inputTime === (new Date(rainbow.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'}))
//             }) 
//         })

//         setMatchData(mergedData)

//         setMatched(matching)

//         console.log(userScore)
//         console.log(totalScore)
//         console.log(`MATCHED: ${matched}`)  
// }, []) 
// console.log(`MatchData ${JSON.stringify(matchData)} ...`)   

   //const rainbow2 = rainbow.number

   const svgRef = useRef()

   const dbNumber = lastRainbow && lastRainbow.map((x, index) => {
    return (x.number)
    })
    const dbCreatedAt = lastRainbow && lastRainbow.map((x, index) => {
        return (new Date(x.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'}))
    })

   useEffect(() => {
    // setting up svg
    const w = 1000;
    const h = 400;
    const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        // .style('background', '#d3d3d3')
        .style('background', 'white')
        .style('margin-top', 0)
        .style('margin-left', 50)
        .style('overflow', 'visible')
    // setting the scaling
    const xScale = d3.scaleLinear()
        .domain([0, lastRainbow.length -1])  //determines how many plots/ticks
        .range([0, w])
    const yScale = d3.scaleLinear()
        .domain([-1, 11]) //bottom to height
        .range([h, 0])  //topleft to down
    const generateScaledLine = d3.line()
        .x((d,i) => xScale(i))      // i is a number that we're getting from d3
        .y(yScale)
        // .curve(d3.curveCardinal)
        .curve(d3.curveCardinalClosed)
    // setting the axes
    const xAxis = d3.axisBottom(xScale)
        .ticks(lastRainbow.length)
        .tickFormat(i => i + 1)
    const yAxis = d3.axisLeft(yScale)
        .ticks(10)
        .tickFormat(i=>i+1)
    svg.append('g')     //g == group tag
        .call(xAxis)
        .attr('transform', `translate(0, ${h})`)        //places h at the bottom
    svg.append('g')
        .call(yAxis)
    // setting up the data for the svg

    svg.selectAll('.line')
        .data([dbNumber])
        .join('path')
            .attr('d', d => generateScaledLine(d))
            .attr('fill', 'none')
            .attr('stroke', 'black')

   }, [lastRainbow])


    return (
        <>

        


{/* Absolute desktop containers */}
            <div className="relative md:pt-[80px] pr-[100px] pl-[100px] 
            max-w-[1000px] mr-auto ml-auto mb-[200px]
            max-md:pt-[100px] max-md:pointer-events-none max-md:absolute max-md:left-[8%]
            ">
                <div className="max-md:hidden">___________________________________________________________________________________</div>
                <div className="pt-[80px]">
                    <div className="
                absolute w-[240px] 
                md:mr-12 md:right-0
                max-md:
                ">
                        <span className="font-bold">Global Score</span>
                        <div className="  p-3 mt-3 md:bg-white md:text-slate-00 md:text-center">
                            <div>Avg Score
                                <Suspense fallback={<Loader />}>
                                    <RainbowGet rainbow={rainbow} />
                                </Suspense>
                            </div>
                            <div> Entries
                                <Suspense fallback={<Loader />}>
                                    <RainbowEntries rainbow={rainbow} />
                                </Suspense>
                            </div>
                            <Link to='/darkness' className='absolute no-underline text-sm hover:text-blue-200 right-0  max-md:hidden'><div className="">chart</div></Link>
                        </div>
                    </div>

<div className=" max-md:hidden absolute left-[50%]  -translate-x-1/2 "> 
<span className="font-bold">Individual Mood</span>

                        <Suspense fallback={<div className="text-red-400 bg-green-300">LOADING...</div>}>
                            <div className="grid grid-cols-4 gap-4 font-semibold 
                             [&>div]:pt-0 pt-4 w-[180px] [&>div]:hover:cursor-text
                             ">
                                {lastRainbow && lastRainbow.map((x, index) =>

                                {
                                    const matched = books.some(book => {
                                        return book.inputNumber === x.number && book.inputTime === new Date(x.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'})
                                    })
                                



return (

                                    <div key={index} 
                                    className={`${
                                        index === 0 ? 'animate-pulse'
                                      : x.number === 10 ? 'text-yellow-400'
                                      : x.number === 0 ? 'text-purple-500'
                                      : x.number > 5 ? 'text-green-600'
                                      : x.number === 5 ? 'text-blue-500'
                                      : 'text-red-700'
                                      } ${matched ? 'bg-yellow-400' : ''}`}
                                        // title={new Date(x.createdAt).toLocaleDateString()}
                                        title={matched ? `${new Date(x.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'})} (YOURS)` : new Date(x.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'})}
           
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

                <div className="
                absolute left-0 
                md:ml-12
                
                ">
                    <p className="font-bold">Your Score</p>
                    <div className='w-[240px] p-3
                    [&>div]:justify-center [&>div]:border-0
                    md:bg-white  
                    '>
                        {books.map((book, index1) => (
                        <div key={index1} className=" space-x-2 flex">
                            <p className="max-md:text-sm">{book.inputTime}: &nbsp; 
                            <span 
                            className=
                            {`${
                                book.inputNumber === 10 ? 'text-yellow-400'
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
                </div>
            </div>
            </div>


<div className="absolute">Test SVG
    <svg ref={svgRef}></svg>
</div>

        </>
    )
}

export default DataFetch;
