export default ({env}) => ({
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
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
});
