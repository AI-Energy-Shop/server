import type { Core } from "@strapi/strapi";
import { PaginationInputArgs, ProductInputArgs, SortInputArgs, UserApprovalRequestInput } from "../types/custom";

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

    // disable shadow crud price list
    // extensionService.shadowCRUD("api::product.product")


    const extension = ({}) => ({
      types: {},
      plugins: [],
      typeDefs: `

      scalar Upload
      union DataUnion = UsersPermissionsUser | Page | UserNotification

      type Response {
        error: String
        data: DataUnion
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

      input UserAccountDetails {
        odooId: String!
        userPricingLevel: String
      }

      input UserApprovalRequestInputArgs {
        email: String!
        accountStatus: String!
        user: UserAccountDetails
      }

      input FilesFiltersArgs {
        name: String
        mimeTypes: [String]
      }

      input UserFiltersInput {
        email: String
        username: String
      }

      type Mutation {
        registerUser(data: RegisterUserInput!): Response
        userApproval(data: UserApprovalRequestInputArgs!): Response
        customProductUpdate(documentId: ID!, data: ProductInput!): Product
      }
      
      type Query {
        getPage(slug: String!): Page
        files(filters: FilesFiltersArgs): [UploadFile]!
        getProduct(documentId: ID!, status: PublicationStatus = PUBLISHED): Product
        getProducts(filters: ProductFiltersInput, pagination: PaginationArg = {}, sort: [String] = [], status: PublicationStatus = PUBLISHED): [Product]!
        user(filters: UserFiltersInput): UsersPermissionsUser
      }
    `,
      resolvers: {
        Mutation: {
          registerUser: async (_: any, args: any) => {
            try {
              const useremail = await strapi.documents("admin::user").findMany({
                filters: {
                  email: args.data.email,
                },
              });

              const username = await strapi.documents("admin::user").findMany({
                filters: {
                  username: args.data.username,
                },
              });

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

              const accountDetails = await strapi
                .documents("api::account-detail.account-detail")
                .create({
                  data: {
                    level: "SMALL",
                    user_type: args.data.userType,
                    first_name: args.data.firstName,
                    middle_name: args.data.middleName,
                    last_name: args.data.lastName,
                    odoo_user_id: args.data.odoo_user_id,
                    business_name: args.data.businessName,
                  },
                });

              const createdUser = await strapi
                .documents("plugin::users-permissions.user")
                .create({
                  data: {
                    email: args.data.email,
                    username: args.data.username,
                    password: args.data.password,
                    provider: "local",
                    account_detail: accountDetails.documentId,
                  },
                });

              if (!createdUser) {
                return {
                  error: "User registration failed",
                  success: false,
                };
              }

              const userApprovalRequest = await strapi
                .documents("api::user-approval-request.user-approval-request")
                .create({
                  data: {
                    email: createdUser.email,
                    request_link:
                      process.env.CLIENT_HOST_URL +
                      "/admin/users" +
                      "/" +
                      createdUser.id,
                  },
                });

              if (!userApprovalRequest) {
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

          userApproval: async (_: any, { data }: UserApprovalRequestInput) => {
            try {
              const userData = await strapi
                .documents("plugin::users-permissions.user")
                .findFirst({
                  filters: {
                    email: data.email,
                  },
                });

              if (
                userData.account_status === "APPROVED" ||
                userData.account_status === "DENIED"
              ) {
                return {
                  error:
                    "User has been processed and marked as " +
                    userData.account_status,
                  success: false,
                };
              }

              if (!userData) {
                return {
                  error: "User not found!",
                  success: false,
                };
              }

              const updatedUserDetails = await strapi
                .documents("plugin::users-permissions.user")
                .update({
                  documentId: userData.documentId,
                  data: {
                    role: data.accountStatus === "APPROVED" ? 1 : null,
                    account_status: data.accountStatus,
                  },
                  populate: {
                    account_detail: true,
                  },
                });

              if (!updatedUserDetails) {
                return {
                  success: false,
                  error: "User data failed to update!",
                };
              }

              if (!updatedUserDetails.account_detail) {
                return {
                  error:
                    "User account details is missing, aborting user registration!",
                  status: false,
                };
              }

              const userAccountDetailsUpdate = await strapi
                .documents("api::account-detail.account-detail")
                .update({
                  documentId: updatedUserDetails.account_detail.documentId,
                  data: {
                    odoo_id: data.user.odooId,
                    level: data.user.userPricingLevel,
                  },
                });

              if (!userAccountDetailsUpdate) {
                return {
                  success: false,
                  error: "User account details failed to update!",
                };
              }

              const userNotification = await strapi
                .documents("api::user-notification.user-notification")
                .create({
                  data: {
                    title: "Account Registration",
                    description: `Your account registration has beed ${userData.account_status}`,
                    user: userData.id,
                  },
                });

              if (!userNotification) {
                return {
                  error:
                    "User registration successful, But creating notification failed!",
                  status: false,
                };
              }

              return {
                success: true,
                statusText: "Account registration successful!",
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
          customProductUpdate: async (_: any, args: ProductInputArgs) => {
            try {
              if (!args || !args.documentId || !args.data) {
                throw new Error("Invalid arguments provided");
              }

              const product = await strapi
                .documents("api::product.product")
                .findOne({ documentId: args.documentId });

              if (!product) {
                throw new Error("Product not found");
              }

              const files = await strapi
                .documents("plugin::upload.file")
                .findMany();

              if (!files || files.length === 0) {
                throw new Error("No files found");
              }

              const filteredFiles = files
                .filter((file: any) => args.data.files.includes(file.documentId))
                .map((file: any) => file);

              const filteredMedia = files
                .filter((file: any) => args.data.images.includes(file.documentId))
                .map((file: any) => file);

              const updateProductRes = await strapi
                .documents("api::product.product")
                .update({
                  documentId: product.documentId,
                  data: {
                    name: args.data.name,
                    description: args.data.description,
                    odoo_product_id: args.data.odoo_product_id,
                    category: args.data.product_catergory,
                    vendor: args.data.vendor,
                    collection: args.data.collection,
                    tags: args.data.tags,
                    specification: args.data.specification,
                    price_list: args.data.price_list,
                    inventory: args.data.inventory,
                    key_features: args.data.key_features,
                    files: filteredFiles,
                    images: filteredMedia,
                  },
                  populate: {
                    files: true,
                    images: true,
                  },
                });

              if (!updateProductRes) {
                throw new Error("Failed to update product");
              }

              return updateProductRes;
            } catch (error) {
              console.error("Error updating product:", error.message);
              return {
                success: false,
                error: error.message || "Unknown error occurred",
              };
            }
          }
        },
        Query: {
          getPage: async (_: any, { slug }: { slug: string }) => {
            try {
              if (!slug || slug === null || slug === "/" || slug === "") {
                const homepage = await strapi
                  .documents("api::page.page")
                  .findFirst({
                    filters: {
                      slug: "/",
                    },
                  });

                return homepage;
              }

              const res = await strapi.documents("api::page.page").findFirst({
                filters: {
                  slug: slug,
                },
              });

              return res;
            } catch (error) {}
          },
          files: async (_: any, args: any) => {
            const { filters } = args
            if (!filters || !filters.mimeTypes || filters.mimeTypes.length === 0) {
              return []
            }

            try {
              const filterData = {
                $or: filters.mimeTypes.map((type: string) => {
                  return {
                    mime: type
                  }
                })
              }
              
              const files = await strapi.documents("plugin::upload.file").findMany({
                filters: filterData,
              })
  
              return files
              
            } catch (error) {
              console.error(error)
              return []
            }
          },
          getProduct: async (_: any, args: { documentId: string}) => {
            try {
              const product = await strapi.documents("api::product.product").findOne({ 
                documentId: args.documentId,
              });

              if (!product) {
                throw new Error("Product not found");
              }

              return product
  
            } catch (error) {
              console.log(error)
              return error
            }
          },
          getProducts: async (_: any, args: { pagination: PaginationInputArgs, sort: SortInputArgs}) => {
            try {

              const products = await strapi.documents("api::product.product").findMany({
                start: args.pagination.start,
                limit: args.pagination.limit,
              })

              if (!products) {
                throw new Error("No products found");
              }

              return products;

            } catch (error) {
              console.error("Error getting products:", error.message)
              return error
            }
          },
          user: async (_: any, args: { filters: { email: string; username: string}}) => {
            try {
              const user = await strapi
                .documents("plugin::users-permissions.user")
                .findFirst({
                  filters: {
                    email: args.filters.email,
                    username: args.filters.username,
                  },
                  populate: {
                    account_detail: true,
                    user_notifications: true,
                  }
                });
  
              return user;
            } catch (error) {
              console.error("Error getting user:", error.message)
              return error
            }
          }
        },
      },
      resolversConfig: {
        Mutation: {
          customProductUpdate: {
            auth: true,
          },
          registerUser: {
            auth: false,
          },
          userApproval: {
            auth: false,
          },
        },
        Query: {
          getProduct: {
            auth: true
          },
          getProducts: {
            auth: true
          },
          getPage: {
            auth: false
          },
          files: {
            auth: false
          },
          user: {
            auth: true
          }
        }
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
