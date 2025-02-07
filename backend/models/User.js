import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  peerId: { type: String, required: true },
  socketId: { type: String, required: true },
  inCall: { type: Boolean, default: false },
});

export const User = mongoose.model("User", UserSchema);
