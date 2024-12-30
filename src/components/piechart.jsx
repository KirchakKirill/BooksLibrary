import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GenrePieChart = ({histData}) => {
  const svgRef = useRef(null);

  


  useEffect(() => {
    
    const dataset = Object.entries(histData).map(([genre, count]) => ({ genre, count }));

  
    const margin = { top: 40, right: 180, bottom: 40, left: 40 }; 
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 3; 


    const color = d3.scaleOrdinal(d3.schemeCategory10);

   
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`); 


    const pie = d3.pie()
      .value(d => d.count)
      .sort(null); 

  
    const arc = d3.arc()
      .innerRadius(0) 
      .outerRadius(radius);

   
    const arcHover = d3.arc()
      .innerRadius(0)
      .outerRadius(radius + 10); 

    
    const arcs = pie(dataset);

   
    svg.selectAll(".arc")
      .data(arcs)
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    
    svg.selectAll(".arc")
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(200).attr("d", arcHover); 
      })
      .on("mouseout", function(event, d) {
        d3.select(this).transition().duration(200).attr("d", arc); 
      });

    const legendWidth = 150; 
    const legend = d3.select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${width - margin.left - 20}, ${margin.top})`);

    legend.selectAll(".legend")
      .data(dataset)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${i * 30})`); 

    legend.selectAll(".legend")
      .append("rect")
      .attr("x", 0)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => color(i));

    legend.selectAll(".legend")
      .append("text")
      .attr("x", 25)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("font-size", "14px")
      .style("font-family", "Arial, sans-serif") 
      .text(d => d.genre);

    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, [histData]); 

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GenrePieChart;
