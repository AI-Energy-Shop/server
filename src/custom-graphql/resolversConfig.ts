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
    getPage: {
      auth: false,
    },
    files: {
      auth: false,
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
