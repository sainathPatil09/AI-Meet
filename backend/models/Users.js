// models/User.js
import bcrypt from "bcryptjs"
import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User
