import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

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

    const books = getDatafromLS()
    // const inputTime = books && books.map(book => new Date(book.inputTime));
    // const inputNumber = books && books.map(book => book.inputNumber);
    const inputNumber = books && books.map(book => book.inputNumber).slice(Math.max(0, books.length - 10));
    // adds a 0 at the begging of the array
    // inputNumber.unshift(0)
    inputNumber.unshift(weekAvg)

    const svgHomeRef = useRef();

    useEffect(() => {
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
        const xScale = d3.scaleTime()
          .domain([0, 10])
          .range([0, w]);
        const yScale = d3.scaleLinear()
        //   .domain([-1, 11])
          .domain([0, 10])
          .range([h, 0]);
    
        const generateScaledLine = d3.line()
          .x((d, i) => xScale(i))
          .y(yScale)
          .curve(d3.curveCardinal);
    
        // setting the axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(0);
        const yAxis = d3.axisLeft(yScale)
            .ticks(0)

        // displays axes
        svg.append('g')
            .attr('class', 'axis-x')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)
            .select(".domain")
            .attr("stroke", "white");
        svg.append('g')
            .call(yAxis)
            .select(".domain")
            .attr("stroke", "white");

        if (weekAvg) {           
    
        // remove the previous line and area
        svg.select(".line").remove();
        svg.select(".area").remove();
    
        // setting up the data for the svg
        svg.append('path')
  .datum(inputNumber)
  .attr('class', 'line')
  .attr('d', generateScaledLine)
  .attr('fill', 'none')
  .attr("stroke-width", 4)
  .attr('stroke', 'white');

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
  .y0(yScale(weekAvg))
  .y1((d) => yScale(d))
  .curve(d3.curveCardinal);

const areaPath = svg.append("path")
  .datum(inputNumber)
  .attr("class", "area")
  .attr("d", areaGenerator)
  .attr("fill", "none");

const areaGradient = svg.append("linearGradient")
  .attr("id", "area-gradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", 0).attr("y1", yScale(weekAvg))
  .attr("x2", 0).attr("y2", yScale(d3.min(inputNumber)))
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

//   const areaGradient = svg.append("defs")
//   .append("linearGradient")
//   .attr("id", "area-gradient")
//   .attr("gradientUnits", "userSpaceOnUse")
//   .attr("x1", 0).attr("y1", yScale(0))
//   .attr("x2", 0).attr("y2", yScale(10))
//   .selectAll("stop")
//   .data([
//     { offset: "0%", color: "red" },
//     { offset: "50%", color: "red" },
//     { offset: "50%", color: "green" },
//     { offset: "100%", color: "green" }
//   ])
//   .enter().append("stop")
//   .attr("offset", function (d) { return d.offset; })
//   .attr("stop-color", function (d) { return d.color; });

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
          
    }, [books, weekRainbow]);

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