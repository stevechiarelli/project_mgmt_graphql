const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const port = process.env.PORT || 5000;
const dbConnect = require("./config/database");

const app = express();
dbConnect(); // connect to database;

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development"
}));

app.listen(port, console.log(`Server running on port ${port}`));