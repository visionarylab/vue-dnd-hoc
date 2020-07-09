var move = {
  methods: {
    initmovement (e) {
      var target = this.$store.state.vdh.activeElement

      this.$store.commit('vdh/initmove', {
        startX: e.pageX,
        startY: e.pageY,
        originX: target.left,
        originY: target.top
      })

      document.addEventListener('mousemove', this.handlemousemove, true)

      document.addEventListener('mouseup', this.handlemouseup, true)
    },

    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()

      this.$store.commit('vdh/move', {
        x: e.pageX,
        y: e.pageY
      })
    },

    handlemouseup () {
      document.removeEventListener('mousemove', this.handlemousemove, true)
      document.removeEventListener('mouseup', this.handlemouseup, true)
      this.$store.commit('vdh/stopmove')
    }
  }
}

export { move }
