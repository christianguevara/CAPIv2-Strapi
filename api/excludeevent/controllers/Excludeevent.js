'use strict';

/**
 * Excludeevent.js controller
 *
 * @description: A set of functions called "actions" for managing `Excludeevent`.
 */

module.exports = {

  /**
   * Retrieve excludeevent records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.excludeevent.search(ctx.query);
    } else {
      return strapi.services.excludeevent.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a excludeevent record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.excludeevent.fetch(ctx.params);
  },

  /**
   * Count excludeevent records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.excludeevent.count(ctx.query);
  },

  /**
   * Create a/an excludeevent record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.excludeevent.add(ctx.request.body);
  },

  /**
   * Update a/an excludeevent record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.excludeevent.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an excludeevent record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.excludeevent.remove(ctx.params);
  },

  /**
   * Add relation to a/an excludeevent record.
   *
   * @return {Object}
   */

  createRelation: async (ctx, next) => {
    return strapi.services.excludeevent.addRelation(ctx.params, ctx.request.body);
  },

  /**
   * Update relation to a/an excludeevent record.
   *
   * @return {Object}
   */

  updateRelation: async (ctx, next) => {
    return strapi.services.excludeevent.editRelation(ctx.params, ctx.request.body);
  },

  /**
   * Destroy relation to a/an excludeevent record.
   *
   * @return {Object}
   */

  destroyRelation: async (ctx, next) => {
    return strapi.services.excludeevent.removeRelation(ctx.params, ctx.request.body);
  }
};