import { HotelType, StayType } from "../schema/index.js";
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} from "graphql";

import { Hotel } from "../../mongoose/schema/Hotel.js";

export const addHotel = {
  type: HotelType,
  description: "Add a hotel",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    cityId: { type: new GraphQLNonNull(GraphQLInt) },
    notes: { type: GraphQLString },
    price: { type: GraphQLFloat },
    date: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
    firstStay: { type: GraphQLString },
    lastStay: { type: GraphQLString },
    numberOfStays: { type: GraphQLInt },
  },
  resolve: async (_parent, args) => {
    const hotelId = (await Hotel.countDocuments({}).then((count) => count)) + 1;
    const hotel = new Hotel({
      id: hotelId,
      name: args.name,
      cityId: args.cityId,
      lat: args.lat,
      lng: args.lng,
      firstStay: args.firstStay,
      lastStay: args.firstStay,
      stays: [
        {
          id: 1,
          hotelId,
          date: args.firstStay,
          rating: args.rating,
          notes: args.notes,
          price: args.price,
        },
      ],

      numberOfStays: 1,
    });
    hotel.save();
    return hotel;
  },
};
