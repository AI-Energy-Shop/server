import type { Core } from "@strapi/strapi";
import { typeDefs } from "./custom-graphql/typeDefs";
import { resolvers } from "./custom-graphql/resolvers";
import { resolversConfig } from "./custom-graphql/resolversConfig";
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Add your logic here
    const extensionService = strapi.plugin("graphql").service("extension");
    const extension = ({ strapiExt }: { strapiExt: Core.Strapi }) => ({
      types: {},
      plugins: [],
      typeDefs: typeDefs,
      resolvers: resolvers,
      resolversConfig: resolversConfig,
    });

    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
