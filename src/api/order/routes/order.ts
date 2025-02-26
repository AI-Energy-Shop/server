/**
 * order router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::order.order', {
	config: {
		find: {
			middlewares: ["api::order.default-populate"],
		},
		findOne: {
			middlewares: ["api::order.default-populate"],
		},
	},
});
