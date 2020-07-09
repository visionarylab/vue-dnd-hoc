import vpd from '../plugins/event-bus'

export default {
  beforeCreate () {
    this.$vpd = vpd
  }
}
