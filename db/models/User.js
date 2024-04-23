import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  achievements: { type: Array, required: true },
  day: { type: Number, required: true },
  email: { type: String, required: true },
  foodInventory: { type: Array, required: true },
  hour: { type: Number, required: true },
  money: { type: Number, required: true },
  myPets: { type: Array, required: true },
  season: { type: Number, required: true },
  toyInventory: { type: Array, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
