import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Logo = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 85;
    const height = 85;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('background-color', 'white');

    svg.append('rect')
      .attr('x', 16)
      .attr('y', 10.67)
      .attr('width', 53.33)
      .attr('height', 64)
      .attr('rx', 5.33)
      .attr('ry', 5.33)
      .attr('fill', '#34495e');

    svg.append('line')
      .attr('x1', 16)
      .attr('y1', 33.33)
      .attr('x2', 69.33)
      .attr('y2', 33.33)
      .attr('stroke', '#e67e22')
      .attr('stroke-width', 2);

    svg.append('line')
      .attr('x1', 16)
      .attr('y1', 53.33)
      .attr('x2', 69.33)
      .attr('y2', 53.33)
      .attr('stroke', '#e67e22')
      .attr('stroke-width', 2);

    svg.append('circle')
      .attr('cx', 66.67)
      .attr('cy', 66.67)
      .attr('r', 6)
      .attr('stroke', '#e74c3c')  
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    svg.append('line')
      .attr('x1', 70)
      .attr('y1', 70)
      .attr('x2', 76.67)
      .attr('y2', 76.67)
      .attr('stroke', '#e74c3c')  
      .attr('stroke-width', 2);

    svg.append('path')
      .attr('d', 'M 16 13.33 Q 21.33 16, 16 21.33')
      .attr('fill', '#e67e22');
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Logo;
