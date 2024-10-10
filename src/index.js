"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");

    // Previous code from before
    extensionService.use(({ strapi }) => ({}));

    // Going to be our custom query resolver to get all authors and their details.
    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type User {
          id: ID!
          email: String!
          username: String!
          level: String!
          createdAt: Date!
          updatedAt: Date!
          publishedAt: Date!
          updatedBy: User
          createdBy: User
        }

        type UserResponse {
          error: String
          data: User
          success: Boolean
        }

        type Mutation {
          registerUser(email: String!, username: String!, password: String!, level: String = "SMALL"): UserResponse
        }
      `,
      resolvers: {
        Mutation: {
          registerUser: async (_, args) => {
            try {
              const useremail = await strapi.entityService.findMany(
                "plugin::users-permissions.user",
                {
                  filters: {
                    email: args.email,
                  },
                }
              );

              const username = await strapi.entityService.findMany(
                "plugin::users-permissions.user",
                {
                  filters: {
                    username: args.username,
                  },
                }
              );

              if (useremail.length > 0) {
                return {
                  error: "User email already exists!",
                  success: false,
                };
              }

              if (username.length > 0) {
                return {
                  error: "Username already exists!",
                  success: false,
                };
              }

              const createdUser = await strapi.entityService.create(
                "plugin::users-permissions.user",
                {
                  data: {
                    email: args.email,
                    username: args.username,
                    password: args.password,
                    level: args.level,
                    provider: "local",
                    role: {
                      connect: [
                        {
                          id: "1",
                        },
                      ],
                    },
                  },
                }
              );

              if (createdUser === null) {
                return {
                  error: "User registration failed",
                  success: false,
                };
              }

              return {
                success: true,
                data: createdUser,
              };
            } catch (err) {
              if (err === null || err === undefined) {
                return {
                  error: "Unknown error",
                  success: false,
                };
              }

              return {
                error: err.message,
                success: false,
              };
            }
          },
        },
      },
      resolversConfig: {
        "Mutation.registerUser": {
          auth: false,
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
