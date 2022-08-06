//const { projects, clients } = require("../sampleData.js");
const Project = require("../models/Project");
const Client = require("../models/Client");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");

// Project Type (get data from the projects array)
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                //return clients.find(client => client.id === parent.clientId)
                return Client.findById(parent.clientId);
            }
        }
    })
});

// Client Type (get data from the clients array)
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: { // get all projects
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                //return projects;
                return Project.find();
            }
        },
        project: { // get specified projects
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return projects.find((project) => project.id === args.id);
                return Project.findById(args.id);
            }
        },
        clients: { // get all clients
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                //return clients;
                return Client.find();
            }
        },
        client: { // get specified clients
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return clients.find((client) => client.id === args.id);
                return Client.findById(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});