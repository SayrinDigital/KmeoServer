'use strict';

/**
 * Interfaz.js controller
 *
 * @description: A set of functions called "actions" for managing `Interfaz`.
 */

module.exports = {

  /**
   * Retrieve interfaz records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.interfaz.search(ctx.query);
    } else {
      return strapi.services.interfaz.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a interfaz record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.interfaz.fetch(ctx.params);
  },

  /**
   * Count interfaz records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.interfaz.count(ctx.query);
  },

  /**
   * Create a/an interfaz record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.interfaz.add(ctx.request.body);
  },

  /**
   * Update a/an interfaz record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.interfaz.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an interfaz record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.interfaz.remove(ctx.params);
  }
};
