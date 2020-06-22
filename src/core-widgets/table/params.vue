<template>
  <div>

    <div class="panel-row">
      <div class="panel-label">{{ $t('data.params.options') }}</div>
      <div class="panel-value">
        <textarea
          v-model="activeElement.options"
          :placeholder="$t('data.params.linkPlaceholder')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableParams',
  props: ['activeElement', 'tab']
}
</script>
