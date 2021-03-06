import { objectType } from "nexus";
import { MyContext } from "../../types/MyContext";
import { User } from "./User";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("caption");
    t.string("image");
    t.int("likes");
    t.int("creatorId");
    t.nonNull.field("creator", {
      type: User,
      resolve(_root, _args, { prisma }: MyContext) {
        return prisma.user.findUnique({ where: { id: _root.creatorId } });
      },
    });
  },
});
