import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export default async (req, res) => {
  const placeId = req.params.placeId;

  const data = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry%2Cformatted_phone_number%2Cphotos%2Cname&key=${process.env.GOOGLE_MAPS_API_KEY}`
  ).then((data) => data.json());
  console.log(data);
  res.status(201).json(data);
};
