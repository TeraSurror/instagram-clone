"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const typeDefs = `
    type Query {
        posts: [Post!]
    }

    type Post {
        id: ID!
        caption: String!
        likes: Int!
    }
    `;
    const resolvers = {
        Query: {
            posts: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return context.prisma.post.findMany(); }),
        },
    };
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        context: {
            prisma,
        }
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("App running on port 4000");
    });
    console.log(yield prisma.post.findMany());
});
main()
    .catch((err) => {
    console.log(err);
})
    .finally(() => {
    prisma.$disconnect;
});
//# sourceMappingURL=index.js.map