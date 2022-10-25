import { StayType } from "../schema";
import { GraphQLNonNull, GraphQLInt } from "graphql";
import { Hotel } from "../../mongoose/schema/Hotel";

export const removeStay = {
  type: StayType,
  description: "Removing a stay from a hotel",
  args: {
    stayId: { type: new GraphQLNonNull(GraphQLInt) },
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
