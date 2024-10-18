import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Add your logic here
   const extensionService = strapi.plugin('graphql').service('extension');

    // extensionService.shadowCRUD("admin::user").disable();
   const extension = ({}) => ({
    types: {},
    plugins: [],
    typeDefs: `

      type UserResponse {
        error: String
        data: UsersPermissionsUser
        success: Boolean
        statusText: String
      }

      type PageResponse {
        error: String
        data: Page
        success: Boolean
        statusText: String
      }

      input RegisterUserInput {
        firstName: String!
        middleName: String
        lastName: String!
        userType: String!
        businessName: String!
        email: String!
        username: String!
        password: String!
      }

      type Mutation {
        registerUser(data: RegisterUserInput!): UserResponse
      }
      
      type Query {
        getPage(slug: String!): Page
      }
    `,
    resolvers: {
      Mutation: {
        registerUser: async (_, args: any) => {
          try {
            const useremail = await strapi.documents("admin::user").findMany(
              {
                filters: {
                  email: args.data.email,
                },
              }
            );

            const username = await strapi.documents("admin::user").findMany(
              {
                filters: {
                  username: args.data.username,
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
            const accountDetails = await strapi.documents("api::account-detail.account-detail").create(
              {
                data: {
                  level: "SMALL",
                  user_type: args.data.userType,
                  first_name: args.data.firstName,
                  middle_name: args.data.middleName,
                  last_name: args.data.lastName,
                  business_name: args.data.businessName
                },
              }
            );

            const createdUser = await strapi.documents("plugin::users-permissions.user").create(
              {
                data: {
                  email: args.data.email,
                  username: args.data.username,
                  password: args.data.password,
                  provider: "local",
                  account_status: "PENDING",
                  account_details: accountDetails.id
                },
              }
            );

            if (!createdUser) {
              return {
                error: "User registration failed",
                success: false,
              };
            }

            const userApprovalRequest = await strapi.documents("api::user-approval-request.user-approval-request").create(
              {
                data: {
                  email: createdUser.email,
                  request_link: process.env.CLIENT_HOST_URL + "/admin/users" + "/" + createdUser.id,
                },
              }
            )

            if(!userApprovalRequest) {
              return {
                error: "User registration failed",
                success: false,
              };
            }

            return {
              success: true,
              statusText: "Your account is pending for approval!",
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
      Query: {
        getPage: async (_: any, {slug}: {slug: string}) => {
          try {

            if(!slug || slug === null || slug === "/" || slug === "") {
              const homepage = await strapi.documents("api::page.page").findFirst({
                filters: {
                  slug: "/"
                }
              })

              return homepage
            }

            const res = await strapi.documents("api::page.page").findFirst({
              filters: {
                slug: slug
              }
            })

            return  res
          } catch (error) {
            
          }
        }
      }
    },
    resolversConfig: {
      "Mutation.registerUser": {
        auth: false,
      },
      "Query.getPage": {
        auth: false,
      },
    },
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
