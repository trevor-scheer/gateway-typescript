import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";

import productsPromise from "./products";
import reviewsPromise from "./reviews";

(async () => {
  await productsPromise;
  await reviewsPromise;

  const server = new ApolloServer({
    gateway: new ApolloGateway({
      serviceList: [
        { url: "http://localhost:4001", name: "products" },
        { url: "http://localhost:4002", name: "reviews" },
      ],
    }),
  });

  server.listen(4000, () => {
    console.log("Gateway running at http://localhost:4000");
  });
})();
