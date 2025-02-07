import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./db.js";
import { findMatch } from "./matchmaker.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  socket.on("find-match", async (peerId) => {
    const match = await findMatch(peerId, socket);
    if (match) {
      io.to(match.socketId).emit("match-found", match.peerId);
      socket.emit("match-found", match.peerId);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
