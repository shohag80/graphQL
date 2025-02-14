require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./src/schemas/index");  // Ensure the correct path
const resolvers = require("./src/resolvers/index"); // Ensure the correct path

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    app.listen(4000, () => {
        console.log("Server running at http://localhost:4000/graphql");
    });
}

startServer().catch(err => console.error(err));
