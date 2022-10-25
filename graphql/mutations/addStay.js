import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { Hotel } from "../../mongoose/schema/Hotel.js";
import { StayType } from "../schema/index.js";

const StaySchema = {
  hotelId: { type: new GraphQLNonNull(GraphQLInt) },
  date: { type: GraphQLString },
  rating: { type: GraphQLFloat },
  price: { type: GraphQLFloat },
  notes: { type: GraphQLString },
};

export const addStay = {
  type: StayType,
  description: "Add a stay to a hotel",
  args: StaySchema,
  resolve: async (_parent, args) => {
    const hotelUpdate = await Hotel.findOne({ id: args.hotelId }).then(
      (hotel) => hotel
    );
    const newStay = {
      id: hotelUpdate.stays.length + 1,
      hotelId: args.hotelId,
      date: args.date,
      rating: args.rating,
      price: args.price,
      notes: args.notes,
    };
    hotelUpdate.lastStay = args.date;
    Object.assign(hotelUpdate, {
      stays: [...hotelUpdate.stays, newStay],
    });
    hotelUpdate.save();
    return newStay;
  },
};
