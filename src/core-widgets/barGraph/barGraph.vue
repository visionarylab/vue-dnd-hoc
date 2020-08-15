<template>
  <div class="layout-center">
    <div id="bar-plot">
      <div :id="'bar-plot-svg-' + id"/>
      <svg :id="'bar-plot-legend-' + id"/>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
const BAR_GRAPH_DATA = require('./barGraphData.json');
export default {
  name: 'BarPlot',
  props: ['options', 'endpoint', 'id'],
  data () {
    return {
      margin: { top: 10, right: 30, bottom: 20, left: 50 },
      width: 550,
      height: 180,
      loadData: [],
      barPlotSvg: null,
      data: BAR_GRAPH_DATA
    }
  },
  mounted () {
    // this.width = document.getElementById('bar-plot').offsetWidth - this.margin.left - this.margin.right

    // this.height = 450 - this.margin.top - this.margin.bottom
    // append the svg object to the body of the page
    this.barPlotSvg = d3.select('#bar-plot-svg-' + this.id)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
    this.showData()
  },
  methods: {
    showData (data = this.data) {
      const self = this
      // List of subgroups = header of the csv files = soil condition here
      var subgroups = Object.keys(data[0]).slice(1)

      // List of groups = species here = value of the first column called group -> I show them on the X axis
      var groups = d3.map(data, function (d) { return (d.group) }).keys()

      // self.barPlotSvg = document.getElementById('bar-plot-svg')
      // Add X axis
      var x = d3.scaleBand()
        .domain(groups)
        .range([0, this.width])
        .padding([0.2])

      this.barPlotSvg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x).tickSize(5));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 300000])
        .range([ this.height, 0 ]);
      this.barPlotSvg.append('g')
        .call(d3.axisLeft(y));

      // Another scale for subgroup position?
      var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

      // color palette = one color per subgroup
      var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#0000ff', '#cccccc', '#4daf4a'])

      // Show the bars
      this.barPlotSvg.append('g')
        .selectAll('g')
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function (d) { return 'translate(' + x(d.group) + ',0)'; })
        .selectAll('rect')
        .data(function (d) { return subgroups.map(function (key) { return {key: key, value: d[key]}; }); })
        .enter().append('rect')
        .attr('x', function (d) { return xSubgroup(d.key); })
        .attr('y', function (d) { return y(d.value); })
        .attr('width', xSubgroup.bandwidth())
        .attr('height', function (d) { return self.height - y(d.value); })
        .attr('fill', function (d) { return color(d.key); });

      // add legend
      // select the svg area
      var svg = d3.select('#bar-plot-legend-' + this.id)

      // Handmade legend
      svg.append('circle').attr('cx', 20).attr('cy', 20).attr('r', 6).style('fill', '#0000ff')
      svg.append('circle').attr('cx', 140).attr('cy', 20).attr('r', 6).style('fill', '#cccccc')
      svg.append('text').attr('x', 40).attr('y', 20).text('Revenue').style('font-size', '15px').attr('alignment-baseline', 'middle')
      svg.append('text').attr('x', 160).attr('y', 20).text('Target').style('font-size', '15px').attr('alignment-baseline', 'middle')
    }
  }
}
</script>

<style>
#bar-plot {
  display: grid;
  place-items: center;
}
[id^=bar-plot-legend] {
  max-height: 40px;
}
</style>
