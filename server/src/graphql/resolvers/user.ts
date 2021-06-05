import { extendType, intArg, nonNull, stringArg } from "nexus";
import { MyContext } from "../../types/MyContext";
import { User } from "../entities/User";

export const MeQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: User,
      resolve(_root, _args, { req, prisma }: MyContext) {
        if (!req.session.userId) {
          return null;
        }
        return prisma.user.findUnique({
          where: {
            id: req.session.userId,
          },
        });
      },
    });
  },
});

export const RegisterMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: User,
      args: {
        email: nonNull(stringArg()),
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, args, { req, prisma }: MyContext) {
        const { email, username, password } = args;

        const user = await prisma.user.create({
          data: {
            email,
            username,
            password,
          },
        });

        req.session.userId = user?.id;

        return user;
      },
    });
  },
});

export const LoginMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: User,
      args: {
        usernameOrEmail: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, args, { req, prisma }: MyContext) {
        const { usernameOrEmail } = args;

        const isEmail = usernameOrEmail.includes("@");

        const user = await prisma.user.findUnique({
          where: isEmail
            ? { email: usernameOrEmail }
            : { username: usernameOrEmail },
        });

        req.session.userId = user?.id;

        return user;
      },
    });
  },
});

export const LogoutMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("logout", {
      type: "Boolean",
      resolve(_root, _args, { req, res }: MyContext) {
        return new Promise((resolve) =>
          req.session.destroy((err) => {
            res.clearCookie("userid");
            if (err) {
              console.log(err);
              resolve(false);
              return;
            }
            resolve(true);
          })
        );
      },
    });
  },
});

export const DeleteUserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteUser", {
      type: "Boolean",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx: MyContext) {
        try {
          const { id } = args;
          await ctx.prisma.user.delete({
            where: {
              id,
            },
          });
        } catch (err) {
          console.log(err);
          return false;
        }
        return true;
      },
    });
  },
});
