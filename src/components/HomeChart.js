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
    const [expandChart, setExpandChart] = useState(false)
    // const [showTimeLeft, setShowTimeLeft] = useState(false)


    useEffect(() => {
      const handleResize = () => {
        const isMaxMd = window.innerWidth <= 768; // Assuming "max-md" corresponds to 768px in Tailwind CSS
        setExpandChart(!isMaxMd);
      };
  
      // Initial check on component mount
      handleResize();
  
      // Listen for window resize event
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const expandChartHandler = () => {
      setExpandChart(!expandChart)
      console.log(expandChart)
    }

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
        const mappedData = userNums
        .map((item) => ({
          x: format(new Date(item.createdAt), 'MM/dd HH:mm yy'),
          y: item.number,
          sleep: item.timeSlept,
          activities: item.activities,
          memo: item.memo
        }));
        console.log('mappedData', mappedData);
        setUserNumsArr(mappedData);

        // const startingPoint = userNumsArr[0].x
        // console.log(startingPoint)
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

    // renders the graph
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

        // parses from date-fns string of MM/dd HH:mm
        const parseDate = d3.timeParse("%m/%d %H:%M %Y")
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
                // const width = 400;
                
                const width = `${expandChart ? 800 : 340}`
        const height = 200;
        const svg = d3.select(svgHomeRefTEST3.current)
          .attr('width', width)
          .attr('height', height)
          .style('margin-top', 0)
          // .style('margin-left', 50)
          .style('margin-left', 0)
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
            

        // draw grid lines
            // vertical lines
            svg.selectAll('xGrid')
            .data(x.ticks(30).slice(1))
            .join('line')
            .attr('x1', d => x(d))
            .attr('x2', d => x(d))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', `${darkMode ? "gray" : "#e0e0e0"}`)
            .attr('stroke-width', `${expandChart ? .5 : 0}`)
            
            // horizontal lines
        svg.selectAll('yGrid')
            .data(y.ticks().slice(1))
            .join('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', d => y(d))
            .attr('y2', d => y(d))
            .attr('stroke', `${darkMode ? "gray" : "#e0e0e0"}`)
            .style('stroke-width', .5)

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
                  .ticks(`${expandChart ? 20 : 5}`)
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
              .attr("fill", `${darkMode ? "gray" : "gray"}`)
              // .attr('transform', 'rotate(-90)')
              .style('position', 'absolute')
              .attr('x', width -10)
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
                  .text(`${format(d.x, 'MM/dd HH:mm')} - ${d.y}`)
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
              },[userNumsArr, isAuthenticated, darkMode, expandChart])

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
        
        {/* <div
          className='absolute max-md:hidden top-0 text-white bg-zinc-600 hover:bg-zinc-400 hover:cursor-pointer p-1 rounded-md  '
          onClick={expandChartHandler}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={ expandChart ? "hidden" : "bi bi-arrows-angle-expand"} viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={ expandChart ? "bi bi-fullscreen-exit" : "hidden"} viewBox="0 0 16 16">
            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
          </svg>
        </div> */}

      </div>
    </>
  )
}

export default HomeChart;