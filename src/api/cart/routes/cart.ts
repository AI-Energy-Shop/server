/**
 * cart router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::cart.cart', {
    config: {
        find: {
          middlewares: ["api::cart.default-created-by-populate"],
        },
        findOne: {
          middlewares: ["api::cart.default-created-by-populate"],
        },
    },
});
