import { CityType } from "../schema";
import { GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { City } from "../../mongoose/schema/City";

export const addCity = {
  type: CityType,
  description: "Add a City",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    stateId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_parent, args) => {
    const city = new City({
      id: (await City.countDocuments({}).then((count) => count)) + 1,
      name: args.name,
      stateId: args.stateId,
      rating: args.rating,
      price: args.price,
    });
    city.save();
    return city;
  },
};
