const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const port = process.env.PORT || 5000;
const dbConnect = require("./config/database");
const path = require("path");

const app = express();
dbConnect();

app.use(express.static(path.join(__dirname + "/public")));
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development"
}));

app.listen(port, console.log(`Server running on port ${port}`));