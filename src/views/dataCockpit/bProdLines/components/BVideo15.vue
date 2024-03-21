
<template>
  <div class="video">
    <video id="video15" class="video-player" controls autoplay muted style="object-fit: fill" />
  </div>
</template>

<script>
export default {
  name: 'BVideo15',

  data() {
    return {
      webRtcServer15: null,
      camera_ip: '10.1.1.2:8000' // 这里看自己的需要，也可以传入另一台电脑的ip，前提是都得在在一个局域网内
    }
  },

  mounted() {
    // video：需要绑定的video控件ID
    // 127.0.0.1:8000：启动webrtc-streamer的设备IP和端口，默认8000
    // eslint-disable-next-line no-undef
    this.webRtcServer15 = new WebRtcStreamer('video15', location.protocol + '//' + this.camera_ip)
    // 需要查看的rtsp地址,根据自己的摄像头传入对应的rtsp地址即可。注意：视频编码格式必须是H264的，否则无法正常显示，编码格式可在摄像头的后台更改
    this.webRtcServer15.connect(`rtsp://admin:jf@123456@10.1.4.2:554/cam/realmonitor?channel=15&subtype=0`)
  },
  destroyed() {
    this.webRtcServer15.disconnect()
    this.webRtcServer15 = null
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  height: 100%;
  .video-player {
    width: 100%;
    height: 100%;
  }
}
</style>
