import React from "react";
import {useD3} from "../hook/useD3";
import * as d3 from "d3";

const Line = ({data}) => {
  const width = 500;
  const height = 500;
  const margin = {
    top: 20,
    bottom: 20,
    left: 40,
    right: 40,
  };

  const func = (svg) => {
    const xScale = d3
      .scaleLinear()
      .range([0, width - margin.left - margin.right])
      .domain(d3.extent(data, (d) => d.id));

    const yScale = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    const valueLine = d3
      .line()
      .x((d) => xScale(d.id))
      .y((d) => yScale(d.value))

    svg
      .select(".plot-area")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine)

    svg
      .attr("width", width)
      .attr("height", height);

    svg
      .select(".x-scale")
      .attr("transform", `translate(${margin.left}, ${height - margin.top})`)
      .call(d3.axisBottom(xScale))

    svg
      .select(".y-scale")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale))
  };

  const ref = useD3(func);

  return (
    <svg ref={ref}>
      <g className="plot-area" />
      <g className="x-scale" />
      <g className="y-scale" />
    </svg>
  );

};

export default Line;