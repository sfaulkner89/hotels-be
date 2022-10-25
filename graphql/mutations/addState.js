import { StateType } from "../schema/index.js";
import { GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { State } from "../../mongoose/schema/State.js";

export const addState = {
  type: StateType,
  description: "Add a State",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parent, args) => {
    const state = new State({
      id: (await State.countDocuments({}).then((count) => count)) + 1,
      name: args.name,
    });

    state.save();
    return state;
  },
};
