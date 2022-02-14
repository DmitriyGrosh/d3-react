import React from "react";
import * as d3 from "d3";
import {useD3} from "../hook/useD3";

const margin = {
  top: 20,
  bottom: 20,
  left: 30,
  right: 30,
};

const width = 600;
const height = 600;

const Matrix = ({ data }) => {
  const func = (svg) => {
    const xScale = d3
      .scaleLinear()
      .range([0, width - margin.left - margin.right])
      .domain(d3.extent(data, (d) => d.id));

    const yScale = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    const myColor = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([1,100])

    const Tooltip = d3.select("#template")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    const mouseover = () => {
      Tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }

    var mousemove = (d) => {
      Tooltip
        .html("The exact value of<br>this cell is: " + d.value)
        // .style("left", (d3.mouse(this)[0]+70) + "px")
        // .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = (d) => {
      Tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    svg
      .select('.x-scale')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))

    svg
      .select('.y-scale')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale))

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, -${margin.top})`)
      .selectAll()
      .data(data, (d) => d.group+':'+d.variable)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.id))
      .attr("y", (d) => yScale(d.value))
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", 40)
      .attr("height", 40)
      .style("fill", (d) => myColor(d.value))
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  };

  const ref = useD3(func);

  return (
    <div id="template">
      <svg ref={ref}>
        <g className="x-scale" />
        <g className="y-scale" />
        <g className="plot-data" />
      </svg>
    </div>
  );
};

export default Matrix;