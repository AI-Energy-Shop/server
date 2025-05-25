export const resolversConfig = {
  Mutation: {
    customProductCreate: {
      auth: true,
    },
    customProductUpdate: {
      auth: true,
    },
    registerUser: {
      auth: false,
    },
    updateUser: {
      auth: true,
    },
  },
  Query: {
    getStoreProduct: {
      auth: false,
    },
    getPage: {
      auth: false,
    },
    files: {
      auth: true,
    },
    cart: {
      auth: true,
    },
    carts: {
      auth: true,
    },
    // user: {
    //   auth: true,
    // },
  },
};
