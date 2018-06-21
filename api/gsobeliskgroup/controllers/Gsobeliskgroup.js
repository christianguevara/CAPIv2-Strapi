'use strict';

/**
 * Gsobeliskgroup.js controller
 *
 * @description: A set of functions called "actions" for managing `Gsobeliskgroup`.
 */

module.exports = {

  /**
   * Retrieve gsobeliskgroup records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.gsobeliskgroup.fetchAll(ctx.query);
  },

  /**
   * Retrieve a gsobeliskgroup record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.gsobeliskgroup.fetch(ctx.params);
  },

  /**
   * Count gsobeliskgroup records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.gsobeliskgroup.count(ctx.query);
  },

  /**
   * Create a/an gsobeliskgroup record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.gsobeliskgroup.add(ctx.request.body);
  },

  /**
   * Update a/an gsobeliskgroup record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.gsobeliskgroup.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an gsobeliskgroup record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.gsobeliskgroup.remove(ctx.params);
  },

  /**
   * Add relation to a/an gsobeliskgroup record.
   *
   * @return {Object}
   */

  createRelation: async (ctx, next) => {
    return strapi.services.gsobeliskgroup.addRelation(ctx.params, ctx.request.body);
  },

  /**
   * Update relation to a/an gsobeliskgroup record.
   *
   * @return {Object}
   */

  updateRelation: async (ctx, next) => {
    return strapi.services.gsobeliskgroup.editRelation(ctx.params, ctx.request.body);
  },

  /**
   * Destroy relation to a/an gsobeliskgroup record.
   *
   * @return {Object}
   */

  destroyRelation: async (ctx, next) => {
    return strapi.services.gsobeliskgroup.removeRelation(ctx.params, ctx.request.body);
  }
};