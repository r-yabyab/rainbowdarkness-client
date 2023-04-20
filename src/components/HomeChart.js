import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useAuth0 } from '@auth0/auth0-react';

const getDatafromLS = () => {
    const moogleData = localStorage.getItem('_APP_moogle');
    if (moogleData) {
        return JSON.parse(moogleData)
    } else {
        return []
    }
}

const RAINBOW_DARKNESS = 'https://rainbowdarkness-server.vercel.app'


function HomeChart () {

    const { isAuthenticated, user } = useAuth0()

    const [weekRainbow, setWeekRainbow] = useState('')
    const [weekAvg, setWeekAvg] = useState('')
    // const [showTimeLeft, setShowTimeLeft] = useState(false)

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
  
    useEffect(() => {
      if (isAuthenticated) {
          const fetchUserNums = async () => {
            if (isAuthenticated) {
              try {
                const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/lastnumuser?sub=${user.sub}`)
                const json = await response.json()
          
                if (response.ok) {
                  setUserNums(json)
                  console.log('user nums' + userNums )
                  console.log('LOGGED IN')
  
                }
              } catch (error) {
                console.error(error)
              }
            } else {
              console.log('not logged in')
            }
          }
        
          fetchUserNums()
  
      } else {
        console.log('not registered')
      }
    }, [isAuthenticated])
  
    useEffect(() => {
      if (userNums) {
        const mappedNums = 
            userNums
            .reverse()
            .map(x => x.number)
        setUserNumsArr(mappedNums)
        console.log('USER NUM ARR ARR ARR ARR' + userNumsArr + 'ARF ARF ')
  } else {
    console.log('ARF ARF ARF ARF ARF ')
  }
    }, [userNums])
    
    console.log('USER NUM ARR ARR ARR ARR', userNumsArr, 'ARF ARF')

    const books = getDatafromLS()
    // const inputTime = books && books.map(book => new Date(book.inputTime));
    // const inputNumber = books && books.map(book => book.inputNumber);
    const inputNumberData = books && books.map(book => book.inputNumber).slice(Math.max(0, books.length - 10));
    // adds a 0 at the begging of the array
    // inputNumber.unshift(0)
    inputNumberData.unshift(weekAvg)

    const svgHomeRef = useRef();

    useEffect(() => {

      const graphNumData = isAuthenticated ? userNumsArr : inputNumberData;

        d3.select(svgHomeRef.current).selectAll('*').remove();
        // setting up svg
        const w = 400;
        const h = 200;
        const svg = d3.select(svgHomeRef.current)
          .attr('width', w)
          .attr('height', h)
          .style('margin-top', 0)
          .style('margin-left', 50)
          .style('overflow', 'visible')
        //   .style('background', '');
    
        // setting the scaling
        var xScale = d3.scaleLinear()
        // const xScale = d3.scaleTime()
          .domain([0, 10])
        //   .domain(d3.extent(books.map((d) => d.inputTime[0])))
          // .domain([0, books.length +1])
          .range([0, w]);
        var yScale = d3.scaleLinear()
        //   .domain([-1, 11])
          .domain([0, 10])
          // .domain(d3.extent(books.map((d) => d.inputNumber)))
          .range([h, 0]);
    
        const generateScaledLine = d3.line()
          .x((d, i) => xScale(i))
        //   .x((d) => xScale(d))
          .y(yScale)
          .curve(d3.curveCardinal);
    
        // setting the axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(10);
        const yAxis = d3.axisLeft(yScale)
            .ticks(4)
            

  // Append the CSS style to make axis white
  // .axis-x1 because .axis-x is shared with the miniGraph on /apiComponents
  svg.append('style').text(`
    .axis-x1 line,
    .axis-x1 path,
    .axis-y line,
    .axis-y path {
      stroke: white;
    }
  `);


        // displays axes
        svg.append('g')
        .attr('class', 'axis-x1')
        .call(xAxis)
        .attr('transform', `translate(0, ${h})`)
        .selectAll("text")
          .attr("fill", "white")
        .selectAll("path")
          .style("stroke", "white");
          
      svg.append('g')
        .attr('class', 'axis-y')
        .call(yAxis)
        .selectAll("text")
          .attr("fill", "white")
        .selectAll("path")
          .attr("stroke", "white")

                  // displays axes
    //     svg.append('g')
    //     .attr('class', 'axis-x')
    //     .call(xAxis)
    //     .attr('transform', `translate(0, ${h})`)
    //     .select(".domain")
    //     .attr("stroke", "white");
    // svg.append('g')
    //     .call(yAxis)
    //     .select(".domain")
    //     .attr("stroke", "white");

        if (weekAvg) {           
    
        // remove the previous line and area
        svg.select(".line").remove();
        svg.select(".area").remove();
    
        // setting up the data for the svg
        svg.append('path')
  .datum(graphNumData)
  .attr('class', 'line')
  .attr('d', generateScaledLine)
  .attr('fill', 'none')
  .attr("stroke-width", 3)
  .attr('stroke', 'white');
//   .attr('d', d3.line()
//             .xScale(function(d) { return xScale(d.xScale)})
//             .yScale(function(d) { return yScale(d.yScale )})
//             )

// adding a flat line at y=4.33
svg.append("line")
  .attr("x1", 0)
  .attr("y1", yScale(weekAvg))
  .attr("x2", w)
  .attr("y2", yScale(weekAvg))
  .attr("stroke-width", 2)
  .attr("stroke", "darkorchid");

// adding weekAvg label
svg.append("text")
  .attr("x", w + 5)
  .attr("y", yScale(weekAvg) - 5)
  .attr("font-size", "12px")
  .attr("fill", "black")
  .style("fill", "darkorchid")
  .text((weekRainbow.length > 0) ? `Weekly average: ${weekAvg}` : `New Week`);

// adding the fill area
const areaGenerator = d3.area()
  .x((d, i) => xScale(i))
  // .y0(yScale(weekAvg))
  // supposed to lay the y axis line above the area gradient. To test
  .y0(yScale(d3.min(graphNumData)))
  .y1((d) => yScale(d))
  .curve(d3.curveCardinal);

const areaPath = svg.append("path")
  .datum(graphNumData)
  .attr("class", "area")
  .attr("d", areaGenerator)
  .attr("fill", "none");

const areaGradient = svg.append("linearGradient")
  .attr("id", "area-gradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", 0).attr("y1", yScale(weekAvg))
  .attr("x2", 0).attr("y2", yScale(d3.min(graphNumData)))
  .selectAll("stop")
  .data([
    { offset: "0%", color: "green" },
    // { offset: "0%", color: "purple" },
    // { offset: "50%", color: "grey" },
    { offset: "0%", color: "red" }
  ])
  .enter().append("stop")
  .attr("offset", function(d) { return d.offset; })
  .attr("stop-color", function(d) { return d.color; });

// for hover over shit

//   const bisect = d3.bisector(function(d) { return d.x; }).left

//   const focus = svg
//   .append('g')
//   .append('circle')
//     .style('fill', 'none')
//     .attr('stroke', 'black')
//     .attr('r', 8.5)
//     .style('opacity', 0)

//   const focusText = svg
//     .append('g')
//     .append('text')
//         .style('opacity', 0)
//         .attr('text-anchor', 'left')
//         .attr('allignment-baseline', 'middle')

//   svg
//   .append('rect')
//         // shows the hover area
//         .style('fill', 'purple')
//         .style('opacity', 0.2)
//   .style('pointer-events', 'all')
//   .attr('width', w)
//   .attr('height', h)
//   .on('mouseover', mouseover)
//   .on('mousemove', mousemove)
//   .on('mouseout', mouseout);

//   function mouseover() {
//     focus.style("opacity", 1)
//     .style('stroke' , 'white')
//     focusText.style("opacity",1)
//     .style('stroke', 'purple')
//   }

//   // from pepeBot
// //   function mousemove(event) {
// //     const x0 = xScale.invert(d3.pointer(event)[0]);
// //     const i = bisect(inputNumber, x0, 1);
// //     const selectedData = inputNumber[i - 1];
// //     focus
// //       .attr('cx', xScale(i - 1))
// //       .attr('cy', yScale(selectedData))
// //     focusText
// //       .html('Index: ' + (i - 1) + ' - ' + "Value: " + selectedData)
// //       .attr('x', xScale(i - 1) + 15)
// //       .attr('y', yScale(selectedData))
  
// //     console.log('Index:', i - 1, 'Value:', selectedData);
// //   }

  

//   function mousemove(event) {
//     const x0 = xScale.invert(d3.pointer(event)[0]);
//     const i = bisect(inputNumberData, x0, 0);
//     const selectedData = inputNumberData[i]
//     focus
//         .attr('cx', xScale(selectedData.x))
//         .attr('cy', yScale(selectedData.y))
//     focusText
//         .html('x:' + x0 + ' - ' + "y:" + selectedData.y)
//         // .attr('x', xScale(selectedData.x)+15)
//         .attr('x', xScale(x0)+15)
//         .attr('y', yScale(selectedData.y))

//         console.log('i:', i, 'x0:', x0, 'inputNumber[i]:', inputNumberData[i], 'SelectedDatay:', selectedData.y);
//     }

//   function mouseout() {
//     focus.style('opacity', 0)
//     focusText.style('opacity', 0)
//   }
  

  

areaPath.attr("fill", "url(#area-gradient)");





        } else {
            svg.append('text')
            .attr('class', 'loading')
            .attr('x', w / 2)
            .attr('y', h / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text('Loading...');
          return; // exit the useEffect hook
        }
        // console.log(inputNumberData)
          
    }, [books, weekRainbow, userNumsArr]);


    // TEST TEST TEST
    // TEST TEST TEST
    // const svgHomeRefTEST = useRef();
    // let dummyData = [
    //     [1,1],
    //     [2,1],
    // ]

    // useEffect(() => {
    //     var margin = {top: 10, right: 30, bottom: 30, left: 60},
    //     width = 460 - margin.left - margin.right,
    //         height = 400 - margin.top - margin.bottom;

    //     var svg = d3.select(svgHomeRefTEST.current)
    //         .append("svg")
    //         .attr("width", width + margin.left + margin.right)
    //         .attr("height", height + margin.top + margin.bottom)
    //         .append("g")
    //         .attr("transform",
    //             "translate(" + margin.left + "," + margin.top + ")");

    //         // add x axis
    //         var x = d3.scaleLinear()
    //             .domain([1, 50])
    //             .range([0, width]);
    //         svg.append('g')
    //             .attr('transform', 'translate(0,' + height + ')')
    //             .call(d3.axisBottom(x));
            
    //         // add y axis
    //         var y = d3.scaleLinear()
    //             .domain([0,13])
    //             .range([ height, 0]);
    //         svg.append('g')
    //             .call(d3.axisLeft(y))

    //         //to do this
    //         //var bisect = d3.bisector

    //         var focus = svg
    //             .append('g')
    //             .append('circle')
    //                 .style('fill', 'none')
    //                 .attr('stroke', 'black')
    //                 .attr('r', 8.5)
    //                 .style('opactiy', 0)

    //         var focusText = svg
    //             .append('g')
    //             .append('text')
    //                 .style('opacity', 0)
    //                 .attr('text-anchor', 'left')
    //                 .attr('alignment-baseline', 'middle')

    //                 // console.log('books' + JSON.stringify(books))
    //         // add the line
    //         svg
    //             .append('path')
    //             .datum(books.map(function(d) { return { inputTime: +d.inputTime, inputNumber: +d.inputNumber }; }))
    //             .attr('fill', 'none')
    //             .attr('stroke', 'black')
    //             .attr('stroke-width', 1.5)
    //             .attr('d', d3.line()
    //                 .x(function(d) { return x(d.inputTime); })
    //                 .y(function(d) { return y(d.inputNumber); })
    //                 );

    //     console.log('penis')
    // },[books, userNumsArr])


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
                <div className='text-zinc-200 text-center pb-4 -mt-4'>Here are your most recent submissions:</div>
                <svg className="" ref={svgHomeRef} />
                {/* <svg className=' overflow-visible' ref={svgHomeRefTEST} /> */}
                <div className='text-zinc-200 text-center pt-12'>Please come again tomorrow to fill the graph!</div>
                {/* <div className='text-center text-zinc-400 pt-2 m-auto hover:text-white hover:cursor-pointer'>
                    {showTimeLeft ? '' : 'Show time left'}
                </div> */}
                {/* {inputNumber} */}
            </div>
            </>
    )
}

export default HomeChart;