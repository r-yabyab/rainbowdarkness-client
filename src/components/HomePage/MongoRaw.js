// // chart that mimicks the MongoDB chart, but faster and more customizable

// import React, { useState, useEffect, useRef } from "react";
// import format from "date-fns/format";
// import * as d3 from 'd3'

// const URL = 'https://stockshapes.net/rainbowdarkness'

// export function MongoRaw ( ) {

//     const [recentNumArr, setRecentNumArr] = useState([])


//     useEffect(() => {
//         const fetchRecent = async () => {
//             const response = await fetch(`${URL}/api/rainbows/last`)
//             const json = await response.json()

//             if (response.ok) {
//             const dateSimplify = json.map((item) => ({
//                 x: format(new Date(item.createdAt), 'dd'),
//                 y: item.number,
//               }));
        
//               const groupedData = dateSimplify.reduce((acc, item) => {
//                 const existingGroup = acc.find((group) => group.x === item.x);
        
//                 if (existingGroup) {
//                   existingGroup.numbers.push(item.y);
//                 } else {
//                   acc.push({
//                     x: item.x,
//                     numbers: [item.y],
//                   });
//                 }
        
//                 return acc;
//               }, []);
        
//               const averageData = groupedData.map((group) => ({
//                 x: group.x,
//                 y: group.numbers.reduce((sum, number) => sum + number, 0) / group.numbers.length,
//                 count: group.numbers.length,
//               }));
        
//               const sortedData = averageData.sort((a,b) => a.x - b.x)
//               setRecentNumArr(sortedData)
//             }
        
//         }
//         fetchRecent()
//     }, [])

//     const publicChartRef = useRef()

//     useEffect(() => {
//         let data = recentNumArr
//         d3.select(publicChartRef.current).selectAll('*').remove()

//         // set dimensions
//         const width = 600
//         const height = 400
//         const svg = d3.select(publicChartRef.current)
//             .attr('fill', 'black')
//             .attr('width', width)
//             .attr('height', height)
//             .style('overflow', 'visible')

//         // define x y axis
//         const x = d3.scaleLinear()
//             .range([0, width])
//             .domain(d3.extent(data, function(d) { return d.x}))

//         const y = d3.scaleLinear()
//             .range([height, 0])
//             .domain([0,10])

//         // display x y axis
//         svg.append('g')
//             .attr('fill', 'black')
//             .call(d3.axisBottom(x).ticks(31))
//             .attr('transform', `translate(0, ${height})` )


//         // display x y grid
     
//         // display data

//         // legend

//     }, [recentNumArr])



//     return (
//         <>
//         <div 
//         className="max-md:w-[340px] pb-16 pt-1 max-md:overflow-x-scroll"
//         >
//             <svg ref={publicChartRef} />
//             </div>
//         </>
//     )
// }