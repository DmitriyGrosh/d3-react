import React from "react";
import * as d3 from "d3";

import { useD3 } from "../hook/useD3";

const Chart2 = ({ data }) => {
  const margin = {
    top: 20,
    bottom: 20,
    left: 40,
    right: 40,
  };

  const width = 800 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  const func = (svg) => {
    const t = d3.transition()
      .duration(750)
      .ease(d3.easeLinear)

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.id))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.2);

    const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .rangeRound([height - margin.bottom, margin.top]);

    const graph = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .select(".plot-area")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.axisBottom(x);
    const yScale = d3.axisLeft(y1);

    svg
      .select(".x-axis")
      .attr("transform", `translate(${margin.left}, ${height})`)
      .call(xScale)

    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.right + margin.left}, ${margin.top})`)
      .call(yScale)

    graph
      .selectAll(".dar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "dar")
      .attr("x", (d) => x(d.id))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y1(d.value))
      .attr("height", (d) => y1(0) - y1(d.value))

    // const bars = graph
    //   .selectAll(".dar")
    //   .data(data)
    //
    // const addBars = bars
    //   .enter()
    //   .append("rect")
    //   .attr("class, dar")
    //   .attr("height", 100)
    //
    // addBars.merge(bars)
    //   .transition()
    //   .duration(1000)
    //   .attr("x", (d) => x(d.id))
    //   .attr("width", x.bandwidth())
    //   .attr("y", (d) => y1(d.value))
    //   .attr("height", (d) => y1(0) - y1(d.value))


  }
  const ref = useD3(func, data);

  return (
    <svg
      ref={ref}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default Chart2;