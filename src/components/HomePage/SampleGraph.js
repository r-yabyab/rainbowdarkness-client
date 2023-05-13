import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import format from "date-fns/format";

export function SampleGraph ({ darkMode }) {

    const dummyData = [
        {inputTime: '05/07', inputNumber: 4.5},
        {inputTime: '05/06', inputNumber: 4},
        {inputTime: '05/05', inputNumber: 5},
        {inputTime: '05/04', inputNumber: 4},
        {inputTime: '05/03', inputNumber: 2.5},
        {inputTime: '04/30', inputNumber: 5, activites: 'Netflix all day, did nothing'},
        {inputTime: '04/29', inputNumber: 5},
        {inputTime: '04/28', inputNumber: 6.5},
        {inputTime: '04/27', inputNumber: 0, activites: 'Fell down a mineshaft'},
        {inputTime: '04/26', inputNumber: 8, activites: 'Went hiking'},
        {inputTime: '04/25', inputNumber: 6},
        {inputTime: '04/23', inputNumber: 5},
        {inputTime: '04/22', inputNumber: 5.5},
        {inputTime: '04/21', inputNumber: 5.5},
        {inputTime: '04/20', inputNumber: 10, activites: 'Ate a turkey sandwich'},
        {inputTime: '04/18', inputNumber: 2, activites: 'Didnt eat today, no money for turkey sandwich'},
        {inputTime: '04/17', inputNumber: 3},
        {inputTime: '04/15', inputNumber: 2},
        {inputTime: '04/14', inputNumber: 3.5},
        {inputTime: '04/13', inputNumber: 2.5},
        {inputTime: '04/12', inputNumber: 0, activites: 'Cat peed on my bed'},
        {inputTime: '04/10', inputNumber: 5},
]

    const svgSampleGraph = useRef();

    useEffect(() => {
        
        const renderDummyGraph = async () => {
 

        let data;
        const parseDate = d3.timeParse("%m/%d")
        data = (dummyData
          // .slice(0,10)
          .map(item => ({
            x: parseDate(item.inputTime),
            y: item.inputNumber,
            activites: item.activites
          })))

 

          d3.select(svgSampleGraph.current).selectAll('*').remove();
                const width = 300;
        const height = 200;
        const svg = d3.select(svgSampleGraph.current)
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
          .curve(d3.curveMonotoneX);
            



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

const tooltipPlaceholder = d3.select(svgSampleGraph.current)
    .append('text')
    .attr("fill", `${darkMode ? "orange" : "orange"}`)

const tooltipPlaceholderStatic = d3.select(svgSampleGraph.current)
    .append('text')
    .attr("fill", `${darkMode ? "orange" : "orange"}`)

            tooltipPlaceholderStatic
                // .attr('transform', 'rotate(-90)')
                .attr('x', 220)
                .attr('y', -30)
                // .attr('text-decoration', 'underline')
                .attr('dy', '0.71em')
                .attr('font-size', '16px')
                .attr('text-anchor', 'end')
              .text('Hover over me!')

  const tooltip = d3.select(svgSampleGraph.current)
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

                  tooltip
                  // .append('text')
                  .attr("fill", `${darkMode ? "white" : "black"}`)
                  .style("opacity", 1)
                  // .attr('transform', 'rotate(-90)')
                  .attr('x', 240)
                  .attr('y', -30)
                  // .attr('text-decoration', 'underline')
                  .attr('dy', '0.71em')
                  .attr('text-anchor', 'end')
                  .text(`Mood:${d.y} Date:${format(d.x, 'MM/dd')} ${d.activites ? `Activities: ${d.activites}` : '' }`)

                  tooltipPlaceholder
                  .style("opacity", 0)

                  tooltipPlaceholderStatic
                  .style("opacity", 0)

  
              });

                listeningRect.on("mouseleave", function () {
                  circle.transition()
                    .duration(50)
                    .attr("r", 0);

                    tooltipPlaceholder
                    // .attr('transform', 'rotate(-90)')
                    .style('opacity', 1)
                    .attr('x', 220)
                    .attr('y', -30)
                    // .attr('text-decoration', 'underline')
                    .attr('dy', '0.71em')
                    .attr('font-size', '16px')
                    .attr('text-anchor', 'end')
                    .text('Hover over me!')
              
                  tooltip
                  .style("opacity", 0)

                });



              // plots the line connecting the datapoints
            svg.append('path')
              .datum(data)
              .attr('fill', 'none')
              .attr('stroke', 'red')
              .attr('stroke-linejoin' , 'round')
              .attr('stroke-linecap', 'round')
              .attr('stroke-width' , 1.5)
              .attr('d', line)
              .style('pointer-events', 'none')
              

              // each datapoint has a red dot
            svg.selectAll("myCircles")
              .data(data)
              .enter()
              .append('circle')
                .attr('fill', 'steelblue')
                .attr('stroke', 'none')
                .attr('cx', function(d) { return x(d.x) })
                .attr('cy', function(d) { return y(d.y) })
                .attr('r', 3)
                .style('pointer-events', 'none')
            }
            renderDummyGraph()
              }, [darkMode])

    return ( 
    <>
    <svg ref={svgSampleGraph} />
    </>
    )
}