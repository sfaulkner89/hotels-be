import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { City } from "../../mongoose/schema/City.js";

import { CityType } from "./CityType.js";

export const StateType = new GraphQLObjectType({
  name: "State",
  description: "Represents a state full of cities",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    cities: {
      type: new GraphQLList(CityType),
      resolve: (state) => City.find({ stateId: state.id }),
    },
  }),
});
