import * as d3 from "d3";
import React from "react";
import { staticFile } from "remotion";

export const PCP: React.FC = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const ref = React.useRef(null);
    const [h, setHeight] = React.useState(600);
    const [w, setWidth] = React.useState(0);

    React.useEffect(() => {
        d3.csv(staticFile("data.csv")).then((data) => {
            console.log(data);

            setData(data);
            setLoading(false);

            let keys = data.columns.slice(1)
            let width = keys.length * 250
            let height = h
            setWidth(width)
            let margin = ({ top: 40, right: 20, bottom: 20, left: 40 })
            console.log(width, height);

            let y = new Map(Array.from(keys, key => [key, d3.scaleLinear(d3.extent(data, d => +d[key]), [margin.top, height - margin.bottom])]))

            let x = d3.scalePoint(keys, [margin.left, width - margin.right])

            let line = d3.line()
                .defined(([, value]) => value != null)
                .y(([key, value]) => y.get(key)(value))
                .x(([key]) => x(key))


            const svg = d3.select(ref.current)

            svg.selectAll("*").remove();

            svg.append("g")
                .attr("fill", "none")
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", 0.4)
                .selectAll("path")
                .data(data.slice())
                .join("path")
                .attr("stroke", "black")
                .attr("d", d => line(d3.cross(keys, [d], (key, d) => [key, d[key]])))
                .append("title")
                .text(d => d.name);

            svg.append("g")
                .selectAll("g")
                .data(keys)
                .join("g")
                .attr("transform", d => `translate(${x(d)},0)`)
                .each(function (d) { d3.select(this).call(d3.axisLeft(y.get(d))); })
                .call(g => g.append("text")
                .attr("x", -6)
                    .attr("y", margin.top -10)
                    .attr("text-anchor", "start")
                    .attr("fill", "currentColor")
                    .text(d => d))
                .call(g => g.selectAll("text")
                    .clone(true).lower()
                    .attr("fill", "none")
                    .attr("stroke-width", 5)
                    .attr("stroke-linejoin", "round")
                    .attr("stroke", "white"));
        });
        return () => undefined;
    }, []);
    return (
        <svg ref={ref} viewBox={`0 0 ${w} ${h}`}></svg>
    );
};