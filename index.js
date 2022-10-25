const express = require("express");
import cors from "cors";
const { graphqlHTTP } = require("express-graphql");
import router from "./router";
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require("graphql");
const { default: mongoose } = require("mongoose");
const { Hotel } = require("./mongoose/schema/Hotel");
const { State } = require("./mongoose/schema/State");
import { StateType, CityType, HotelType } from "./graphql/schema/index.js";
import {
  addHotel,
  addCity,
  addState,
  addStay,
  removeStay,
} from "./graphql/mutations/index.js";
const { City } = require("./mongoose/schema/City");
import { ApolloServer } from "apollo-server-express";
import http from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addHotel,
    addCity,
    addState,
    addStay,
    removeStay,
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    states: {
      type: new GraphQLList(StateType),
      description: "List of All States",
      resolve: () => State.find({}),
    },
    state: {
      type: StateType,
      description: "A State",
      args: {
        stateId: { type: GraphQLInt },
      },
      resolve: (_parent, args) => State.findOne({ id: args.stateId }),
    },
    stateByName: {
      type: StateType,
      description: "A State",
      args: {
        state: { type: GraphQLString },
      },
      resolve: (_parent, args) => State.findOne({ name: args.state }),
    },
    cities: {
      type: new GraphQLList(CityType),
      description: "List of All Cities",
      resolve: () => City.find({}),
    },
    city: {
      type: CityType,
      description: "A City",
      args: {
        cityId: { type: GraphQLInt },
      },
      resolve: (_parent, args) => City.findOne({ id: args.cityId }),
    },
    hotels: {
      type: new GraphQLList(HotelType),
      description: "A List Of all hotels",
      resolve: () => Hotel.find({}),
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const startServer = async () => {
  const app = express();
  app.use(cors(corsOptions));
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );
  app.use(router);
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect(
    "mongodb+srv://jules:mal1n@cluster0.p2x6dv7.mongodb.net/?retryWrites=true&w=majority"
  );

  await new Promise((resolve) => httpServer.listen({ port: 2000 }, resolve));
  console.log(`get poppin' at ${server.graphqlPath}`);
};

startServer();
