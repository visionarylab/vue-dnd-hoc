<template>
  <button
    v-if="isContainer()"
    :id="'btn-' + uuid"
    class="del-btn"
    @click="dele">
    <vpd-icon name="trash-2"/>
  </button>
  <div
    v-else
    :id="'btn-' + uuid"
    class="del-div"
    @click="dele">
    <vpd-icon name="trash-2"/>
  </div>
</template>

<script>
import vpd from './../../mixins/vpd';
export default {
  name: 'OverlayBtn',
  mixins: [vpd],
  props: ['uuid', 'componentType'],
  data () {
    return {
      vpd
    };
  },
  methods: {
    dele () {
      this.$vpd.commit('select', { uuid: this.uuid })
      this.$vpd.commit('delete')
    },
    isContainer () {
      return this.componentType.includes('container')
    }
  }
};
</script>

<style scoped>
.del-div {
  background-color: #cfcfcf;
  color: #000;
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 20px;
  cursor: pointer;
  font-size: 13px;
  text-align: center;
}
.del-btn {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #cfcfcf;
  color: #000000;
  border: none;
  height: 22px;
  cursor: pointer;
}
.del-btn:focus {
  outline: unset;
}
.icon {
  pointer-events:none; /* click on svg icon should not trigger event */
}
</style>
