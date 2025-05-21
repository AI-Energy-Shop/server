import {
  RegisterUserInput,
  UserApprovalRequestInput,
} from "../../types/custom";

export const resolvers = {
  Mutation: {
    registerUser: async (_: any, args: { data: RegisterUserInput }) => {
      try {
        const useremail = await strapi
          .documents("plugin::users-permissions.user")
          .findFirst({
            filters: {
              email: {
                $contains: args.data.email,
              },
            },
          });

        if (useremail) {
          throw new Error("Email already exists!");
        }

        const username = await strapi
          .documents("plugin::users-permissions.user")
          .findFirst({
            filters: {
              username: {
                $contains: args.data.username,
              },
            },
          });

        if (username) {
          throw new Error("Username already exists!");
        }

        const address = await strapi.documents("api::address.address").create({
          data: {
            title: "Primary",
            street1: args.data.street1,
            street2: args.data.street2,
            city: args.data.city,
            state: args.data.state,
            phone: args.data.phone,
            zip_code: args.data.zipCode,
            country: args.data.country,
            isActive: true,
          },
        });

        const shippingAddresses = await strapi
          .documents("api::address.address")
          .create({
            data: {
              title: "Primary",
              street1: args.data.street1,
              street2: args.data.street2,
              city: args.data.city,
              state: args.data.state,
              phone: args.data.phone,
              zip_code: args.data.zipCode,
              country: args.data.country,
              isActive: true,
            },
          });

        const accountDetails = await strapi
          .documents("api::account-detail.account-detail")
          .create({
            data: {
              shipping_addresses: {
                connect: [shippingAddresses.documentId],
              },
              warehouse_location: {
                title: "Sydney",
                address: {
                  street: "24/32-38 Belmore Rd",
                  city: "Sydney",
                  state_territory: "NSW",
                  postcode: "2196",
                  country: "Australia",
                },
              },
            },
          });

        const createdUser = await strapi
          .documents("plugin::users-permissions.user")
          .create({
            data: {
              provider: "local",
              email: args.data.email,
              username: args.data.username,
              business_name: args.data.businessName,
              business_number: args.data.businessNumber,
              business_type: args.data.businessType,
              password: args.data.password,
              phone: args.data.phone,
              account_status: "PENDING",
              addresses: {
                connect: [address.documentId],
              },
              account_detail: accountDetails.documentId,
            },
            populate: {
              addresses: true,
            },
          });

        if (!createdUser) {
          throw new Error("User creation failed");
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
          throw new Error("User approval request failed");
        }

        return createdUser;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    approvedUser: async (
      _: any,
      args: { documentId: string; data: UserApprovalRequestInput }
    ) => {
      try {
        const userData = await strapi
          .documents("plugin::users-permissions.user")
          .findOne({
            documentId: args.documentId,
            populate: {
              account_detail: true,
              role: true,
            },
          });

        if (!userData) {
          throw new Error("User not found!");
        }

        if (
          userData.account_status === "APPROVED" ||
          userData.account_status === "DENIED"
        ) {
          throw new Error(
            `User has been processed and marked as "${userData.account_status}"`
          );
        }

        const updateAccountDetails = await strapi
          .documents("api::account-detail.account-detail")
          .update({
            documentId: userData.account_detail.documentId,
            data: {
              level: args.data.userLevel,
              odoo_user_id: args.data.odooUserId,
              account_status: args.data.accountStatus,
            },
          });

        if (!updateAccountDetails) {
          throw new Error("Failed to create user account details");
        }

        const accStatus = args.data.accountStatus;
        const isApproved = accStatus.toLowerCase().includes("approved")
          ? true
          : false;

        const roles = await strapi
          .documents("plugin::users-permissions.role")
          .findMany({
            filters: {
              name: {
                $contains: "CUSTOMER",
              },
            },
          });

        const userUpdate = await strapi
          .documents("plugin::users-permissions.user")
          .update({
            documentId: userData.documentId,
            data: {
              role: isApproved && roles.length > 0 ? roles[0].documentId : null,
              createAccountRequest:
                accStatus === "CREATE_APPROVED" ? Date.now() : null,
              account_status: accStatus.toLowerCase().includes("approved")
                ? "APPROVED"
                : "DENIED",
            },
            populate: {
              account_detail: true,
              role: true,
            },
          });

        if (!userUpdate) {
          throw new Error("User update failed");
        }

        return userData;
      } catch (err) {
        console.error(err);
        throw new Error(err.message);
      }
    },
    customProductCreate: async (_: any, args: any, context: any) => {
      try {
        const [files, images] = await Promise.all([
          strapi.documents("plugin::upload.file").findMany({
            filters: {
              documentId: {
                $in: args.data.files,
              },
            },
          }),
          strapi.documents("plugin::upload.file").findMany({
            filters: {
              documentId: {
                $in: args.data.images,
              },
            },
          }),
        ]);

        const res = await strapi.documents("api::product.product").create({
          data: {
            name: args.data.name,
            model: args.data.model,
            odoo_product_id: args.data.odoo_product_id,
            description: args.data.description,
            vendor: args.data.vendor,
            product_type: args.data.product_type,
            brand: args.data.brand,
            collections: args.data.collections,
            images: images,
            files: files,
            price_lists: args.data.price_lists,
            specifications: args.data.specifications,
            inventory: args.data.inventory,
            key_features: args.data.key_features,
            shipping: args.data.shipping,
            maxQuantity: args.data.maxQuantity,
            releasedAt: args.data.releaseAt !== "published" && null,
            madeBy: context.state.user.documentId,
            // variants: args.data.variants,
          },
          populate: {
            files: true,
            images: true,
            price_lists: true,
            inventory: true,
            specifications: true,
            key_features: true,
            improvedBy: true,
            madeBy: true,
            shipping: true,
          },
        });

        return res;
      } catch (error) {
        return error;
      }
    },
    customProductUpdate: async (_: any, args: any, context: any) => {
      try {
        const [files, images] = await Promise.all([
          strapi.documents("plugin::upload.file").findMany({
            filters: {
              documentId: {
                $in: args.data.files,
              },
            },
          }),
          strapi.documents("plugin::upload.file").findMany({
            filters: {
              documentId: {
                $in: args.data.images,
              },
            },
          }),
        ]);

        const res = await strapi.documents("api::product.product").update({
          documentId: args.documentId,
          data: {
            name: args.data.name,
            model: args.data.model,
            odoo_product_id: args.data.odoo_product_id,
            description: args.data.description,
            product_type: args.data.product_type,
            brand: args.data.brand,
            collections: args.data.collections,
            images: images,
            files: files,
            price_lists: args.data.price_lists,
            specifications: args.data.specifications,
            inventory: args.data.inventory,
            key_features: args.data.key_features,
            shipping: args.data.shipping,
            improvedBy: context.state.user.documentId,
            releasedAt: args.data.releasedAt,
            maxQuantity: args.data.maxQuantity,
            // variants: args.data.variants,
          },
          populate: {
            files: true,
            images: true,
            collections: true,
            price_lists: true,
            inventory: true,
            specifications: true,
            key_features: true,
            improvedBy: true,
            madeBy: true,
            shipping: true,
          },
        });

        return res;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    updateUser: async (_: any, args: { documentId: string; data: any }) => {
      try {
        const { documentId, data } = args;
        const user = await strapi
          .documents("plugin::users-permissions.user")
          .update({
            documentId: documentId,
            data: data,
          });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.error("Error updating user status:", error.message);
        throw new Error(error.message);
      }
    },
  },
  Query: {
    getPage: async (_: any, { slug }: { slug: string }) => {
      try {
        if (!slug || slug === null || slug === "/" || slug === "") {
          const homepage = await strapi.documents("api::page.page").findFirst({
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
      const { filters } = args;
      if (!filters || !filters.mimeTypes || filters.mimeTypes.length === 0) {
        return [];
      }

      try {
        const filterData = {
          $or: filters.mimeTypes.map((type: string) => {
            return {
              mime: type,
            };
          }),
        };

        const files = await strapi.documents("plugin::upload.file").findMany({
          filters: filterData,
        });

        return files;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    user: async (
      _: any,
      args: { filters: { email: string; username: string } }
    ) => {
      try {
        const user = await strapi
          .documents("plugin::users-permissions.user")
          .findFirst({
            filters: {
              $or: [
                { email: args.filters.email },
                { username: args.filters.username },
              ],
            },
            populate: {
              account_detail: true,
              user_notifications: true,
            },
          });

        return user;
      } catch (error) {
        console.error("Error getting user:", error.message);
        return error;
      }
    },
  },
};
