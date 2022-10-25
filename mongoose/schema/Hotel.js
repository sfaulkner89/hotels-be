import mongoose from "mongoose";
const { Schema } = mongoose;

export const HotelSchema = new Schema({
  id: Number,
  name: String,
  cityId: Number,
  firstStay: String,
  lastStay: String,
  numberOfStays: Number,
  stays: Array,
  lat: Number,
  lng: Number,
});

export const Hotel = mongoose.model("Hotel", HotelSchema);
