import express from "express";
import getLocation from "./handlers/getLocation.js";
import getPlaces from "./handlers/getPlaces.js";
const router = express.Router();

router.get("/get-location/:placeId", (req, res) => getLocation(req, res));
router.get("/get-places/:query/:lat/:lng", (req, res) => getPlaces(req, res));

module.exports = router;
