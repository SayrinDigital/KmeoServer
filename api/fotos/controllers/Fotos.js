'use strict';

/**
 * Fotos.js controller
 *
 * @description: A set of functions called "actions" for managing `Fotos`.
 */

module.exports = {

  /**
   * Retrieve fotos records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.fotos.search(ctx.query);
    } else {
      return strapi.services.fotos.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a fotos record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.fotos.fetch(ctx.params);
  },

  /**
   * Count fotos records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.fotos.count(ctx.query);
  },

  /**
   * Create a/an fotos record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.fotos.add(ctx.request.body);
  },

  /**
   * Update a/an fotos record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.fotos.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an fotos record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.fotos.remove(ctx.params);
  }
};
