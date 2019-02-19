'use strict';

/**
 * Mediospago.js controller
 *
 * @description: A set of functions called "actions" for managing `Mediospago`.
 */

module.exports = {

  /**
   * Retrieve mediospago records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.mediospago.search(ctx.query);
    } else {
      return strapi.services.mediospago.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a mediospago record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.mediospago.fetch(ctx.params);
  },

  /**
   * Count mediospago records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.mediospago.count(ctx.query);
  },

  /**
   * Create a/an mediospago record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.mediospago.add(ctx.request.body);
  },

  /**
   * Update a/an mediospago record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.mediospago.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an mediospago record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.mediospago.remove(ctx.params);
  }
};
