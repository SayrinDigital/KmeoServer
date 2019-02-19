'use strict';

/**
 * Orden.js controller
 *
 * @description: A set of functions called "actions" for managing `Orden`.
 */

module.exports = {

  /**
   * Retrieve orden records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.orden.search(ctx.query);
    } else {
      return strapi.services.orden.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a orden record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.orden.fetch(ctx.params);
  },

  /**
   * Count orden records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.orden.count(ctx.query);
  },

  /**
   * Create a/an orden record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.orden.add(ctx.request.body);
  },

  /**
   * Update a/an orden record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.orden.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an orden record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.orden.remove(ctx.params);
  }
};
