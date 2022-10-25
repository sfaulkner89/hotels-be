import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";

import { StateType } from "./StateType";

import { State } from "../../mongoose/schema/State";
import { HotelType } from "./HotelType";
import { Hotel } from "../../mongoose/schema/Hotel";

export const CityType = new GraphQLObjectType({
  name: "City",
  description: "Represents a city which is in a state",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    stateId: { type: new GraphQLNonNull(GraphQLInt) },
    state: {
      type: StateType,
      resolve: (city) => State.findOne({ id: city.stateId }),
    },
    hotels: {
      type: new GraphQLList(HotelType),
      resolve: (city) => Hotel.find({ cityId: city.id }),
    },
  }),
});
