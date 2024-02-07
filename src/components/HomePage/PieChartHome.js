import React, { useEffect, useState, useRef } from "react";
import * as d3 from 'd3'
import format from "date-fns/format";
// import { bindActionCreators } from "redux";
// import { actionCreators } from "../../state";
import { useSelector, useDispatch } from "react-redux";
// import { fetchLastAll } from "../../state/reducers/thunk-reducers/fetchLastReducer";

function PieChartHome () {

    const rainbowLastAll = useSelector((state) => state.rainbowLastAll)
    const [lastRainbow, setLastRainbow] = useState([])
    useEffect(() => {
        setLastRainbow(rainbowLastAll.rainbow)
    },[rainbowLastAll])

    const [numberCounts, setNumberCounts] = useState(Array.from({ length: 11 }, () => 0));
    const [tooltipSVG, setTooltipSVG] = [];

    useEffect(() => {
      // Update counts when lastRainbow changes
      const counts = Array.from({ length: 11 }, () => 0);
  
      lastRainbow.forEach(entry => {
        const roundedNumber = Math.round(entry.number);
        counts[roundedNumber]++;
      });
  
      setNumberCounts(counts);
    }, [lastRainbow]);

    //d3
    useEffect((
        {
//             name = ([x]) => x,  // given d in data, returns the (ordinal) label
//   value = ([, y]) => y, // given d in data, returns the (quantitative) value
  title, // given d in data, returns the title text
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  innerRadius = 100, // inner radius of pie, in pixels (non-zero for donut)
  outerRadius = Math.min(width, height) / 2, // outer radius of pie, in pixels
//   labelRadius = (innerRadius * 0.2 + outerRadius * 0.8), // center radius of labels
  labelRadius = (innerRadius * 0.2 + outerRadius * 0.65), // center radius of labels
  format = ",", // a format specifier for values (in the label)
  names, // array of names (the domain of the color scale)
  colors, // array of colors for names
//   stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
  stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
  strokeWidth = 10, // width of stroke separating wedges
  strokeLinejoin = "round", // line join of stroke separating wedges
  padAngle = stroke === "none" ? 1 / outerRadius : 0, // angular separation between wedges, in radians
        } = {}
    ) => {
        let data = numberCounts.map((count, index) => ({
            number: index,
            value: count
          }));

        const N = d3.map(data, d => d.number);
        const V = d3.map(data, d => d.value);
        const I = d3.range(N.length).filter(i => !isNaN(V[i]));
      
        // Unique the names.
        // if (names === undefined) names = N;
        // names = new d3.InternSet(names);
      
        // // Choose a default color scheme based on cardinality.
        // if (colors === undefined) colors = d3.schemeSpectral[names.size];
        // if (colors === undefined) colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
      
        // Construct scales. use .interpolate or .interpolateHcl
        // const color = d3.scaleOrdinal(names, colors);
        const color = d3.scaleSequential(t => d3.interpolateHcl(d3.rgb('#6a51a3'), d3.rgb('#fff582'))(t))
        .domain([0, 10]);

        // const color = d3.scaleSequential(t => d3.interpolateHcl(d3.rgb('#6a51a3'), d3.rgb('#ffb07c'))(t))
        // .domain([0, 10]);

        // const color = d3.scaleSequential()
        // .interpolator(d3.interpolateHcl('#6a51a3', '#fc0303', '#ffcc00')) // Adjusted to include yellow
        // .domain([0, 5, 10]);

        // Compute titles.
        if (title === undefined) {
          const formatValue = d3.format(format);
          title = i => `${N[i]}\n${formatValue(V[i])}`;
        } else {
          const O = d3.map(data, d => d);
          const T = title;
          title = i => T(O[i], i, data);
        }
      
        // Construct arcs.
        // const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
        const arcs = d3.pie().sort(null).value(i => V[i])(I);
        const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
        
        
        // const svg = d3.create("svg")
        const svg = d3.select(PieCharHomeRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      
            svg.append("g")
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth)
            .attr("stroke-linejoin", strokeLinejoin)
          .selectAll("path")
          .data(arcs)
          .join("g")
            .attr("class", "wedge-group")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .append("path")
              .attr("fill", d => color(N[d.data]))
              .attr("d", arc)
          .append("title")
            .text(d => title(d.data));
      
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 16)
            .attr("text-anchor", "middle")
          .selectAll("text")
          .data(arcs)
          .join("text")
            .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
          .selectAll("tspan")
          .data(d => {
            // const lines = `${title(d.data)}`.split(/\n/);  // chart keyvalue text
            const lines = `${N[d.data]}`;  // Only show the number
            return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
          })
          .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => i ? null : "600")
            .text(d => d);


        // tooltips
        
        const tooltip = d3.select(PieCharHomeRef.current)
        .append("text")
        .attr("fill", `white`)

            function handleMouseOver(event, d) {
                d3.select(this)
                  .select("path")  // Select the path within the group
                  .attr("stroke", color(N[d.data]))
                  .attr("stroke-width", 3); // You can adjust the width of the border as needed

                  tooltip
                  .attr('fill', 'black')
                  .style('opacity', 1)
                  .attr('dy', '0.71em')
                  .attr('x', 0)
                  .attr('y', -10)
                  .attr('text-anchor', 'middle')
                //   .text(`Mood: ${N[d.data]}\n Entries: ${V[d.data]}`);
                  .text(`${V[d.data]} entries`);
            
                setTooltipSVG({
                  number: d.number,
                });
              }
              
              function handleMouseOut(event, d) {
                d3.select(this)
                  .select("path")  // Select the path within the group
                  .attr("stroke", stroke)
                  .attr("stroke-width", strokeWidth);

                  tooltip.style('opacity', 0);
              }
        
    }, [numberCounts])

    const PieCharHomeRef = useRef()


    return (
        <>
            {/* <div className="bg-blue-300 p-10">HOME TEST</div>
            <div className="bg-blue-300 p-10">HOME TEST</div> */}
            {/* <div className="flex">
                {lastRainbow && lastRainbow.map((x) => (
                    <div>{Math.round(x.number)}</div>
                ))}
            </div>
            <div>
                {numberCounts.map((count, index) => (
                    <div key={index}>{`Number ${index}: ${count}`}</div>
                ))}
            </div> */}
            {/* <div>{numberCounts[1]}</div> */}
            <div>
                <svg ref={PieCharHomeRef} />
            </div>

        </>
    )
}

export default PieChartHome;