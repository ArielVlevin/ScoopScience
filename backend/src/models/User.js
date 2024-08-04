import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: { type: Number },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema, "Users");

export default User;
