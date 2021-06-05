import { objectType } from "nexus";
import { MyContext } from "../../types/MyContext";
import { Post } from "./Post";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("username");
    t.string("email");
    t.list.field("posts", {
      type: Post,
      resolve(_root, _args, { req, prisma }: MyContext) {
        return prisma.post.findMany({
          where: {
            creatorId: req.session.userId,
          },
        });
      },
    });
  },
});
