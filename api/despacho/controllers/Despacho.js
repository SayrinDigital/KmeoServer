'use strict';

/**
 * Despacho.js controller
 *
 * @description: A set of functions called "actions" for managing `Despacho`.
 */

module.exports = {

  /**
   * Retrieve despacho records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.despacho.search(ctx.query);
    } else {
      return strapi.services.despacho.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a despacho record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.despacho.fetch(ctx.params);
  },

  /**
   * Count despacho records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.despacho.count(ctx.query);
  },

  /**
   * Create a/an despacho record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.despacho.add(ctx.request.body);
  },

  /**
   * Update a/an despacho record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.despacho.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an despacho record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.despacho.remove(ctx.params);
  }
};
