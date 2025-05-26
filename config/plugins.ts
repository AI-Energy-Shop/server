export default ({ env }) => {
  return {
    // upload: {
    //   config: {
    //     provider: "aws-s3",
    //     providerOptions: {
    //       baseUrl: env("DO_SPACES_ENDPOINT"),
    //       rootPath: env("DO_SPACES_ROOT_PATH"),
    //       s3Options: {
    //         // credentials: {
    //         //   accessKeyId: env("DO_SPACES_ACCESS_KEY"),
    //         //   secretAccessKey: env("DO_SPACES_SECRET_KEY"),
    //         // },
    //         accessKeyId: env("DO_SPACES_ACCESS_KEY"),
    //         secretAccessKey: env("DO_SPACES_SECRET_KEY"),
    //         region: env("DO_SPACES_REGION"),
    //         params: {
    //           ACL: env("AWS_ACL", "private"),
    //           signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
    //           Bucket: env("DO_SPACES_NAME"),
    //         },
    //       },
    //     },
    //     actionOptions: {
    //       upload: {
    //         timeout: 60000,
    //         sizeLimit: 10 * 1024 * 1024, // 10MB
    //         useStream: true,
    //         buffer: false,
    //       },
    //       uploadStream: {
    //         timeout: 60000,
    //         sizeLimit: 10 * 1024 * 1024, // 10MB
    //         useStream: true,
    //         buffer: false,
    //         imageOptimization: false,
    //       },
    //       delete: {},
    //     },
    //   },
    // },

    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl: env("DO_SPACES_ENDPOINT"),
          rootPath: env("DO_SPACES_ROOT_PATH"),
          s3Options: {
            credentials: {
              accessKeyId: env("DO_SPACES_ACCESS_KEY"),
              secretAccessKey: env("DO_SPACES_SECRET_KEY"),
            },
            endpoint: env("DO_SPACES_ENDPOINT"), // aws-s3 v3 needs a prefixed https:// endpoint
            region: env("DO_SPACES_REGION"),
            params: {
              Bucket: env("DO_SPACES_NAME"),
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
    graphql: {
      config: {
        endpoint: "/graphql",
        shadowCRUD: true,
        depthLimit: 20,
        defaultLimit: 50,
        amountLimit: 1000,
        createAdminUser: true,
        apolloServer: {
          tracing: false,
        },
        landingPage: (strapi) => {
          if (env("NODE_ENV") !== "production") {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    "users-permissions": {
      config: {
        register: {
          allowedFields: [
            "account_status",
            "phone",
            "business_name",
            "business_number",
            "user_type",
            "role",
          ],
        },
      },
    },
  };
};
