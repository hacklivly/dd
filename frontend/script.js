import Peer from "peerjs";

const socket = io("http://localhost:3000");
let peer = new Peer();

peer.on("open", (id) => {
  console.log("✅ Connected to PeerJS with ID:", id);
  socket.emit("find-match", id);
});

peer.on("call", (call) => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    call.answer(stream);
    call.on("stream", (remoteStream) => {
      const audio = new Audio();
      audio.srcObject = remoteStream;
      audio.play();
    });
  });
});

socket.on("match-found", (peerId) => {
  console.log("🔗 Matched with:", peerId);
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const call = peer.call(peerId, stream);
    call.on("stream", (remoteStream) => {
      const audio = new Audio();
      audio.srcObject = remoteStream;
      audio.play();
    });
  });
});
