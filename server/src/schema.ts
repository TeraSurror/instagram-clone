import { join } from "path";
import { makeSchema } from "nexus";
import * as types from "./graphql";

export const schema = makeSchema({
    types,
    outputs: {
        typegen: join(__dirname, "..", "nexus-typegen.ts"),
        schema: join(__dirname, "..", "schema.graphql")
    },
    contextType: {
        module: join(__dirname, "./types/MyContext.ts"),
        export: "MyContext",
    }
});