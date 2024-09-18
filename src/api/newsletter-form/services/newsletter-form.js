'use strict';

/**
 * newsletter-form service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newsletter-form.newsletter-form');
