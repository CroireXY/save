const Stream = require("node-rtsp-stream");

stream = new Stream({
  name: "camera1",
  streamUrl: "rtmp://lae.lscm.hk:8554/live2",
  wsPort: 9999, // WebSocket 端口
  ffmpegOptions: {
    "-stats": "",
    "-r": 30,
    '-s':'1920*1080'
  },
});
console.log("RTSP stream is running at ws://localhost:9999");
