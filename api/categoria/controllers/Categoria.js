'use strict';

/**
 * Categoria.js controller
 *
 * @description: A set of functions called "actions" for managing `Categoria`.
 */

module.exports = {

  /**
   * Retrieve categoria records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.categoria.search(ctx.query);
    } else {
      return strapi.services.categoria.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a categoria record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.categoria.fetch(ctx.params);
  },

  /**
   * Count categoria records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.categoria.count(ctx.query);
  },

  /**
   * Create a/an categoria record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.categoria.add(ctx.request.body);
  },

  /**
   * Update a/an categoria record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.categoria.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an categoria record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.categoria.remove(ctx.params);
  }
};
