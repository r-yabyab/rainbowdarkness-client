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
        const svg = d3
          .select(svgHomeRef.current)
          .attr("width", w)
          .attr("height", h)
          .style("margin-top", 0)
          .style("margin-left", 50)
          .style("overflow", "visible");
    
        // setting the scaling
        const xScale = d3
          .scaleTime()
          .domain([0, 10])
          .range([0, w]);
        const yScale = d3
          .scaleLinear()
          .domain([-1, 11])
          .range([h, 0]);
    
        const generateScaledLine = d3
          .line()
          .x((d, i) => xScale(i))
          .y((d) => yScale(d))
          .curve(d3.curveCardinal);
    
        // setting the axes
        const xAxis = d3.axisBottom(xScale).ticks(0);
        const yAxis = d3.axisLeft(yScale).ticks(0);
    
        svg
          .append("g")
          .attr("class", "axis-x")
          .call(xAxis)
          .attr("transform", `translate(0, ${h})`);
        svg.append("g").call(yAxis);
    
        // remove the previous line and area
        svg.select(".line").remove();
        svg.select(".area").remove();
    
        // add the flat line
        svg
          .append("line")
          .attr("class", "flat-line")
          .attr("x1", xScale(0))
          .attr("y1", yScale(4.33))
          .attr("x2", xScale(10))
          .attr("y2", yScale(4.33))
          .attr("stroke", "black");
    
        // add the area above/below the flat line
        svg
          .append("path")
          .datum(inputNumber)
          .attr("class", "area")
          .attr("d", d3.area()
            .x((d, i) => xScale(i))
            .y0(yScale(4.33))
            .y1((d) => yScale(d >= 4.33 ? d : 4.33))
          )
          .attr("fill", (d) => (d >= 4.33 ? "red" : "green"));
    
        // add the line
        svg
          .append("path")
          .datum(inputNumber)
          .attr("class", "line")
          .attr("d", generateScaledLine)
          .attr("fill", "none")
          .attr("stroke", "black");
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