/**
 * `defaultPopulate` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx: any, next: any) => {
    strapi.log.info('In defaultPopulate middleware.');
    if (!ctx.query.populate) {
      ctx.query.populate = ["createdBy", "updatedBy"];
    }

    await next();
  };
};
