import { extendType, intArg, nonNull, stringArg } from "nexus";
import { MyContext } from "../../types/MyContext";
import { Post } from "../entities/Post";

/**
 *  Get single post
 */
export const GetPostQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("post", {
      type: Post,
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, _args, ctx: MyContext) {
        return ctx.prisma.post.findUnique({
          where: {
            id: _args.id,
          },
        });
      },
    });
  },
});

/**
 *  Get list of posts
 */
export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("posts", {
      type: Post,
      resolve(_root, _args, ctx: MyContext) {
        return ctx.prisma.post.findMany();
      },
    });
  },
});

/**
 *  Create single post
 */
export const CreatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createPost", {
      type: Post,
      args: {
        image: nonNull(stringArg()),
        caption: nonNull(stringArg()),
      },
      async resolve(_root, args, { req, prisma }: MyContext) {
        const { image, caption } = args;

        if (!req.session.userId) {
          throw new Error("User not authenticated");
        }

        const post = await prisma.post.create({
          data: {
            image,
            caption,
            creatorId: req.session.userId,
          },
        });
        return post;
      },
    });
  },
});

/**
 *  Update single post
 */
export const UpdatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updatePost", {
      type: Post,
      args: {
        id: nonNull(intArg()),
        image: nonNull(stringArg()),
        caption: nonNull(stringArg()),
      },
      async resolve(_root, args, { req, prisma }: MyContext) {
        if (!req.session.userId) {
          throw new Error("User not authenticated");
        }

        const { id, image, caption } = args;

        const newPost = await prisma.post.update({
          where: {
            id,
          },
          data: {
            image,
            caption,
          },
        });

        return newPost;
      },
    });
  },
});

/**
 *  Delete single post
 */
export const DeletePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deletePost", {
      type: "Boolean",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args, { req, prisma }: MyContext) {
        if (!req.session.userId) {
          throw new Error("User not authenticated");
        }
        const { id } = args;

        await prisma.post.delete({
          where: {
            id,
          },
        });

        return true;
      },
    });
  },
});
