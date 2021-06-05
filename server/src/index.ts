import { PrismaClient } from ".prisma/client";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import { schema } from "./schema";
import { MyContext } from "./types/MyContext";
import Redis from "ioredis";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  // await prisma.post.deleteMany();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: "userid",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //ten years
        httpOnly: true,
        secure: false, // cookie only works in https
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "djklhasfjhasdfjkhjfkh",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({ req, res, redis, prisma }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("App running on port 4000");
  });
};

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    prisma.$disconnect;
  });
