// rstp-server.js
const Stream = require("node-rtsp-stream");

stream = new Stream({
  name: "video-stream",
  streamUrl: "rtsp://lae.lscm.hk:8554/live2",
  wsPort: 9999, // WebSocket 端口
  ffmpegOptions: {
    "-stats": "",
    "-r": 30, //视频帧数
    // "-s": "1920x1080", //视频分辨率
    '-s': '1280x720',
  },
});
console.log("RTSP stream is running at ws://localhost:9999");
