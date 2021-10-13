import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

const reviewData = [
  { id: "1", content: "Thing is fantastic.", productId: "1" },
  { id: "2", content: "Thing2 is really wonderful.", productId: "2" },
];

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: gql`
      type Query {
        reviews: [Review]
      }

      type Review {
        id: String!
        content: String
      }

      extend type Product @key(fields: "id") {
        id: String! @external
        reviews: [Review]
      }
    `,
    resolvers: {
      Query: {
        reviews() {
          return reviewData;
        },
      },
      Product: {
        reviews(parent) {
          console.log(parent);
          return reviewData
            .filter((review) => review.productId === parent.id)
            .map(({ productId, ...rest }) => rest);
        },
      },
    },
  }),
});

export default server.listen(4002).then(() => {
  console.log("Reviews running at http://localhost:4002");
});
