import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import router from "./router.js";
import path from "path";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from "graphql";
import mongoose from "mongoose";
import { Hotel } from "./mongoose/schema/Hotel.js";
import { State } from "./mongoose/schema/State.js";
import { StateType, CityType, HotelType } from "./graphql/schema/index.js";
import {
  addHotel,
  addCity,
  addState,
  addStay,
  removeStay,
} from "./graphql/mutations/index.js";
import { City } from "./mongoose/schema/City.js";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

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

  // app.use(express.static(path.join(__dirname, "build")));

  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "build", "index.html"));
  // });
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
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`
  );

  await new Promise((resolve) => httpServer.listen({ port: 2000 }, resolve));
  console.log(`get poppin' at ${server.graphqlPath}`);
};

startServer();
