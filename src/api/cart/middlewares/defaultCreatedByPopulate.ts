/**
 * `defaultCreatedByPopulate` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx: any, next: any) => {
    strapi.log.info('In defaultCreatedByPopulate middleware.');

    console.log(config)
    if (!ctx.query.populate) {
      ctx.query.populate = ["createdBy", "updatedBy"];
    }

    await next();
  };
};
