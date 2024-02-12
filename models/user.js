const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    register: { type: Boolean, default: false },
    role: { type: String, default: "buyer", enum: ["buyer", "seller"] },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("User", userSchema)
