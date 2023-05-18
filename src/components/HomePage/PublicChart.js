// chart that mimicks the MongoDB chart, but faster and more customizable

import React, { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import * as d3 from 'd3'
import { useSelector } from "react-redux";

const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'

export function PublicChart ({ darkMode }) {

    const [recentNumArr, setRecentNumArr] = useState([])

    // redux
    const rainbowLastAll = useSelector((state) => state.rainbowLastAll)

    useEffect(() => {
      const json = rainbowLastAll.rainbow 

            //     const dateSimplify = json
            //         .map((item) => ({
            //             x: format(new Date(item.createdAt), 'dd'),
            //             y: item.number,
            //         }))
            //     // console.log(dateSimplify)
            //     setRecentNumArr(json)
            //     const sortByDate = dateSimplify.sort((a, b) => a.x - b.x)
            //     console.log(sortByDate)
                
            //     for (let i = -1; i < sortByDate.length; i++) {
            //         const xMatch = sortByDate.some(item => item[i].x === item[i+1])
            //         if (xMatch) {
            //             sortByDate.reduce((acc, x) => acc + x[i], 0)
            //         }
            //     }
            // }
            const dateSimplify = json.map((item) => ({
                x: format(new Date(item.createdAt), 'dd'),
                y: item.number,
              }));
        
            //   setRecentNumArr(json);
        
              const groupedData = dateSimplify.reduce((acc, item) => {
                const existingGroup = acc.find((group) => group.x === item.x);
        
                if (existingGroup) {
                  existingGroup.numbers.push(item.y);
                } else {
                  acc.push({
                    x: item.x,
                    numbers: [item.y],
                  });
                }
        
                return acc;
              }, []);
        
              const averageData = groupedData.map((group) => ({
                x: group.x,
                y: group.numbers.reduce((sum, number) => sum + number, 0) / group.numbers.length,
                count: group.numbers.length,
              }));
        
              const sortedData = averageData.sort((a,b) => a.x - b.x)
            //   console.log(sortedData);
              setRecentNumArr(sortedData)

    }, [rainbowLastAll])

    const publicChartRef = useRef()

    useEffect(() => {
        // z index dictated by declaration order

        // define d3 data
        let data = recentNumArr
        // const timeParse = d3.timeParse('%m%d')
        // data = (recentNumArr
        //     .map(item => ({
        //         x: timeParse(item.createdAt),
        //         y: item.number,
        //         _v: item.__v
        //     }))
        //     )

        // refresh 
        d3.select(publicChartRef.current).selectAll('*').remove()

        // set dimensions
        const height = 400
        const width = 600
        const svg = d3.select(publicChartRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('margin-top', 0)
            .style('margin-left', 50)
            .style('overflow', 'visible')

            svg.append('style').text(`
            .axis-x line,
            .axis-x path,
            .axis-y line,
            .axis-y path {
                stroke: ${darkMode ? "white" : "black"};
            }
            `);

        // define x y axis
        const x = d3.scaleLinear()
            .range([0, width])
            .domain(d3.extent(data, function(d) { return d.x }))

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0,10])

        const numberLine = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.y))
            .curve(d3.curveCardinal)

        const totalCountLine = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.count))
            .curve(d3.curveCardinal)



        // draw grid lines
            // vertical lines
        svg.selectAll('xGrid')
            .data(x.ticks().slice(1))
            .join('line')
            .attr('x1', d => x(d))
            .attr('x2', d => x(d))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', `${darkMode ? "#1f1f1f" : "#e0e0e0"}`)
            .attr('stroke-width', .5)
            
            // horizontal lines
        svg.selectAll('yGrid')
            .data(y.ticks().slice(1))
            .join('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', d => y(d))
            .attr('y2', d => y(d))
            .attr('stroke', `${darkMode ? "#1f1f1f" : "#e0e0e0"}`)
            .attr('stroke-width', .5)

        // plot data
        // const barWidth = width / data.length;
        // svg.selectAll('.bar')
        //   .data(data)
        //   .enter()
        //   .append('rect')
        //   .attr('class', 'bar')
        //   .attr('z-index', '0')
        //   .attr('x', d => x(d.x) - barWidth / 2)
        //   .attr('y', d => y(d.count))
        //   .attr('width', barWidth)
        //   .attr('height', d => height - y(d.count))
        //   .attr('fill', 'gray');

        // const barWidth = width / data.length;
        //   svg.selectAll('.bar')
        //     .data(data)
        //     .enter()
        //     .append('rect')
        //     .attr('class', 'bar')
        //     .attr('z-index', '0')
        //   //   .attr('x', d => x(d.x) - barWidth / 2)
        //     .attr('x', (d, i) => {
        //           if (i === 0) {
        //             return x(d.x );
        //           } else if (i === data.length - 1) {
        //             return x(d.x) - barWidth / 2;
        //           } else {
        //             return x(d.x) - barWidth / 2;
        //           }
        //         })
        //     .attr('y', d => y(d.count))
        //     .attr('width', barWidth)
        //     .attr('height', d => height - y(d.count))
        //     .attr('fill', 'gray');

        const barWidth = width / (data.length - 1) -1; // Adjusting for the last bar
        svg.selectAll('.bar')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d, i) => {
            if (i === 0) {
              return x(d.x);
            } else if (i === data.length - 1) {
              return x(d.x) - barWidth / 2;
            } else {
              return x(d.x) - barWidth / 2;
            }
          })
          .attr('y', d => y(d.count))
          .attr('width', (d, i) => {
            if (i === 0 || i === data.length - 1) {
              return barWidth / 2;
            } else {
              return barWidth;
            }
          })
          .attr('height', d => height - y(d.count))
          .attr('fill', `${darkMode ? "#1f1f1f" : "#e0e0e0"}`);

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', numberLine)
            .style('pointer-events', 'none')

        // svg.append('path')
        //     .datum(data)
        //     .attr('fill', 'none')
        //     .attr('stroke', 'steelblue')
        //     .attr('stroke-linejoin', 'round')
        //     .attr('stroke-linecap', 'round')
        //     .attr('stroke-width', 1.5)
        //     .attr('d', totalCountLine)
        //     .style('pointer-events', 'none')


                // draw x and y axis
                svg.append('g')
                .attr('class', 'axis-x')
                .attr('transform', 'translate(0,' + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                    .attr("fill", `${darkMode ? "white" : "black"}`)
                .selectAll('path')
                    .style('stroke', 'white')
    
            svg.append('g')
                .attr('class', 'axis-y')
                .call(d3.axisLeft(y))
                .selectAll("text")
                    .attr("fill", `${darkMode ? "white" : "black"}`)
                .selectAll('path')
                    .style('stroke', 'white')


        // axis labelling
        svg.append('g')
            .append('text')
            .attr("fill", `${darkMode ? "white" : "black"}`)
            .attr('x', -200)
            .attr('y', -30)
            .attr('transform', 'rotate(-90)')
            .attr('font-size', '16px')
            .text('value')

        svg.append('g')
            .append('text')
            .attr("fill", `${darkMode ? "white" : "black"}`)
            .attr('x', 240)
            .attr('y', 440)
            .attr('font-size', '16px')
            .text('Day of the Month')

        // tooltips

    }, [recentNumArr, darkMode])



    return (
        <>
        <div 
        className="max-md:w-[340px] pb-16 pt-1 max-md:overflow-x-scroll"
        >
            <svg ref={publicChartRef} />
            </div>
        </>
    )
}