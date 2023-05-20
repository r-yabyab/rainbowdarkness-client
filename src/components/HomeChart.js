// User's main chart after they submit a mood

import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useAuth0 } from '@auth0/auth0-react';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

const getDatafromLS = () => {
    const moogleData = localStorage.getItem('_APP_moogle');
    if (moogleData) {
        return JSON.parse(moogleData)
    } else {
        return []
    }
}

// const RAINBOW_DARKNESS = 'https://rainbowdarkness-server.vercel.app'
// const RAINBOW_DARKNESS = 'http://localhost:4000'
const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'



function HomeChart ({darkMode}) {

    const { isAuthenticated, user } = useAuth0()

    const [weekRainbow, setWeekRainbow] = useState('')
    const [weekAvg, setWeekAvg] = useState('')
    // const [showTimeLeft, setShowTimeLeft] = useState(false)

    // redux stuff, tied to data fetch not graph
    const editSubmissionTrigger = useSelector((state) => state.editSubmissionTrigger)

    const dispatch = useDispatch()




        useEffect(() => {
        const fetchWeekRainbow = async () => {
            const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/week`,
            { mode: 'cors' }
            )
            const json = await response.json()

            if (response.ok) {
                setWeekRainbow(json)
            }
        }
        fetchWeekRainbow()
    }, [])

    useEffect(() => {
        if (weekRainbow.length > 0) {
        const sum = (weekRainbow && weekRainbow.reduce((acc, x) => acc + x.number, 0)) 
        const average = sum/weekRainbow.length
        const parsed = parseFloat(average).toFixed(2) 
        setWeekAvg(parsed)
        } else {
            setWeekAvg(0)
        }
    },[weekRainbow])


    const [userNums, setUserNums] = useState('')
    const [userNumsArr, setUserNumsArr] = useState([])
    const [userDatesArr, setUserDatesArr] = useState([])
    const [userObjArr, setUserObjArr] = useState([])
  
    useEffect(() => {
      if (isAuthenticated) {
          const fetchUserNums = async () => {
            if (isAuthenticated) {
              try {
                const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/lastnumuser?sub=${user.sub}`)
                const json = await response.json()
          
                if (response.ok) {
                  setUserNums(json)
                  // console.log('user nums' + userNums )
                  // console.log('LOGGED IN')
                  // console.log(json)
  
                }
              } catch (error) {
                console.error(error)
              }
            } else {
              // console.log('not logged in')
            }
          }
        
          fetchUserNums()
  
      } else {
        // console.log('not registered')
      }
    }, [isAuthenticated, editSubmissionTrigger])
  
    useEffect(() => {
      if (userNums) {
        const mappedData = userNums.map((item) => ({
          x: format(new Date(item.createdAt), 'MM/dd'),
          y: item.number,
          sleep: item.timeSlept,
          activities: item.activities,
          memo: item.memo
        }));
        // console.log('mappedData', mappedData);
        setUserNumsArr(mappedData);

      }
    }, [userNums]);

    
    useEffect(() => {
      if (userNumsArr && userNumsArr.length > 0) {
        // console.log('USER NUMS ARR X', userNumsArr[0].x);
        // console.log('USER NUMS ARR Y', userNumsArr[0].y);
      }
    }, [userNumsArr]);
    
    // console.log('USER NUM ARR ARR ARR ARR', userNumsArr, 'ARF ARF')

    const books = getDatafromLS()
    // const inputTime = books && books.map(book => new Date(book.inputTime));
    const inputNumberData = books && books.map(book => book.inputNumber);
    // const inputNumberData = books && books.map(book => book.inputNumber).slice(Math.max(0, books.length - 10));
    // adds a 0 at the begging of the array
    // inputNumber.unshift(0)
    inputNumberData.unshift(weekAvg)

    //

    // const [tooltipContent, setTooltipContent] = useState([])
    const { setTooltipContent } = bindActionCreators(actionCreators, dispatch)
    const tooltipContent = useSelector((state) => state.tooltipContent)

    const svgHomeRefTEST3 = useRef();

    useEffect(() => {
      
      const setGraph = async () => {
        let data;
      if (!isAuthenticated) {

        const parseDate = d3.timeParse("%m/%d")
        data = (books
          // .slice(0,10)
          .map(item => ({
            x: parseDate(item.inputTime),
            y: item.inputNumber
          })))

      } else {

        const parseDate = d3.timeParse("%m/%d")
        data = (userNumsArr
          .slice(0, 20)
          .map(item => ({
            x: parseDate(item.x),
            y: item.y,
            sleep: item.sleep,
            activities: item.activities,
            memo: item.memo
          })))}

          d3.select(svgHomeRefTEST3.current).selectAll('*').remove();
                const width = 400;
        const height = 200;
        const svg = d3.select(svgHomeRefTEST3.current)
          .attr('width', width)
          .attr('height', height)
          .style('margin-top', 0)
          .style('margin-left', 50)
          .style('overflow', 'visible')
          
          // console.log("2nd useEffect Test: ", data)
          // .style('background', 'black')

        const margin = { top:20, right:20, bottom: 30, left: 50};

        // const g = svg.append("g")
          // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          svg.append('style').text(`
          .axis-x2 line,
          .axis-x2 path,
          .axis-y2 line,
          .axis-y2 path {
            stroke: ${darkMode? "white" : "black" };
          }
        `);

          const x = d3.scaleTime()
            .range([0, width])
            .domain(d3.extent(data, function(d) { return d.x}))


          const y = d3.scaleLinear()
            .range([height, 0])
            // .domain(d3.extent(data, function(d) { return d.y}))
            .domain([0,10])
            // console.log(x.domain(), y.domain() + 'CONSOLE LOG !')

          const line = d3.line()
          .x(d => x(d.x))
          .y(d => y(d.y))
          .curve(d3.curveCatmullRom);
            



            svg.append("g")
              // .attr('transform', 'translate(0,' + height + ")")
              // .call(d3.axisBottom(x))
              // .append('text')
              // .select('.domain')
              // .attr('fill', '#000')
              // .remove()
              .attr('class', 'axis-x2')
              .attr('transform', 'translate(0,' + height + ")")
              .call(
                d3
                  .axisBottom(x)
                  .ticks(5)
                )
              .selectAll("text")
                .attr("fill", `${darkMode ? "white" : "black"}`)
              .selectAll("path")
                .style("stroke", "white")
              

            svg.append("g")
              .attr('class', 'axis-y2')
              .call(
                d3
                  .axisLeft(y)
                  .ticks(5)
                )
              .selectAll('text')
                .attr("fill", `${darkMode ? "white" : "black"}`)
              .selectAll("path")
                .style('stroke', 'white')
                //for putting text
              
            svg.append('g')  
              .append('text')
              .attr("fill", `${darkMode ? "white" : "black"}`)
              // .attr('transform', 'rotate(-90)')
              .attr('x', 390)
              .attr('y', 190)
              // .attr('text-decoration', 'underline')
              .attr('dy', '0.71em')
              .attr('font-size', '8px')
              .attr('text-anchor', 'end')
              .text('Mood Chart @ rainbowdarkness.com')

  const tooltip = d3.select(svgHomeRefTEST3.current)
  .append("text")
  .attr("fill", `${darkMode ? "white" : "black"}`)

            const circle = svg.append('circle')
            .attr('r', 0)
            .attr('fill', `${darkMode ? "white" : "black"}`)
            .style('stroke', 'white')
            .attr('opacity', 1)
            .style('pointer-events', 'none')

            const listeningRect = svg.append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('opacity', 0)
            
                listeningRect.on('mousemove', function(event) {
                  const [xCoord] = d3.pointer(event, this);
                  const bisectDate = d3.bisector(d => d.x).left;
                
                  // Sort the data by x values
                  const sortedData = data.slice().sort((a, b) => a.x - b.x);
                
                  const x0 = x.invert(xCoord);
                  const i = bisectDate(sortedData, x0, 1);
                  const d0 = sortedData[i - 1];
                  const d1 = sortedData[i];
                  const d = x0 - d0.x > d1.x - x0 ? d1 : d0;
                  const xPos = x(d.x);
                  const yPos = y(d.y);
                
                  circle.attr('cx', xPos)
                    .attr('cy', yPos);
                
                  // console.log(xPos)
                  // console.log("test", d.x)

                  circle.transition()
                  .duration(50)
                  .attr('r', 10);

                  // d3.select(svgHomeRefTEST2.current) 
                  tooltip
                  // .append('text')
                  .attr("fill", `${darkMode ? "white" : "black"}`)
                  .style("opacity", 1)
                  // .attr('transform', 'rotate(-90)')
                  .attr('x', xPos)
                  .attr('y', yPos - 30)
                  // .attr('text-decoration', 'underline')
                  .attr('dy', '0.71em')
                  .attr('text-anchor', 'middle')
                  // .text(`Mood:${d.y} Date:${format(d.x, 'MM/dd')} ${d.sleep ? `Sleep: ${d.sleep}hrs` : ''} ${d.activities ? `Activities: ${d.activities}` : ""} ${d.memo ? `Memo: ${d.memo}` : ''}`)
                  .text(`${format(d.x, 'MM/dd')} - ${d.y}`)
                  .append('rect')

                  // setTooltipContent(`Mood:${d.y} Date:${format(d.x, 'MM/dd')} ${d.sleep ? `Sleep: ${d.sleep}hrs` : ''} ${d.activities ? `Activities: ${d.activities}` : ""} ${d.memo ? `Memo: ${d.memo}` : ''}`)
                  setTooltipContent({
                    mood: d.y,
                    date: format(d.x, 'MM/dd'),
                    sleep: d.sleep,
                    activities: d.activities,
                    memo: d.memo,
                  })
                  // to display outside of this useRef:
              });

                listeningRect.on("mouseleave", function () {
                  circle.transition()
                    .duration(50)
                    .attr("r", 0);
              
                  tooltip.style("opacity", 0);

                  setTooltipContent([])
                });



              // plots the line connecting the datapoints
            svg.append('path')
              .datum(data)
              .attr('fill', 'none')
              .attr('stroke', 'steelblue')
              .attr('stroke-linejoin' , 'round')
              .attr('stroke-linecap', 'round')
              .attr('stroke-width' , 1.5)
              .attr('d', line)
              .style('pointer-events', 'none')
              
              // console.log(userNumsArr)

              // each datapoint has a red dot
            svg.selectAll("myCircles")
              .data(data)
              .enter()
              .append('circle')
                .attr('fill', 'red')
                .attr('stroke', 'none')
                .attr('cx', function(d) { return x(d.x) })
                .attr('cy', function(d) { return y(d.y) })
                .attr('r', 3)
                .style('pointer-events', 'none')
              }
              setGraph()
              },[userNumsArr, isAuthenticated, darkMode])

    return (
        <>
        <div>
                    {/* <div className="
                        absolute left-0 
                        md:ml-12
                
                        ">
                        <p className="text-zinc-200 tracking-wide font-thin">Your Score</p>
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
                {/* <div className={`${darkMode ? 'text-zinc-200' :'text-black' } text-center pb-4 -mt-4`}>Here are your most recent submissions:</div> */}
                {/* <svg className="" ref={svgHomeRef} /> */}
                {/* <svg className='mt-4' ref={svgHomeRefTEST2} /> */}
                <svg className='mt-4' ref={svgHomeRefTEST3} />
                {/* <svg className=' overflow-visible' ref={svgHomeRefTEST} /> */}
                <div className={`${darkMode ? 'text-zinc-200' :'text-black' } text-center pt-12`}>Please come again tomorrow to fill the graph!</div>
                {/* <div className='text-center text-zinc-400 pt-2 m-auto hover:text-white hover:cursor-pointer'>
                    {showTimeLeft ? '' : 'Show time left'}
                </div> */}
                {/* {inputNumber} */}
                {/* <div className='bg-white absolute'>{tooltipContent.sleep && 'date:' + tooltipContent.date}</div> */}
            </div>
            </>
    )
}

export default HomeChart;