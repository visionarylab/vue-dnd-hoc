<template>
  <div class="layout-center">
    <div :id="'gauge' + id"/>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Gauge',
  props: ['options', 'endpoint', 'id'],
  data () {
    return {
      margin: 40,
      width: 450,
      height: 450,
      gaugeSvg: null,
      radius: 0,
      majorTicks: 6,
      arcColorFn: 0,
      arc: null,
      ringWidth: 20,
      ringInset: 20,
      minAngle: -90,
      maxAngle: 90,
      range: 0,
      ticks: 0,
      scale: 0,
      maxValue: 100,
      minValue: 0,
      currentValue: 45,
      pointerWidth: 5,
      pointerHeadLength: 0,
      pointerTailLength: 10,
      pointerHeadLengthPercent: 0.7,
      pointer: 0,
      pointerAngle: -90// -90 to 90
    }
  },
  mounted () {
    // append the svg object to the div called 'my_dataviz'
    this.gaugeSvg = d3.select('#gauge' + this.id)
      .append('svg:svg')
      .attr('class', 'gauge')
      .attr('width', 150)
      .attr('height', 65);

    this.fetchData();
  },
  methods: {
    deg2rad (deg) {
      return deg * Math.PI / 180;
    },
    fetchData () {
      const here = this;
      this.arcColorFn = d3.interpolateHsl(d3.rgb('#c8cce3'), d3.rgb('#0000ff'), d3.rgb('#0000ff'));
      this.labelFormat = d3.format(',g');
      this.radius = Math.min(this.width, this.height) / 4 - this.margin * 1;
      this.range = this.maxAngle - this.minAngle;
      this.pointerHeadLength = Math.round(this.radius * this.pointerHeadLengthPercent);
      this.arc = d3.arc()
        .innerRadius(here.radius - here.ringWidth - here.ringInset)
        .outerRadius(here.radius - here.ringInset)
        .startAngle(function (d, i) {
          var ratio = d * i;
          return here.deg2rad(here.minAngle + (ratio * here.range));
        })
        .endAngle(function (d, i) {
          var ratio = d * (i + 1);
          return here.deg2rad(here.minAngle + (ratio * here.range));
        });
      var centerTx = 'translate(' + this.radius + ',' + this.radius * 0.8 + ')';
      // a linear scale that maps domain values to a percent from 0..1
      this.scale = d3.scaleLinear()
        .range([0, 1])
        .domain([this.minValue, this.maxValue]);
      this.ticks = this.scale.ticks(this.majorTicks);

      var arcs = this.gaugeSvg.append('g')
        .attr('class', 'arc')
        .attr('transform', centerTx);

      var tickData = d3.range(this.majorTicks).map(function () {
        return 1 / here.majorTicks;
      });
      arcs.selectAll('path')
        .data(tickData)
        .enter().append('path')
        .attr('fill', function (d, i) {
          return here.arcColorFn(d * i);
        })
        .attr('d', this.arc);

      var lineData = [ [this.pointerWidth / 2, 0],
        [0, -this.pointerHeadLength],
        [-(this.pointerWidth / 2), 0],
        [0, this.pointerTailLength],
        [this.pointerWidth / 2, 0] ];
      var pointerLine = d3.line(); // .curve(d3.interpolateHsl);
      var pg = this.gaugeSvg.append('g').data([lineData])
        .attr('class', 'pointer')
        .attr('transform', centerTx);
      if (this.maxValue === '0') {
        this.pointerAngle = 90;
      } else {
        this.pointerAngle = (parseInt(this.currentValue) / parseInt(this.maxValue) * 180) - 90;
      }
      this.pointer = pg.append('path')
        .attr('d', pointerLine/* function(d) { return pointerLine(d) +'Z';} */)
        .attr('transform', 'rotate(' + this.pointerAngle + ')');
    }
  }
}
</script>
