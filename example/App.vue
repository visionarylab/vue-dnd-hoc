<template>
  <div id="app">
    <vue-dnd-hoc
      :value="value"
      :upload="handleUpload"
      :upload-option="uploadOption"
      :mode="mode"
      @save="handleSave" />
  </div>
</template>

<script>

export default {
  data () {
    return {
      value: null,
      uploadOption: {
        url: 'https://jsonplaceholder.typicode.com/photos'
      },
      mode: 'edit'
    }
  },

  created () {
    let data = window.localStorage.getItem('vpd-data')
    if (data) {
      this.value = JSON.parse(data)
    }
  },

  methods: {
    handleSave (data) {
      if (this.mode) {
        data.mode = this.mode
      }
      console.log('saving:', data)
      window.localStorage.setItem('vpd-data', JSON.stringify(data))
    },
    handleUpload (files) {
      console.log('uploading:', files)
      return new Promise(resolve => {
        resolve({
          files: files,
          status: 200
        })
      })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
