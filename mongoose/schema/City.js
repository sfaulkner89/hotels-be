import mongoose from "mongoose";
const { Schema } = mongoose;

export const CitySchema = new Schema({
  id: Number,
  name: String,
  stateId: Number,
});

export const City = mongoose.model("City", CitySchema);
