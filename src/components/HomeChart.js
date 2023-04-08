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

function HomeChart () {

    const books = getDatafromLS()
    const inputTime = books && books.map(book => new Date(book.inputTime));
    const inputNumber = books && books.map(book => book.inputNumber);

    const svgHomeRef = useRef();

    useEffect(() => {
        // setting up svg
        const w = 200;
        const h = 300;
        const svg = d3.select(svgHomeRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('margin-top', 0)
        .style('margin-left', 50)
        .style('overflow', 'visible');
  
      // setting the scaling
      const xScale = d3.scaleTime()
        .domain([0, inputNumber.length - 1])
        .range([0, w]);
      const yScale = d3.scaleLinear()
        .domain([-1, 11])
        .range([h, 0]);
  
      const generateScaledLine = d3.line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d))
        .curve(d3.curveCardinal);
  
      // setting the axes
      const xAxis = d3.axisBottom(xScale)
         .ticks(0)
      const yAxis = d3.axisLeft(yScale)
         .ticks(0)
  
      svg.append('g')
        .attr('class', 'axis-x')
        .call(xAxis)
        .attr('transform', `translate(0, ${h})`);
      svg.append('g')
        .call(yAxis);
  
      // remove the previous line
      svg.select(".line").remove();
  
      // setting up the data for the svg
      const lineData = inputNumber.map((d, i) => {
        const y = yScale(d);
        const diff = y - yScale(4.33);
        const fillColor = diff >= 0 ? 'green' : 'red';
        return {x: xScale(i), y: y, fillColor: fillColor};
      });
      
      svg.append('path')
        .datum(inputNumber)
        .attr('class', 'line')
        .attr('d', generateScaledLine)
        .attr('fill', 'none')
        .attr('stroke', 'black');
        
      const area = d3.area()
        .x((d) => d.x)
        .y0((d) => d.y)
        .y1(yScale(4.33));
  
      svg.append('path')
        .datum(lineData)
        .attr('class', 'area')
        .attr('d', area)
        .style('fill', (d) => d.fillColor);
      
    }, [books]);

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
                    <svg className="" ref={svgHomeRef} />
                    {inputNumber}

            </div>
            </>
    )
}

export default HomeChart;