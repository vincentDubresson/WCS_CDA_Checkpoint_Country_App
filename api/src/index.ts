import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import CountryResolver from "./resolvers/Country/Country.resolver";
import { buildSchema } from "type-graphql";
import { clearAllRepository, initializeDatabaseRepository } from "./database/init";
import CountryRepository from "./models/Country.repository";

const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CountryResolver],
    }),
    csrfPrevention: true,
    cache: "bounded",
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });


  await initializeDatabaseRepository();
  console.log("🚀  Database init : OK  🚀");
  await clearAllRepository();
  console.log("🚀  Data truncate : OK  🚀");

  await CountryRepository.initializeData();
  console.log("🚀  Data init : OK  🚀");

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();