import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useAuth0 } from '@auth0/auth0-react';
import format from 'date-fns/format';

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
        const mappedData = userNums.map((item) => ({
          x: format(new Date(item.createdAt), 'MM/dd'),
          y: item.number,
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

//     const svgHomeRef = useRef();

//     useEffect(() => {
//       // localstorage or mongoDB for graph data
//       // const graphNumData = isAuthenticated ? userNumsArr : inputNumberData;
//       const graphNumData = userNumsArr;
//       // const graphNumData = isAuthenticated ? userObjArr : inputNumberData;

//         d3.select(svgHomeRef.current).selectAll('*').remove();
//         // setting up svg
//         const w = 400;
//         const h = 200;
//         const svg = d3.select(svgHomeRef.current)
//           .attr('width', w)
//           .attr('height', h)
//           .style('margin-top', 0)
//           .style('margin-left', 50)
//           .style('overflow', 'visible')
//         //   .style('background', '');
    
//         // setting the scaling
       
//         // For the last 10 submissions
//         // var xScale = d3.scaleLinear()
//         // // const xScale = d3.scaleTime()
//         //   .domain([0, 10])
//         // //   .domain(d3.extent(books.map((d) => d.inputTime[0])))
//         //   // .domain([0, books.length +1])
//         //   .range([0, w]);

//         // For the last 10 days
//         const endDate = new Date();
//         const startDate = new Date();
//         startDate.setDate(endDate.getDate() - 10);
        
//         // Set the format for the tick labels
//         const tickFormat = date => format(date, 'MM/dd');
        
//         // Define the xScale using the start and end dates
//         const xScale = d3.scaleTime()
//           .domain([startDate, endDate])
//           // .domain([0, 10])

//           .range([0, w]);

//         var yScale = d3.scaleLinear()
//         //   .domain([-1, 11])
//           .domain([0, 10])
//           // .domain(d3.extent(books.map((d) => d.inputNumber)))
//           .range([h, 0]);

//           // OLD using on numbers
//         const generateScaledLine = d3.line()
//           .x((d, i) => xScale(i))
//         //   .x((d) => xScale(d))
//           .y(yScale)
//           .curve(d3.curveCardinal);
          
//         // const generateScaledLine = d3.line()
//         //   .x(function(d) {return x(d.x) })
//         // //   .x((d) => xScale(d))
//         //   .y(function(d) { return y(d.y) })
//         //   .curve(d3.curveCardinal);
    
//         // setting the axes
//         const xAxis = d3.axisBottom(xScale)
//             .ticks(10)
//             .tickFormat(tickFormat);
//         const yAxis = d3.axisLeft(yScale)
//             .ticks(4)
            

//   // Append the CSS style to make axis white
//   // .axis-x1 because .axis-x is shared with the miniGraph on /apiComponents
//   svg.append('style').text(`
//     .axis-x1 line,
//     .axis-x1 path,
//     .axis-y line,
//     .axis-y path {
//       stroke: ${darkMode ? "white" : "black" };
//     }
//   `);


//         // displays axes
//         svg.append('g')
//         .attr('class', 'axis-x1')
//         .call(xAxis)
//         .attr('transform', `translate(0, ${h})`)
//         .selectAll("text")
//           .attr("fill", `${darkMode ? "white" : "black" }`)
//         .selectAll("path")
//           .style("stroke", "white");
          
//       svg.append('g')
//         .attr('class', 'axis-y')
//         .call(yAxis)
//         .selectAll("text")
//           .attr("fill", `${darkMode ? "white" : "black" }`)
//         .selectAll("path")
//           .attr("stroke", "white")

//                   // displays axes
//     //     svg.append('g')
//     //     .attr('class', 'axis-x')
//     //     .call(xAxis)
//     //     .attr('transform', `translate(0, ${h})`)
//     //     .select(".domain")
//     //     .attr("stroke", "white");
//     // svg.append('g')
//     //     .call(yAxis)
//     //     .select(".domain")
//     //     .attr("stroke", "white");

//         if (weekAvg) {           
    
//         // remove the previous line and area
//         svg.select(".line").remove();
//         svg.select(".area").remove();
    
//         // setting up the data for the svg
//         svg.append('path')
//   .datum(graphNumData)
//   .attr('class', 'line')
//   .attr('d', generateScaledLine)
//   .attr('fill', 'none')
//   // .attr("stroke-width", 3)
//   .attr("stroke-width", `${darkMode ? 3 : 2 }`)
//   .attr('stroke', `${darkMode ? "white" : "black" }`);
// //   .attr('d', d3.line()
// //             .xScale(function(d) { return xScale(d.xScale)})
// //             .yScale(function(d) { return yScale(d.yScale )})
// //             )

// // adding a flat line at y=4.33
// svg.append("line")
//   .attr("x1", 0)
//   .attr("y1", yScale(weekAvg))
//   .attr("x2", w)
//   .attr("y2", yScale(weekAvg))
//   .attr("stroke-width", 2)
//   .attr("stroke", "darkorchid");

// // adding weekAvg label
// svg.append("text")
//   .attr("x", w + 5)
//   .attr("y", yScale(weekAvg) - 5)
//   .attr("font-size", "12px")
//   .attr("fill", "black")
//   .style("fill", "darkorchid")
//   .text((weekRainbow.length > 0) ? `Weekly average: ${weekAvg}` : `New Week`);

// // adding the fill area
// const areaGenerator = d3.area()
//   .x((d, i) => xScale(i))
//   // .y0(yScale(weekAvg))
//   // supposed to lay the y axis line above the area gradient. To test
//   .y0(yScale(d3.min(graphNumData)))
//   .y1((d) => yScale(d))
//   .curve(d3.curveCardinal);

// const areaPath = svg.append("path")
//   .datum(graphNumData)
//   .attr("class", "area")
//   .attr("d", areaGenerator)
//   .attr("fill", "none");

// const areaGradient = svg.append("linearGradient")
//   .attr("id", "area-gradient")
//   .attr("gradientUnits", "userSpaceOnUse")
//   .attr("x1", 0).attr("y1", yScale(weekAvg))
//   .attr("x2", 0).attr("y2", yScale(d3.min(graphNumData)))
//   .selectAll("stop")
//   .data([
//     { offset: "0%", color: "green" },
//     // { offset: "0%", color: "purple" },
//     // { offset: "50%", color: "grey" },
//     { offset: "0%", color: "red" }
//   ])
//   .enter().append("stop")
//   .attr("offset", function(d) { return d.offset; })
//   .attr("stop-color", function(d) { return d.color; });

// // for hover over shit

// //   const bisect = d3.bisector(function(d) { return d.x; }).left

// //   const focus = svg
// //   .append('g')
// //   .append('circle')
// //     .style('fill', 'none')
// //     .attr('stroke', 'black')
// //     .attr('r', 8.5)
// //     .style('opacity', 0)

// //   const focusText = svg
// //     .append('g')
// //     .append('text')
// //         .style('opacity', 0)
// //         .attr('text-anchor', 'left')
// //         .attr('allignment-baseline', 'middle')

// //   svg
// //   .append('rect')
// //         // shows the hover area
// //         .style('fill', 'purple')
// //         .style('opacity', 0.2)
// //   .style('pointer-events', 'all')
// //   .attr('width', w)
// //   .attr('height', h)
// //   .on('mouseover', mouseover)
// //   .on('mousemove', mousemove)
// //   .on('mouseout', mouseout);

// //   function mouseover() {
// //     focus.style("opacity", 1)
// //     .style('stroke' , 'white')
// //     focusText.style("opacity",1)
// //     .style('stroke', 'purple')
// //   }

// //   // from pepeBot
// // //   function mousemove(event) {
// // //     const x0 = xScale.invert(d3.pointer(event)[0]);
// // //     const i = bisect(inputNumber, x0, 1);
// // //     const selectedData = inputNumber[i - 1];
// // //     focus
// // //       .attr('cx', xScale(i - 1))
// // //       .attr('cy', yScale(selectedData))
// // //     focusText
// // //       .html('Index: ' + (i - 1) + ' - ' + "Value: " + selectedData)
// // //       .attr('x', xScale(i - 1) + 15)
// // //       .attr('y', yScale(selectedData))
  
// // //     console.log('Index:', i - 1, 'Value:', selectedData);
// // //   }

  

// //   function mousemove(event) {
// //     const x0 = xScale.invert(d3.pointer(event)[0]);
// //     const i = bisect(inputNumberData, x0, 0);
// //     const selectedData = inputNumberData[i]
// //     focus
// //         .attr('cx', xScale(selectedData.x))
// //         .attr('cy', yScale(selectedData.y))
// //     focusText
// //         .html('x:' + x0 + ' - ' + "y:" + selectedData.y)
// //         // .attr('x', xScale(selectedData.x)+15)
// //         .attr('x', xScale(x0)+15)
// //         .attr('y', yScale(selectedData.y))

// //         console.log('i:', i, 'x0:', x0, 'inputNumber[i]:', inputNumberData[i], 'SelectedDatay:', selectedData.y);
// //     }

// //   function mouseout() {
// //     focus.style('opacity', 0)
// //     focusText.style('opacity', 0)
// //   }
  

  

// areaPath.attr("fill", "url(#area-gradient)");





//         } else {
//             svg.append('text')
//             .attr('class', 'loading')
//             .attr('x', w / 2)
//             .attr('y', h / 2)
//             .attr('text-anchor', 'middle')
//             .attr('fill', 'white')
//             .text('Loading...');
//           return; // exit the useEffect hook
//         }
//         // console.log(inputNumberData)
          
//     }, [books, weekRainbow, userNumsArr]);


//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//     const svgHomeRefTEST = useRef();
//     let dummyData = [
//         [1,1],
//         [2,1],
//     ]

//     useEffect(() => {
//       // localstorage or mongoDB for graph data
//       // const graphNumData = isAuthenticated ? userNumsArr : inputNumberData;
//       const graphNumData = userNumsArr;
//       // const graphNumData = isAuthenticated ? userObjArr : inputNumberData;

//         d3.select(svgHomeRefTEST.current).selectAll('*').remove();
//         // setting up svg
//         const w = 400;
//         const h = 200;
//         const svg = d3.select(svgHomeRefTEST.current)
//           .attr('width', w)
//           .attr('height', h)
//           .style('margin-top', 0)
//           .style('margin-left', 50)
//           .style('overflow', 'visible')

//         // For the last 10 submissions
//         // var xScale = d3.scaleLinear()
//         // // const xScale = d3.scaleTime()
//         //   .domain([0, 10])
//         // //   .domain(d3.extent(books.map((d) => d.inputTime[0])))
//         //   // .domain([0, books.length +1])
//         //   .range([0, w]);

//         // For the last 10 days
//         const endDateRaw = new Date();
//         const endDate = format(endDateRaw, 'MM/dd');
//         const startDateRaw = new Date(endDateRaw);
//         startDateRaw.setDate(endDateRaw.getDate() - 10);
//         const startDate = format(startDateRaw, 'MM/dd');
        
//         // Set the format for the tick labels
//         const tickFormat = date => format(date, 'MM/dd');
        
//         // Define the xScale using the start and end dates
//         // const xScale = d3.scaleLinear()
//         //   .domain([startDate, endDate])
//         //   // .domain([0, 10])
//       //   .range([0, w]);
//       // const xScale = d3.scaleTime()
//       const xScale = d3.scaleTime()
//         .domain([startDateRaw, endDateRaw])
//         .range([0, w]);

//         var yScale = d3.scaleLinear()
//         //   .domain([-1, 11])
//           .domain([0, 10])
//           // .domain(d3.extent(books.map((d) => d.inputNumber)))
//           .range([h, 0]);

//           let line = d3
//           .line()
//           .x((d) => xScale(d.x))
//           .y((d) => yScale(d.y));
        
//         let path = line(graphNumData);
//           // let path = line(graphNumData)
//           console.log("d.x " + graphNumData.map(item => item.x))
//           console.log('Xscale' + xScale(graphNumData.map(date => date.x)))
//           console.log("start date: " + startDate + " end date: " + endDate)
          
//           svg.append('path')
//     .datum(graphNumData)
//     .attr('class', 'line')
//     .attr('d', line)
//     .attr('fill', 'none')
//     .attr('stroke', 'steelblue')
//     .attr('stroke-width', 2);


//           // OLD using on numbers
//         const generateScaledLine = d3.line()
//           .x((d, i) => xScale(i))
//           .y(yScale)
//           .curve(d3.curveCardinal);
          
//         // setting the axes
//         const xAxis = d3.axisBottom(xScale)
//             .ticks(10)
//             .tickFormat(tickFormat);
//         const yAxis = d3.axisLeft(yScale)
//             .ticks(4)
            

//   // Append the CSS style to make axis white
//   // .axis-x1 because .axis-x is shared with the miniGraph on /apiComponents
//   svg.append('style').text(`
//     .axis-x1 line,
//     .axis-x1 path,
//     .axis-y line,
//     .axis-y path {
//       stroke: ${darkMode ? "white" : "black" };
//     }
//   `);


//         // displays axes
//         svg.append('g')
//         .attr('class', 'axis-x1')
//         .call(xAxis)
//         .attr('transform', `translate(0, ${h})`)
//         .selectAll("text")
//           .attr("fill", `${darkMode ? "white" : "black" }`)
//         .selectAll("path")
//           .style("stroke", "white");
          
//       svg.append('g')
//         .attr('class', 'axis-y')
//         .call(yAxis)
//         .selectAll("text")
//           .attr("fill", `${darkMode ? "white" : "black" }`)
//         .selectAll("path")
//           .attr("stroke", "white")
          
//     }, [userNumsArr]);

    // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
    // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
    // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
    // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
    // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
    // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
    // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
    // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST

//     const svgHomeRefTEST2 = useRef();

//     // const [data, setData] = useState([])

//     useEffect(() => {
      
// d3.select(svgHomeRefTEST2.current).selectAll('*').remove();

// if (!isAuthenticated) {

//             const parseDate = d3.timeParse("%m/%d")
//           const data = (books
//             // .slice(0,10)
//             .map(item => ({
//               x: parseDate(item.inputTime),
//               y: item.inputNumber
//             })))
// // console.log('DATA DATA !#@!#$!@$!@:::::: ', JSON.stringify(data))
//         // setting up svg
//         const width = 400;
//         const height = 200;
//         const svg = d3.select(svgHomeRefTEST2.current)
//           .attr('width', width)
//           .attr('height', height)
//           .style('margin-top', 0)
//           .style('margin-left', 50)
//           .style('overflow', 'visible')
          
//           // console.log("2nd useEffect Test: ", data)
//           // .style('background', 'black')

//         const margin = { top:20, right:20, bottom: 30, left: 50};

//         const g = svg.append("g")
//           // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//           const x = d3.scaleTime()
//             .range([0, width])
//             .domain(d3.extent(data, function(d) { return d.x}))


//           const y = d3.scaleLinear()
//             .range([height, 0])
//             // .domain(d3.extent(data, function(d) { return d.y}))
//             .domain([0,10])
//             // console.log(x.domain(), y.domain() + 'CONSOLE LOG !')

//           const line = d3.line()
//           .x(d => x(d.x))
//           .y(d => y(d.y))
//           // .curve(d3.curveCardinal);
            

//           svg.append('style').text(`
//           .axis-x2 line,
//           .axis-x2 path,
//           .axis-y2 line,
//           .axis-y2 path {
//             stroke: ${darkMode ? "white" : "black" };
//           }
//         `);

//             svg.append("g")
//               // .attr('transform', 'translate(0,' + height + ")")
//               // .call(d3.axisBottom(x))
//               // .append('text')
//               // .select('.domain')
//               // .attr('fill', '#000')
//               // .remove()
//               .attr('class', 'axis-x2')
//               .attr('transform', 'translate(0,' + height + ")")
//               .call(
//                 d3
//                   .axisBottom(x)
//                   .ticks(5)
//                 )
//               .selectAll("text")
//                 .attr("fill", `${darkMode ? "white" : "black"}`)
//               .selectAll("path")
//                 .style("stroke", "white")

//               svg.append("g")
//               .attr('class', 'axis-y2')
//               .call(
//                 d3
//                   .axisLeft(y)
//                   .ticks(5)
//                 )
//               .selectAll('text')
//                 .attr("fill", `${darkMode ? "white" : "black"}`)
//               .selectAll("path")
//                 .style('stroke', 'white')
//                 //for putting text
//               // .append('text')
//               // .attr('fill' , 'white')
//               // .attr('transform', 'rotate(-90)')
//               // .attr('y', 6)
//               // .attr('dy', '0.71em')
//               // .attr('text-anchor', 'end')
//               // .text('Your chart');

//               svg.append('g')  
//               .append('text')
//               .attr("fill", `${darkMode ? "white" : "black"}`)
//               // .attr('transform', 'rotate(-90)')
//               .attr('x', 390)
//               .attr('y', 190)
//               // .attr('text-decoration', 'underline')
//               .attr('dy', '0.71em')
//               .attr('font-size', '8px')
//               .attr('text-anchor', 'end')
//               .text('Mood Chart @ rainbowdarkness.com')

//   const tooltip = d3.select(svgHomeRefTEST2.current)
//   .append("text")
//   .attr("fill", `${darkMode ? "white" : "black"}`)

//             const circle = svg.append('circle')
//             .attr('r', 0)
//             .attr('fill', `${darkMode ? "white" : "black"}`)
//             .style('stroke', 'white')
//             .attr('opacity', 1)
//             .style('pointer-events', 'none')

//             const listeningRect = svg.append('rect')
//                 .attr('width', width)
//                 .attr('height', height)
//                 .attr('opacity', 0)
            
//                 listeningRect.on('mousemove', function(event) {
//                   const [xCoord] = d3.pointer(event, this);
//                   const bisectDate = d3.bisector(d => d.x).left;
                
//                   // Sort the data by x values
//                   const sortedData = data.slice().sort((a, b) => a.x - b.x);
                
//                   const x0 = x.invert(xCoord);
//                   const i = bisectDate(sortedData, x0, 1);
//                   const d0 = sortedData[i - 1];
//                   const d1 = sortedData[i];
//                   const d = x0 - d0.x > d1.x - x0 ? d1 : d0;
//                   const xPos = x(d.x);
//                   const yPos = y(d.y);
                
//                   circle.attr('cx', xPos)
//                     .attr('cy', yPos);
                
//                   // console.log(xPos)
//                   // console.log("test", d.x)

//                   circle.transition()
//                   .duration(50)
//                   .attr('r', 10);

//                   // d3.select(svgHomeRefTEST2.current) 
//                   tooltip
//                   // .append('text')
//                   .attr("fill", `${darkMode ? "white" : "black"}`)
//                   .style("opacity", 1)
//                   // .attr('transform', 'rotate(-90)')
//                   .attr('x', 240)
//                   // .attr('text-decoration', 'underline')
//                   .attr('dy', '0.71em')
//                   .attr('text-anchor', 'end')
//                   .text(`Mood:${d.y} Date:${format(d.x, 'MM/dd')}`)
//               });

//                 listeningRect.on("mouseleave", function () {
//                   circle.transition()
//                     .duration(50)
//                     .attr("r", 0);
              
//                   tooltip.style("opacity", 0);
//                 });

//             g.append('path')
//               .datum(data)
//               .attr('fill', 'none')
//               .attr('stroke', 'steelblue')
//               .attr('stroke-linejoin' , 'round')
//               .attr('stroke-linecap', 'round')
//               .attr('stroke-width' , 1.5)
//               .attr('d', line)

//             svg.selectAll("myCircles")
//               .data(data)
//               .enter()
//               .append('circle')
//                 .attr('fill', 'red')
//                 .attr('stroke', 'none')
//                 .attr('cx', function(d) { return x(d.x) })
//                 .attr('cy', function(d) { return y(d.y) })
//                 .attr('r', 3)
              
              
//               //if (isAuthenticated)
//               //if (isAuthenticated)
//               //if (isAuthenticated)
//               } else {
                
//         const parseDate = d3.timeParse("%m/%d")
//         const data =(userNumsArr
//           .slice(0,20)
//           .map(item => ({
//             x: parseDate(item.x),
//             y: item.y,
//           })))


//                 const width = 400;
//         const height = 200;
//         const svg = d3.select(svgHomeRefTEST2.current)
//           .attr('width', width)
//           .attr('height', height)
//           .style('margin-top', 0)
//           .style('margin-left', 50)
//           .style('overflow', 'visible')
          
//           // console.log("2nd useEffect Test: ", data)
//           // .style('background', 'black')

//         const margin = { top:20, right:20, bottom: 30, left: 50};

//         // const g = svg.append("g")
//           // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//           svg.append('style').text(`
//           .axis-x2 line,
//           .axis-x2 path,
//           .axis-y2 line,
//           .axis-y2 path {
//             stroke: ${darkMode? "white" : "black" };
//           }
//         `);

//           const x = d3.scaleTime()
//             .range([0, width])
//             .domain(d3.extent(data, function(d) { return d.x}))


//           const y = d3.scaleLinear()
//             .range([height, 0])
//             // .domain(d3.extent(data, function(d) { return d.y}))
//             .domain([0,10])
//             // console.log(x.domain(), y.domain() + 'CONSOLE LOG !')

//           const line = d3.line()
//           .x(d => x(d.x))
//           .y(d => y(d.y))
//           // .curve(d3.curveCardinal);
            



//             svg.append("g")
//               // .attr('transform', 'translate(0,' + height + ")")
//               // .call(d3.axisBottom(x))
//               // .append('text')
//               // .select('.domain')
//               // .attr('fill', '#000')
//               // .remove()
//               .attr('class', 'axis-x2')
//               .attr('transform', 'translate(0,' + height + ")")
//               .call(
//                 d3
//                   .axisBottom(x)
//                   .ticks(5)
//                 )
//               .selectAll("text")
//                 .attr("fill", `${darkMode ? "white" : "black"}`)
//               .selectAll("path")
//                 .style("stroke", "white")
              

//             svg.append("g")
//               .attr('class', 'axis-y2')
//               .call(
//                 d3
//                   .axisLeft(y)
//                   .ticks(5)
//                 )
//               .selectAll('text')
//                 .attr("fill", `${darkMode ? "white" : "black"}`)
//               .selectAll("path")
//                 .style('stroke', 'white')
//                 //for putting text
              
//             svg.append('g')  
//               .append('text')
//               .attr("fill", `${darkMode ? "white" : "black"}`)
//               // .attr('transform', 'rotate(-90)')
//               .attr('x', 390)
//               .attr('y', 190)
//               // .attr('text-decoration', 'underline')
//               .attr('dy', '0.71em')
//               .attr('font-size', '8px')
//               .attr('text-anchor', 'end')
//               .text('Mood Chart @ rainbowdarkness.com')

//   const tooltip = d3.select(svgHomeRefTEST2.current)
//   .append("text")
//   .attr("fill", `${darkMode ? "white" : "black"}`)

//             const circle = svg.append('circle')
//             .attr('r', 0)
//             .attr('fill', `${darkMode ? "white" : "black"}`)
//             .style('stroke', 'white')
//             .attr('opacity', 1)
//             .style('pointer-events', 'none')

//             const listeningRect = svg.append('rect')
//                 .attr('width', width)
//                 .attr('height', height)
//                 .attr('opacity', 0)
            
//                 listeningRect.on('mousemove', function(event) {
//                   const [xCoord] = d3.pointer(event, this);
//                   const bisectDate = d3.bisector(d => d.x).left;
                
//                   // Sort the data by x values
//                   const sortedData = data.slice().sort((a, b) => a.x - b.x);
                
//                   const x0 = x.invert(xCoord);
//                   const i = bisectDate(sortedData, x0, 1);
//                   const d0 = sortedData[i - 1];
//                   const d1 = sortedData[i];
//                   const d = x0 - d0.x > d1.x - x0 ? d1 : d0;
//                   const xPos = x(d.x);
//                   const yPos = y(d.y);
                
//                   circle.attr('cx', xPos)
//                     .attr('cy', yPos);
                
//                   // console.log(xPos)
//                   // console.log("test", d.x)

//                   circle.transition()
//                   .duration(50)
//                   .attr('r', 10);

//                   // d3.select(svgHomeRefTEST2.current) 
//                   tooltip
//                   // .append('text')
//                   .attr("fill", `${darkMode ? "white" : "black"}`)
//                   .style("opacity", 1)
//                   // .attr('transform', 'rotate(-90)')
//                   .attr('x', 240)
//                   // .attr('text-decoration', 'underline')
//                   .attr('dy', '0.71em')
//                   .attr('text-anchor', 'end')
//                   .text(`Mood:${d.y} Date:${format(d.x, 'MM/dd')}`)
//               });

//                 listeningRect.on("mouseleave", function () {
//                   circle.transition()
//                     .duration(50)
//                     .attr("r", 0);
              
//                   tooltip.style("opacity", 0);
//                 });



//               // plots the line connecting the datapoints
//             svg.append('path')
//               .datum(data)
//               .attr('fill', 'none')
//               .attr('stroke', 'steelblue')
//               .attr('stroke-linejoin' , 'round')
//               .attr('stroke-linecap', 'round')
//               .attr('stroke-width' , 1.5)
//               .attr('d', line)
              

//               // each datapoint has a red dot
//             svg.selectAll("myCircles")
//               .data(data)
//               .enter()
//               .append('circle')
//                 .attr('fill', 'red')
//                 .attr('stroke', 'none')
//                 .attr('cx', function(d) { return x(d.x) })
//                 .attr('cy', function(d) { return y(d.y) })
//                 .attr('r', 3)
//               }

//               // const svg = d3.select(svgHomeRefTEST2.current)

//     }, [userNumsArr, isAuthenticated, darkMode])

    //

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
          // .curve(d3.curveCardinal);
            



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
                  .attr('x', 240)
                  // .attr('text-decoration', 'underline')
                  .attr('dy', '0.71em')
                  .attr('text-anchor', 'end')
                  .text(`Mood:${d.y} Date:${format(d.x, 'MM/dd')}`)
              });

                listeningRect.on("mouseleave", function () {
                  circle.transition()
                    .duration(50)
                    .attr("r", 0);
              
                  tooltip.style("opacity", 0);
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
              
              console.log(userNumsArr)

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
            </div>
            </>
    )
}

export default HomeChart;