export default ({ env }) => {
  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          rootPath: env("DO_SPACES_ROOT_PATH"),
          s3Options: {
            credentials: {
              accessKeyId: env("DO_SPACES_ACCESS_KEY"),
              secretAccessKey: env("DO_SPACES_SECRET_KEY"),
            },
            endpoint: env("DO_SPACES_ENDPOINT"),
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
