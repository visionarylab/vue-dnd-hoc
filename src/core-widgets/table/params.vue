<template>
  <div>
    <div class="panel-row">
      <vpd-icon name="cpu" />
      <div class="panel-label">{{ $t('data.params.options') }}</div>
      <div class="panel-value">
        <textarea
          v-model="activeElement.options"
          :placeholder="$t('data.params.optionsPlaceholder')"
          :style="{
            height: (activeElement.options? Math.ceil(activeElement.options.length/10*13) : 26) + 'px',
            minHeight: 25 + 'px'
          }"
        />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="link-2" />
      <div class="panel-label">{{ $t('data.params.endpoint') }}</div>
      <div class="panel-value">
        <textarea
          v-model="activeElement.endpoint"
          :placeholder="$t('data.events.linkPlaceholder')"
          :style="{
            height: (activeElement.endpoint? Math.ceil(activeElement.endpoint.length/10*13) : 26) + 'px',
            minHeight: 25 + 'px',
            marginTop: 6 + 'px'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableParams',
  props: ['activeElement', 'tab'],
  beforeMount () {
    this.activeElement.options = this.activeElement.options || '{"title": "Name", "field": "name", "sorter": "string", "width": 200 }, { "title": "Email", "field": "email", "sorter": "number", "width": 200 }'
    this.activeElement.endpoint = this.activeElement.endpoint || 'https://jsonplaceholder.typicode.com/users/4'
  }
}
</script>
<style scoped>
.panel-row {
  display: grid;
  font-size: 13px;
  line-height: 36px;
  grid-template-columns: auto auto auto;
}
</style>
