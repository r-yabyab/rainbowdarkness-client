// chart that mimicks the MongoDB chart, but faster and more customizable

import React, { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import * as d3 from 'd3'

const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'

export function MongoChart ({ darkMode }) {

    const [recentNumArr, setRecentNumArr] = useState([])


    useEffect(() => {
        const fetchRecent = async () => {
            const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`)
            const json = await response.json()

            if (response.ok) {
            const dateSimplify = json.map((item) => ({
                x: format(new Date(item.createdAt), 'dd'),
                y: item.number,
              }));
        
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
              setRecentNumArr(sortedData)
            }
        
        }
        fetchRecent()
    }, [])

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
        const width = 846
        const svg = d3.select(publicChartRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('margin-top', 0)
            .style('margin-left', 30)
            .style('overflow', 'visible')

        svg.append('rect')
        .attr("fill", `${darkMode ? "white" : "black"}`)
        .attr('x',-60)
        .attr('y', -124)
        .attr('width', 930)
        .attr('height',624)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('stroke', 'gray')

            svg.append('style').text(`
            .axis-x line,
            .axis-x path,
            .axis-y line,
            .axis-y path {
                stroke: ${!darkMode ? "white" : "black"};
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
            .data(x.ticks(30).slice(1))
            .join('line')
            .attr('x1', d => x(d))
            .attr('x2', d => x(d))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', `${darkMode ? "lightgray" : "#e0e0e0"}`)
            .attr('stroke-width', .5)
            
            // horizontal lines
        svg.selectAll('yGrid')
            .data(y.ticks().slice(1))
            .join('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', d => y(d))
            .attr('y2', d => y(d))
            .attr('stroke', `${darkMode ? "lightgray" : "#e0e0e0"}`)
            .style('stroke-width', .5)

        // const barWidth = width / (data.length - 1) -1; // Adjusting for the last bar
        // svg.selectAll('.bar')
        //   .data(data)
        //   .enter()
        //   .append('rect')
        //   .attr('class', 'bar')
        //   .attr('x', (d, i) => {
        //     if (i === 0) {
        //       return x(d.x);
        //     } else if (i === data.length - 1) {
        //       return x(d.x) - barWidth / 2;
        //     } else {
        //       return x(d.x) - barWidth / 2;
        //     }
        //   })
        //   .attr('y', d => y(d.count))
        //   .attr('width', (d, i) => {
        //     if (i === 0 || i === data.length - 1) {
        //       return barWidth / 2;
        //     } else {
        //       return barWidth;
        //     }
        //   })
        //   .attr('height', d => height - y(d.count))
        //   .attr('fill', `${darkMode ? "#1f1f1f" : "#e0e0e0"}`);

            // avg number
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'limegreen')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 2)
            .attr('d', numberLine)
            .style('pointer-events', 'none')

            // total count line
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'dodgerblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .style('stroke-dasharray', ('3, 3'))
            .attr('stroke-width', 2)
            .attr('d', totalCountLine)
            .style('pointer-events', 'none')


                // draw x and y axis
                svg.append('g')
                .attr('class', 'axis-x')
                .attr('transform', 'translate(0,' + height + ")")
                .call(d3.axisBottom(x).ticks(30))
                .selectAll("text")
                    .attr("fill", `${!darkMode ? "white" : "black"}`)
                    .attr('transform', 'rotate(-90)')
                    .attr('x',-8)
                    .attr('font-size', '14px')
                    .attr('text-anchor', 'end')
                    .attr('y',24)
                .selectAll('path')
                    .style('stroke', 'white')
    
            svg.append('g')
                .attr('class', 'axis-y')
                .call(d3.axisLeft(y))
                .selectAll("text")
                    .attr("fill", `${!darkMode ? "white" : "black"}`)
                    .attr('font-size', '14px')
                    .attr('text-anchor', 'end')
                .selectAll('path')
                    .style('stroke', 'white')


        // axis labelling
        svg.append('g')
            .append('text')
            .attr("fill", `${!darkMode ? "white" : "black"}`)
            .attr('x', -220)
            .attr('y', -30)
            .attr('transform', 'rotate(-90)')
            .attr('font-size', '16px')
            .attr('font-size', '20px')
            .attr('font-weight', '600')
            .text('Value')

        svg.append('g')
            .append('text')
            .attr("fill", `${!darkMode ? "white" : "black"}`)
            .attr('x', 396)
            .attr('y', 450)
            .attr('font-size', '20px')
            .attr('font-weight', '600')
            .text('Date')

        // header labels
        svg.append('g')
            .append('text')
            .attr("fill", `${!darkMode ? "white" : "black"}`)
            .attr('x', 320)
            .attr('y', -92)
            .attr('font-size', '16px')
            .attr('font-weight', '600')
            .text('Public Happiness Graph')

        svg.append('g')
            .append('text')
            .attr("fill", `${!darkMode ? "white" : "black"}`)
            .attr('x', 220)
            .attr('y', -70)
            .attr('font-size', '14px')
            .text('Shows the # of unique visitors & average mood since January 2023')

        svg.append('g')
            .append('text')
            .attr("fill", `${!darkMode ? "white" : "black"}`)
            .attr('x', 220)
            .attr('y', -70)
            .attr('font-size', '14px')
            .text('Shows the # of unique visitors & average mood since January 2023')

        // legend
        svg.append('g')
            .append('text')
            .attr("fill", `${!darkMode ? "white" : "black"}`)
            .attr('x', 0)
            .attr('y', -40)
            .attr('font-weight', '600')
            .attr('font-size', '14px')
            .text('Series')

        // Average mood label
        svg.append('g')
            .append('text')
            .attr("fill", `${!darkMode ? "white" : "black"}`)
            .attr('class', 'hoverable-text')
            .attr('x', 26)
            .attr('y', -24)
            .attr('font-size', '14px')
            .attr('font-weight', '400')
            .text('Average Mood')

                svg.append('g')
            .append('rect')
            .attr("fill", 'limegreen')
            .attr('x', 0)
            .attr('y', -28)
            .attr('width', 20)
            .attr('height', 2)
            .attr('font-size', '14px')
            .attr('font-weight', '400')
            .text('Unique Visitors')


        // unique visitors label
        svg.append('g')
            .append('text')
            .attr("fill", `${!darkMode ? "white" : "black"}`)
            .attr('x', 156)
            .attr('y', -24)
            .attr('font-size', '14px')
            .attr('font-weight', '400')
            .text('Unique Visitors')

            svg
                .append('g')
                .append('line')
                .attr('x1', 130)
                .attr('y1', -28)
                .attr('x2', 150)
                .attr('y2', -28)
                .style('stroke', 'dodgerblue')
                .style('stroke-dasharray', ('3,3'))
                .style('stroke-width', 2);

        // tooltips

    }, [recentNumArr, darkMode])



    return (
        <>
        <div 
        className="max-md:w-[340px] max-md:h-[700px] pl-8 pr-8 pt-32 max-md:overflow-x-scroll"
        >
            <svg ref={publicChartRef} />
            </div>
        </>
    )
}