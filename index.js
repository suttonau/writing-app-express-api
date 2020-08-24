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
    prompt: async (_, args) => {
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