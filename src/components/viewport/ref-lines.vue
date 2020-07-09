<template>
  <div
    v-show="moving"
    class="guides">
    <div
      v-for="val in horiz"
      v-show="attachHoriz(val.val)"
      :key="val.id"
      :style="{top: val.val + 'px'}"
      class="horiz"/>

    <div
      v-for="val in verti"
      v-show="attachVerti(val.val)"
      :key="val.id"
      :style="{left: val.val + 'px'}"
      class="verti"/>
  </div>
</template>

<script>
import vpd from '../../mixins/vpd'

export default {
  name: 'RefLines',
  mixins: [vpd],
  computed: {
    moving () {
      return this.$store.state.vdh.moving
    },
    guides () {
      var state = this.$store.state.vdh
      var guides = []
      var uuid = state.uuid

      state.widgets.forEach(item => {
        if (item.hasGuide && item.uuid === uuid) return
        if (item.hasGuide && item.belong !== 'page') return

        guides.push({
          uuid: item.uuid,
          width: item.width,
          height: item.height,
          top: item.top,
          left: item.left
        })
      })

      return guides
    },

    horiz () {
      var guides = this.guides
      var cor = []

      guides.forEach(val => {
        var top = val.top
        var bottom = top + val.height

        if (cor.indexOf(top) < 0 && top !== 0) {
          cor.push({
            id: `horiz-${val.uuid}-${top}`,
            val: top
          })
        }
        if (cor.indexOf(bottom) < 0) {
          cor.push({
            id: `horiz-${val.uuid}-${bottom}`,
            val: bottom
          })
        }
      })

      return cor
    },

    verti () {
      var guides = this.guides
      var cor = [375]

      guides.forEach(val => {
        var left = val.left
        var right = left + val.width

        if (cor.indexOf(left) < 0 && left !== 0) {
          cor.push({
            id: `verti-${val.uuid}-${left}`,
            val: left
          })
        }
        if (cor.indexOf(right) < 0 && right < 1280) {
          cor.push({
            id: `verti-${val.uuid}-${right}`,
            val: right
          })
        }
      })

      return cor
    },

    horizontal () {
      var a = this.$store.state.vdh.activeElement
      if (a) {
        var h = Math.round(a.height)
        return [a.top, a.top + h]
      } else {
        return []
      }
    },

    vertical () {
      var a = this.$store.state.vdh.activeElement
      if (a) {
        var w = Math.round(a.width / 2)
        return [a.left, a.left + w, a.left + w * 2]
      } else {
        return []
      }
    }
  },
  methods: {
    attachHoriz (value) {
      return this.horizontal.some(val => Math.abs(val - value) <= 1)
    },
    attachVerti (value) {
      return this.vertical.some(val => Math.abs(val - value) <= 1)
    }
  }
}
</script>

<style scoped>
.guides {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}
.verti {
  position: absolute;
  width: 1px;
  height: 1000%;
  top: -50px;
  background: #18ffff;
}
.horiz {
  position: absolute;
  height: 0.5px;
  width: 1000%;
  left: -500%;
  background: #18ffff;
}
</style>
