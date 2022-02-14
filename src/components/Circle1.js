import React, {useState, useRef, useEffect} from "react";
import * as d3 from "d3";
import {useD3} from "../hook/useD3";

const Circle1 = ({x, set}) => {
  const [render, setRender] = useState(0);

  const ref = useRef();

  useEffect(() => {
    if (render) {
      d3.select(ref.current)
        .transition()
        .duration(1000)
        .attr("cx", x)
        .on("end", () => {
          set(true);
        })
    }

    setRender(prevRender => prevRender + 1)
  }, [x]);

  return (
    <circle cx={15} cy={15} r="10" ref={ref} />
  );
}

export default Circle1;