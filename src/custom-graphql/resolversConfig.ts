export const resolversConfig = {
  Mutation: {
    customProductUpdate: {
      auth: true,
    },
    registerUser: {
      auth: false,
    },
    addToCart: {
      auth: true,
    },
    updateCartItem: {
      auth: true,
    },
    deleteCartItem: {
      auth: true,
    },
    updateUser: {
      auth: true,
    },
  },
  Query: {
    getProduct: {
      auth: true,
    },
    getProducts: {
      auth: true,
    },
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
