const { ApolloServer, gql } = require('apollo-server');
const { Prompt, sequelize } = require('./models');

const port = process.env.PORT || 4000;

// Schema Definition Language (SDL)
// in graphql you have to define your schema

// typeDefs, define what types of data are available in the graphql server
const typeDefs = gql`
  type Prompt { 
    title: String!, 
    id: ID! 
  }
  type Query {
    prompt: Prompt
  }
`;

// Resolver Map
// Execute logic based on the backend models
const resolvers = {
  Query: {
    // parent: object that contains the parent type
    // args: handles any arguments passed into the field
    // context: an object that is shared by all resolvers in the GQL operations
    // context is especially useful for authentication, incorporate a users id for every request i.e.
    // info: information about the execution of our operation, useful for debugging
    prompt: async (parent, args, context, info) => {
      const prompt = await Prompt.findOne({
        order: sequelize.random()
       });
       return prompt
    }
  }
};

// Initializes the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// runs the server on a port
server.listen({port}, () => console.log(`Server running on localhost: ${port}!`))