import { StayType } from "../schema/index.js";
import { GraphQLNonNull, GraphQLInt, GraphQLString } from "graphql";
import { Hotel } from "../../mongoose/schema/Hotel.js";

export const removeStay = {
  type: StayType,
  description: "Removing a stay from a hotel",
  args: {
    stayId: { type: new GraphQLNonNull(GraphQLString) },
    hotelId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_parent, args) => {
    const hotelToUpdate = await Hotel.findOne({ id: args.hotelId });
    hotelToUpdate.stays = hotelToUpdate.stays.filter(
      (stay) => stay.id !== args.stayId
    );
    if (hotelToUpdate.stays.length === 0) {
      hotelToUpdate.delete();
      return hotelToUpdate;
    }
    hotelToUpdate.save();
    return hotelToUpdate;
  },
};
