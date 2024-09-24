module.exports = () => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: process.env.DO_CDN_URL,
        rootPath: process.env.DO_ROOT_PATH,
        s3Options: {
          credentials: {
            accessKeyId: process.env.DO_SPACE_ACCESS_KEY,
            secretAccessKey: process.env.DO_SPACE_SECRET_KEY,
          },
          endpoint: process.env.DO_SPACE_ENDPOINT, // aws-s3 v3 needs a prefixed https:// endpoint
          region: process.env.DO_SPACE_REGION,
          params: {
            Bucket: process.env.DO_SPACE_BUCKET,
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
    enabled: true,
    config: {
      // set this to true if you want to enable the playground in production
      playgroundAlways: true,
    },
  },
  "apollo-sandbox": {
    // enables the plugin only in development mode
    // if you also want to use it in production, set this to true
    // keep in mind that graphql playground has to be enabled
    // process.env.NODE_ENV === "production" ? false :
    enabled: true,
    config: {
      // endpoint: "https://tunneled-strapi.com/graphql", // OPTIONAL - endpoint has to be accessible from the browser
    },
  },
});
