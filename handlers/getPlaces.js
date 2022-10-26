import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export default async (req, res) => {
  console.log("got it");
  const query = req.params.query;
  const lat =
    typeof parseFloat(req.params.lat) === "number" ? req.params.lat : 39.8283;
  const lng =
    typeof parseFloat(req.params.lng) === "number" ? req.params.lng : -98.5795;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?location=${lat}%2C${lng}&region=us&radius=100000&types=establishment&input=${query}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const places = await fetch(url).then((data) => data.json());
  console.log(places);
  res.status(200).json(places);
};
