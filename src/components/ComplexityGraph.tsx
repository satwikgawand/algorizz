import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface ComplexityGraphProps {
  complexityType: 'n2' | 'nlogn'
  currentN: number
  maxN?: number
}

export default function ComplexityGraph({
  complexityType,
  currentN,
  maxN = 50,
}: ComplexityGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const W = 200
    const H = 120
    const margin = { top: 10, right: 10, bottom: 25, left: 30 }
    const innerW = W - margin.left - margin.right
    const innerH = H - margin.top - margin.bottom

    const g = svg
      .attr('width', W)
      .attr('height', H)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Data
    const ns = d3.range(1, maxN + 1)

    const yFn = (n: number) =>
      complexityType === 'n2' ? n * n : n * Math.log2(Math.max(n, 1))

    const maxY = yFn(maxN)

    const xScale = d3.scaleLinear().domain([1, maxN]).range([0, innerW])
    const yScale = d3.scaleLinear().domain([0, maxY]).range([innerH, 0])

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(4)
          .tickFormat((d) => `${d}`)
      )
      .call((axis) => {
        axis.select('.domain').attr('stroke', '#333')
        axis.selectAll('.tick line').attr('stroke', '#333')
        axis.selectAll('.tick text')
          .attr('fill', 'rgba(255,255,255,0.3)')
          .style('font-family', 'JetBrains Mono, monospace')
          .style('font-size', '9px')
      })

    // Y axis
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(3))
      .call((axis) => {
        axis.select('.domain').attr('stroke', '#333')
        axis.selectAll('.tick line').attr('stroke', '#333')
        axis.selectAll('.tick text')
          .attr('fill', 'rgba(255,255,255,0.3)')
          .style('font-family', 'JetBrains Mono, monospace')
          .style('font-size', '9px')
      })

    // Grid lines
    g.selectAll('.grid-line-y')
      .data(yScale.ticks(3))
      .enter()
      .append('line')
      .attr('class', 'grid-line-y')
      .attr('x1', 0)
      .attr('x2', innerW)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255,255,255,0.04)')
      .attr('stroke-dasharray', '3,3')

    // Curve
    const lineGen = d3
      .line<number>()
      .x((n) => xScale(n))
      .y((n) => yScale(yFn(n)))
      .curve(d3.curveCatmullRom)

    const curveColor = complexityType === 'n2' ? '#f87171' : '#fbbf24'

    // Gradient fill under curve
    const gradId = `grad-${complexityType}`
    const defs = svg.append('defs')
    const grad = defs
      .append('linearGradient')
      .attr('id', gradId)
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%')
    grad.append('stop').attr('offset', '0%').attr('stop-color', curveColor).attr('stop-opacity', 0.15)
    grad.append('stop').attr('offset', '100%').attr('stop-color', curveColor).attr('stop-opacity', 0)

    const areaGen = d3
      .area<number>()
      .x((n) => xScale(n))
      .y0(innerH)
      .y1((n) => yScale(yFn(n)))
      .curve(d3.curveCatmullRom)

    g.append('path')
      .datum(ns)
      .attr('fill', `url(#${gradId})`)
      .attr('d', areaGen)

    g.append('path')
      .datum(ns)
      .attr('fill', 'none')
      .attr('stroke', curveColor)
      .attr('stroke-width', 1.5)
      .attr('d', lineGen)

    // Current N dot
    const clampedN = Math.min(Math.max(currentN, 1), maxN)
    const dotX = xScale(clampedN)
    const dotY = yScale(yFn(clampedN))

    // Vertical line from dot to x axis
    g.append('line')
      .attr('x1', dotX)
      .attr('x2', dotX)
      .attr('y1', dotY)
      .attr('y2', innerH)
      .attr('stroke', curveColor)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2')
      .attr('opacity', 0.4)

    // Dot glow
    g.append('circle')
      .attr('cx', dotX)
      .attr('cy', dotY)
      .attr('r', 5)
      .attr('fill', curveColor)
      .attr('opacity', 0.2)

    g.append('circle')
      .attr('cx', dotX)
      .attr('cy', dotY)
      .attr('r', 3)
      .attr('fill', curveColor)
      .attr('stroke', '#0d0d0d')
      .attr('stroke-width', 1)

    // Label
    const label = complexityType === 'n2' ? 'O(n²)' : 'O(n log n)'
    g.append('text')
      .attr('x', innerW - 2)
      .attr('y', 10)
      .attr('text-anchor', 'end')
      .attr('fill', curveColor)
      .style('font-family', 'JetBrains Mono, monospace')
      .style('font-size', '9px')
      .text(label)
  }, [complexityType, currentN, maxN])

  return (
    <div className="panel overflow-hidden">
      <div className="panel-header">
        <span className="text-accent/60">∿</span>
        <span>growth curve</span>
      </div>
      <div className="p-3 flex justify-center">
        <svg ref={svgRef} />
      </div>
    </div>
  )
}
