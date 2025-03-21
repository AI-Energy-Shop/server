export const resolversConfig = {
  Mutation: {
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
    user: {
      auth: true,
    },
  },
};
