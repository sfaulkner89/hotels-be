import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} from "graphql";

import { CityType } from "./CityType";
import { City } from "../../mongoose/schema/City";
import { StayType } from "./StayType";

export const HotelType = new GraphQLObjectType({
  name: "Hotel",
  description: "Represents a hotel within a city within a state",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    cityId: { type: new GraphQLNonNull(GraphQLInt) },
    rating: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
    notes: { type: GraphQLString },
    firstStay: { type: GraphQLString },
    lastStay: { type: GraphQLString },
    numberOfStays: { type: GraphQLInt },
    stays: { type: new GraphQLList(StayType) },
    city: {
      type: CityType,
      resolve: (hotel) => City.findOne({ id: hotel.cityId }),
    },
  }),
});
