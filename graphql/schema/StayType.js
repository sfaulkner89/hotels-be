import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const StaySchema = {
  hotelId: { type: new GraphQLNonNull(GraphQLInt) },
  id: { type: new GraphQLNonNull(GraphQLString) },
  date: { type: GraphQLString },
  rating: { type: GraphQLFloat },
  price: { type: GraphQLFloat },
  notes: { type: GraphQLString },
};

export const StayType = new GraphQLObjectType({
  name: "Stay",
  description: "A single stay at a hotel",
  fields: () => StaySchema,
});
