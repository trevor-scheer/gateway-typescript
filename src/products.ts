import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

const productData = [
  { id: "1", name: "thing" },
  { id: "2", name: "thing2" },
];

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: gql`
      type Query {
        products: [Product]
      }

      type Product @key(fields: "id") {
        id: String!
        name: String
      }
    `,
    resolvers: {
      Query: {
        products() {
          return productData;
        },
      },
      Product: {
        __resolveReference(...stuff) {
          console.log(stuff);
        },
      },
    },
  }),
});

export default server.listen(4001).then(() => {
  console.log("Products running at http://localhost:4001");
});
