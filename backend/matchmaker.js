import { User } from "./models/User.js";

export const findMatch = async (peerId, socket) => {
  try {
    const existingUser = await User.findOne({ inCall: false });

    if (existingUser) {
      existingUser.inCall = true;
      await existingUser.save();

      const newUser = new User({
        peerId,
        socketId: socket.id,
        inCall: true,
      });
      await newUser.save();

      return existingUser;
    } else {
      const newUser = new User({
        peerId,
        socketId: socket.id,
        inCall: false,
      });
      await newUser.save();
      return null;
    }
  } catch (error) {
    console.error("❌ Matchmaking Error:", error);
  }
};
