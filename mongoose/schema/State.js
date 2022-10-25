import mongoose from "mongoose";
const { Schema } = mongoose;

const StateSchema = new Schema({
  id: Number,
  name: String,
  cities: Array,
});

export const State = mongoose.model("State", StateSchema);
