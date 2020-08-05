<template>
  <input
    id="uploader"
    :multiple="multiple ? 'multiple' : false"
    type="file"
    accept="image/png, image/jpeg, image/gif"
    style="display: none"
    @change="handleUpload">
</template>

<script>
export default {
  name: 'VpdUploader',
  mixins: [],
  props: {
    upload: Function,
    uploadOption: Object
  },
  data () {
    return {
      multiple: false,
      uploader: null, // input file
      cb: null
    }
  },

  computed: {
    top () {
      return this.$store.state.vdh.top
    }
  },

  mounted () {
    this.uploader = document.getElementById('uploader')
  },

  methods: {
    handleUpload () {
      var files = this.uploader.files

      if (!files || files.length === 0) return

      files = Array.prototype.slice.call(this.uploader.files)

      let uploadFn = this.upload || this.defaultUpload

      uploadFn(files).then(res => {
        console.log('status: ', res.status)
        new Promise(resolve => {
          this.handleLoadQueue(resolve, res.files)()
        }).then(payload => {
          this.cb(payload)
        })
      })
    },

    defaultUpload (files) {
      if (this.uploadOption.url) {
        var data = new FormData()
        files.forEach(file => data.append('file[]', file))

        return fetch(this.uploadOption.url, {
          method: 'POST',
          body: data
        })
      } else {
        alert(this.$t('messages.alerts.imageUploadApiConfigurator'))
      }
    },

    handleLoadQueue (resolve, files) {
      var i = 0
      var len = files.length
      var payload = []

      var download = () => {
        var url = window.URL.createObjectURL(files[i])

        new Promise(resolve => {
          this.getImageWidth(url, resolve)
        }).then(size => {
          payload.push({
            width: size.w,
            height: size.h,
            top: this.top,
            url: url,
            src: 'images/' + files[i].name
          })

          if (++i === len) {
            resolve(payload)
          } else {
            download()
          }
        })
      }

      return download
    },

    getImageWidth (url, res) {
      var img = new Image()
      img.src = url
      img.onload = function () {
        res({
          w: Math.round(img.width),
          h: Math.round(img.height)
        })
      }
    }
  }
}
</script>
