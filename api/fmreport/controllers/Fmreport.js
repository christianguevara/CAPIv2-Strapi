'use strict';

/**
 * Fmreport.js controller
 *
 * @description: A set of functions called "actions" for managing `Fmreport`.
 */

module.exports = {

  /**
   * Retrieve fmreport records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    ctx.set('Content-Range', await Fmreport.count());
    if (ctx.query._q) {
      return strapi.services.fmreport.search(ctx.query);
    } else {
      return strapi.services.fmreport.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a fmreport record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.fmreport.fetch(ctx.params);
  },

  /**
   * Count fmreport records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.fmreport.count(ctx.query, populate);
  },

  /**
   * Create a/an fmreport record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.fmreport.add(ctx.request.body);
  },

  /**
   * Update a/an fmreport record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.fmreport.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an fmreport record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.fmreport.remove(ctx.params);
  }
};
