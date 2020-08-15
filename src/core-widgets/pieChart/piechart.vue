<template>
  <div class="layout-center">
    <div id="pie-chart">
      <div :id="'pie-chart-svg-' + id"/>
      <svg :id="'pie-chart-legend-' + id"/>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'PieChart',
  props: ['options', 'endpoint', 'id'],
  data () {
    return {
      margin: 40,
      width: 250,
      height: 250,
      loadData: { a: 9, b: 20, c: 30, d: 8 },
      pieChartSvg: null,
      radius: 0
    }
  },
  watch: {
    endpoint: function () {
      this.fetchData()
    }
  },
  mounted () {
    this.radius = Math.min(this.width, this.height) / 2 - this.margin
    // append the svg object to the div called 'my_dataviz'
    this.pieChartSvg = d3.select('#pie-chart-svg-' + this.id)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
    this.fetchData()
  },
  methods: {
    fetchData () {
      var color = d3.scaleOrdinal()
        .domain(this.loadData)
        .range(['#777', '#cccccc', '#0000ff', '#333'])

      // Compute the position of each group on the pie:
      var pie = d3.pie()
        .value(function (d) { return d.value; })
      var dataReady = pie(d3.entries(this.loadData))

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      this.pieChartSvg
        .selectAll('whatever')
        .data(dataReady)
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(this.radius)
        )
        .attr('fill', function (d) { return (color(d.data.key)) })
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)

      // add legend
      // select the svg area
      var svg = d3.select('#pie-chart-legend-' + this.id)

      // Handmade legend
      svg.append('circle').attr('cx', 20).attr('cy', 20).attr('r', 6).style('fill', '#777')
      svg.append('circle').attr('cx', 140).attr('cy', 20).attr('r', 6).style('fill', '#cccccc')
      svg.append('circle').attr('cx', 20).attr('cy', 50).attr('r', 6).style('fill', '#333')
      svg.append('circle').attr('cx', 140).attr('cy', 50).attr('r', 6).style('fill', '#0000ff')
      svg.append('text').attr('x', 40).attr('y', 20).text('Accessories').style('font-size', '15px').attr('alignment-baseline', 'middle')
      svg.append('text').attr('x', 160).attr('y', 20).text('Equipment').style('font-size', '15px').attr('alignment-baseline', 'middle')
      svg.append('text').attr('x', 40).attr('y', 50).text('Others').style('font-size', '15px').attr('alignment-baseline', 'middle')
      // svg.append("text").attr("x", 200).attr("y", 20).text("Loans").style("font-size", "15px").attr("alignment-baseline","middle")
      svg.append('text').attr('x', 160).attr('y', 50).text('Professional Services').style('font-size', '15px').attr('alignment-baseline', 'middle')
    }
  }
}
</script>

<style>
#pie-chart {
  display: grid;
  place-items: center;
}
[id^=pie-chart-legend] {
  width: 350px;
  max-height: 80px;
}
</style>
