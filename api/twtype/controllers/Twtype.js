'use strict';

/**
 * Twtype.js controller
 *
 * @description: A set of functions called "actions" for managing `Twtype`.
 */

module.exports = {

  /**
   * Retrieve twtype records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    ctx.set('Content-Range', await Twtype.count());
    if (ctx.query._q) {
      return strapi.services.twtype.search(ctx.query);
    } else {
      return strapi.services.twtype.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a twtype record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.twtype.fetch(ctx.params);
  },

  /**
   * Count twtype records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.twtype.count(ctx.query, populate);
  },

  /**
   * Create a/an twtype record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.twtype.add(ctx.request.body);
  },

  /**
   * Update a/an twtype record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.twtype.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an twtype record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.twtype.remove(ctx.params);
  }
};
