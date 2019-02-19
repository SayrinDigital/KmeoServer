'use strict';

/**
 * Marca.js controller
 *
 * @description: A set of functions called "actions" for managing `Marca`.
 */

module.exports = {

  /**
   * Retrieve marca records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.marca.search(ctx.query);
    } else {
      return strapi.services.marca.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a marca record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.marca.fetch(ctx.params);
  },

  /**
   * Count marca records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.marca.count(ctx.query);
  },

  /**
   * Create a/an marca record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.marca.add(ctx.request.body);
  },

  /**
   * Update a/an marca record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.marca.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an marca record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.marca.remove(ctx.params);
  }
};
